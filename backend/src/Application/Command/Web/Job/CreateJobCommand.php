<?php
declare(strict_types = 1);

namespace App\Application\Command\Web\Job;


use App\Application\Command\CommandInterface;

class CreateJobCommand implements CommandInterface
{
    public function __construct(
        public string $id,
        public string $jobDuties,
        public string $skills,
        public string $vacancy,
        public string $postDate,
        public string $activeTill,
        public string $location,
        public string $salary,
        public string $hours,
        public string $typeOfPosition,
        public bool $disableFriendly
    ) {
    }
}