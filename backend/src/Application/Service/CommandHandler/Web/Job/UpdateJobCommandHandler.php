<?php
declare(strict_types = 1);

namespace App\Application\Service\CommandHandler\Web\Job;


use App\Application\Command\Web\Job\UpdateJobCommand;
use App\Application\Job\JobRepository\JobReadRepository;
use App\Application\Job\JobRepository\JobWriteRepository;
use Ramsey\Uuid\Uuid;

final class UpdateJobCommandHandler
{
    public function __construct(
        private JobReadRepository $jobReadRepository,
        private JobWriteRepository $jobWriteRepository
    ) {
    }

    public function __invoke(UpdateJobCommand $command): void
    {
        $job = $this->jobReadRepository->get(Uuid::fromString($command->id));

        $job->update(
            $command->jobDuties,
            $command->skills,
            $command->vacancy,
            $command->activeTill,
            $command->location,
            $command->salary,
            $command->hours,
            $command->typeOfPosition,
            $command->disableFriendly,
            $command->jobSummary,
            $command->jobPositionName,
            $command->jobDutiesBulletins
        );
        $this->jobWriteRepository->save($job);
    }
}