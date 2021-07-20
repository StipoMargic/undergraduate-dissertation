<?php
declare(strict_types = 1);

namespace App\Application\Command\Web\Job;


use App\Application\Command\CommandInterface;

class UpdateJobCommand implements CommandInterface
{
    public function __construct(
        public string $id,
        public string $jobDuties,
        public string $skills,
        public int $vacancy,
        public string $activeTill,
        public string $location,
        public int $salary,
        public int $hours,
        public string $typeOfPosition,
        public bool $disableFriendly,
        public string $jobSummary,
        public string $jobPositionName,
        public string $jobDutiesBulletins
    ) {
    }
}