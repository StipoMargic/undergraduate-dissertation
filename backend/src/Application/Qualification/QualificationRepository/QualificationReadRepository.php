<?php

declare(strict_types = 1);

namespace App\Application\Qualification\QualificationRepository;

use App\Domain\Qualification\Qualification;
use Ramsey\Uuid\UuidInterface;

interface QualificationReadRepository {
    public function get(UuidInterface $id): ?Qualification;
}