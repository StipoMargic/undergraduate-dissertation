<?php
declare(strict_types = 1);

namespace App\Application\Service\CommandHandler\Web\Job;


use App\Application\Command\Web\Job\JobDeclineCommand;
use App\Application\Job\JobRepository\JobReadRepository;
use App\Application\Job\JobRepository\JobWriteRepository;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Mailer\MailerInterface;

class JobDeclineCommandHandler
{
    public function __construct(
        private JobReadRepository $jobReadRepository,
        private JobWriteRepository $jobWriteRepository,
        public MailerInterface $mailer
    ) {
    }

    public function __invoke(JobDeclineCommand $command): void
    {
        $job = $this->jobReadRepository->get(Uuid::fromString($command->jobId));

        $job->declineApplication($command->applicantName);
        $this->jobWriteRepository->save($job);
    }
}