<?php

declare(strict_types=1);

namespace App\Application\Job\JobRepository;


use App\Domain\Job\Job;
use Ramsey\Uuid\UuidInterface;

interface JobReadRepository
{
    public function get(UuidInterface $id): ?Job;
}