<?php
declare(strict_types = 1);

namespace App\Application\Service\CommandHandler\Web\Job;


use App\Application\Command\Web\Job\DeleteJobCommand;
use App\Application\Job\JobRepository\JobReadRepository;
use App\Application\Job\JobRepository\JobWriteRepository;
use Ramsey\Uuid\Uuid;

final class DeleteJobCommandHandler
{
    public function __construct(
        private JobReadRepository $jobReadRepository,
        private JobWriteRepository $jobWriteRepository
    ) {
    }

    public function __invoke(DeleteJobCommand $command):void
    {
        $job = $this->jobReadRepository->get(Uuid::fromString($command->id));
        $job->delete();

        $this->jobWriteRepository->save($job);
    }
}