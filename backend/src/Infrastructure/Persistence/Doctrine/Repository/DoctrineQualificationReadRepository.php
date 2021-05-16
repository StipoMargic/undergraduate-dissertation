<?php

declare(strict_types = 1);


namespace App\Infrastructure\Persistence\Doctrine\Repository;

use App\Application\Qualification\QualificationRepository\QualificationReadRepository;
use App\Domain\Qualification\Qualification;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Ramsey\Uuid\UuidInterface;

class DoctrineQualificationReadRepository extends ServiceEntityRepository implements QualificationReadRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Qualification::class);
    }

    public function get(UuidInterface $id): ?Qualification
    {
        try {
            /** @var Qualification $entity */
            $entity = $this->find($id);
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }

        return $entity;
    }
}