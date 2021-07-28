<?php


namespace App\Application\Service\CommandHandler\Web\Job;


use App\Application\Command\Web\Job\JobApplicationCommand;
use App\Application\Job\JobRepository\JobReadRepository;
use App\Application\Job\JobRepository\JobWriteRepository;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Mailer\MailerInterface;

class JobApproveCommandHandler
{
    public function __construct(
        private JobReadRepository $jobReadRepository,
        private JobWriteRepository $jobWriteRepository,
        public MailerInterface $mailer
    ) {
    }

    public function __invoke(JobApplicationCommand $command): void
    {
        $job = $this->jobReadRepository->get(Uuid::fromString($command->jobId));

        $job->approveApplication($command->applicantName);
        $this->jobWriteRepository->save($job);
    }
}