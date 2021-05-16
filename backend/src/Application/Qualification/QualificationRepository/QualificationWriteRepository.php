<?php

declare(strict_types = 1);

namespace App\Application\Qualification\QualificationRepository;

use App\Domain\Qualification\Qualification;

interface QualificationWriteRepository
{
    public function save(Qualification $qualification): void;
}