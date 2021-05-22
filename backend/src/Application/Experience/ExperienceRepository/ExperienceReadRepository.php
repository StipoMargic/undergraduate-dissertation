<?php


namespace App\Application\Experience\ExperienceRepository;


use App\Domain\Experience\Experience;
use Ramsey\Uuid\UuidInterface;

interface ExperienceReadRepository
{
    public function get(UuidInterface $id): ?Experience;
}