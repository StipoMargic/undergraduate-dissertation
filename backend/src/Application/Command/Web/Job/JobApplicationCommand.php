<?php


namespace App\Application\Command\Web\Job;


use App\Application\Command\CommandInterface;

class JobApplicationCommand implements CommandInterface
{
    public function __construct(
        public string $id,
        public string $subject,
        public string $message,
        public string $jobId,
        public string $resume,
        public string $username
    ) {
    }
}