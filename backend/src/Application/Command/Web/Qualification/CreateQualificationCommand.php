<?php

declare(strict_types = 1);

namespace App\Application\Command\Web\Qualification;

use App\Application\Command\CommandInterface;

class CreateQualificationCommand implements CommandInterface
{
    public function __construct(
        public string $id,
        public string $nameOfQualification,
        public int $yearStart,
        public ?int $yearEnd,
        public ?string $description
    ) {
    }
}