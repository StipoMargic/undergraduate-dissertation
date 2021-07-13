<?php
declare(strict_types = 1);

namespace App\Application\Service\CommandHandler\Web\Job;


use App\Application\Command\Web\Job\CreateJobCommand;
use App\Application\Job\JobRepository\JobWriteRepository;
use App\Domain\Job\Job;
use Ramsey\Uuid\Uuid;

final class CreateJobCommandHandler
{
    public function __construct(
        private JobWriteRepository $jobWriteRepository
    ) {
    }

    /**
     * @throws \Exception
     */
    public function __invoke(CreateJobCommand $command): void
    {
        $job = new Job(
            Uuid::fromString($command->id),
            $command->jobDuties,
            $command->skills,
            $command->vacancy,
            new \DateTime($command->activeTill),
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