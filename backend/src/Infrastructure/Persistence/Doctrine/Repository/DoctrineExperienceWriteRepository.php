<?php

declare(strict_types = 1);

namespace App\Infrastructure\Persistence\Doctrine\Repository;


use App\Application\Experience\ExperienceRepository\ExperienceWriteRepository;
use App\Domain\Experience\Experience;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class DoctrineExperienceWriteRepository extends ServiceEntityRepository implements ExperienceWriteRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Experience::class);
    }

    public function save(Experience $experience): void
    {
        $this->_em->persist($experience);
        $this->_em->flush();
    }
}