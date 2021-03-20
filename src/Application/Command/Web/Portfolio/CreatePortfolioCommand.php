<?php

declare(strict_types = 1);

namespace App\Application\Command\Web\Portfolio;

use App\Application\Command\CommandInterface;

class CreatePortfolioCommand implements CommandInterface
{
    public function __construct(
        public string $id,
        public string $user,
        public array $images,
        public string $companyName,
        public string $address,
        public string $city,
        public string $phone,
        public int $disabilityPercent,
        public string $paycheck,
        public string $aboutCompany,
        public string $aboutJob,
        public string $jobPosition
    ) {
    }
}