<?php


namespace App\Application\Command\Web\Portfolio;


use App\Application\Command\CommandInterface;

class HireFreelancerCommand implements CommandInterface
{
    public function __construct(
        public string $id,
        public string $subject,
        public string $message,
        public string $portfolioId,
        public string $companyName
    ) {
    }
}