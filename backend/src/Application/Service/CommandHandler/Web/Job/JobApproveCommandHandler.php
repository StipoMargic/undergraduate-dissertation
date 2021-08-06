<?php


namespace App\Application\Service\CommandHandler\Web\Job;


use App\Application\Command\Web\Job\JobApproveCommand;
use App\Application\Job\JobRepository\JobReadRepository;
use App\Application\Job\JobRepository\JobWriteRepository;
use App\Application\User\UserRepository\UserReadRepository;
use App\Domain\User\User;
use Ramsey\Uuid\Uuid;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;

class JobApproveCommandHandler
{
    public function __construct(
        private JobReadRepository $jobReadRepository,
        private JobWriteRepository $jobWriteRepository,
        private UserReadRepository $userReadRepository,
        public MailerInterface $mailer
    ) {
    }

    public function __invoke(JobApproveCommand $command): void
    {
        $job = $this->jobReadRepository->get(Uuid::fromString($command->jobId));
        $applicant = $this->userReadRepository->getByUsername($command->applicantName);
        $companyName = $job->getUser()->getUsername();
        // $this->sendEmail($companyName, $command->applicantName, $applicant->getEmail());
        $job->approveApplication($command->applicantName);
        $this->jobWriteRepository->save($job);
    }

    private function sendEmail(string $companyName, string $applicantName, string $applicantEmail): void
    {
        $email = (new TemplatedEmail())
            ->from("info@liberato.io")
            ->to(new Address($applicantEmail, $applicantName))
            ->subject('You got approved!')
            ->htmlTemplate('emails/approved.html.twig')
            ->context([
                'companyName' => $companyName,
                'applicantName' => $applicantName,
            ]);

        $this->mailer->send($email);
    }
}