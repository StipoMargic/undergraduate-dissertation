<?php


namespace App\Application\Experience\ExperienceRepository;


use App\Domain\Experience\Experience;

interface ExperienceWriteRepository
{
    public function save(Experience $experience): void;
}