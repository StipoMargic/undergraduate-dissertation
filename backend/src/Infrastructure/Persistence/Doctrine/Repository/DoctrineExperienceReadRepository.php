<?php

declare(strict_types = 1);

namespace App\Infrastructure\Persistence\Doctrine\Repository;


use App\Application\Experience\ExperienceRepository\ExperienceReadRepository;
use App\Domain\Experience\Experience;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Ramsey\Uuid\UuidInterface;

class DoctrineExperienceReadRepository extends ServiceEntityRepository implements ExperienceReadRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Experience::class);
    }

    public function get(UuidInterface $id): ?Experience
    {
        try {
            /** @var Experience $entity */
            $entity = $this->find($id);
        }catch (\Exception $e){
            throw new \Exception($e->getMessage());
        }

        return $entity;
    }
}