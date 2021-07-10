<?php
declare(strict_types = 1);

namespace App\Application\Service\CommandHandler\Web\Job;


use App\Application\Command\Web\Job\JobApplicationCommand;
use App\Application\Job\JobRepository\JobReadRepository;
use App\Application\Job\JobRepository\JobWriteRepository;
use App\Application\User\UserRepository\UserReadRepository;
use App\Domain\Job\Exception\JobApplicantAlreadyAppliedException;
use App\Domain\User\User;
use App\Infrastructure\File\Upload\Uploader;
use Ramsey\Uuid\Uuid;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;

final class JobApplicationCommandHandler
{
    public function __construct(
        public JobWriteRepository $jobWriteRepository,
        public JobReadRepository $jobReadRepository,
        public UserReadRepository $userReadRepository,
        public MailerInterface $mailer,
        public Uploader $uploader
    ) {
    }

    public function __invoke(JobApplicationCommand $command): void
    {
        $user = $this->userReadRepository->getByUsername($command->username);
        $job = $this->jobReadRepository->get(Uuid::fromString($command->jobId));

        $applicants = $job->getApplied();

        if (in_array($command->username, $applicants)) {
            throw JobApplicantAlreadyAppliedException::alreadyApplied($user->getUsername());
        }

        $job->addApplied($user->getUsername());

        $filePath = $this->upload($command->resume);
        $this->sendEmail($user, $command->subject, $command->message, $filePath);
        $this->jobWriteRepository->save($job);
    }

    private function sendEmail(User $user, string $subject, string $message, string $filePath): void
    {
        $email = (new TemplatedEmail())
            ->from("info@liberato.io")
            ->to(new Address($user->getEmail(), $user->getUsername()))
            ->subject('Someone wants to apply for your company!')
            ->htmlTemplate('emails/apply-now.html.twig')
            ->context([
                'subject' => $subject,
                'message' => $message,
                'file' => $filePath,
            ]);

        $this->mailer->send($email);
    }

    private function upload(string $resume): string
    {
        $file = $this->uploader->convert($resume);

        return $this->uploader->upload($file, 'resumes');
    }
}