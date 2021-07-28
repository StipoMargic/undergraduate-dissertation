<?php
declare(strict_types = 1);

namespace App\Application\Command\Web\Job;


use App\Application\Command\CommandInterface;

class JobApproveCommand implements CommandInterface
{
    public function __construct(
        public string $id,
        public string $jobId,
        public string $applicantName
    ) {
    }
}