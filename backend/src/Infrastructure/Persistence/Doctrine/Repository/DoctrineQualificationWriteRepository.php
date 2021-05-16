<?php

declare(strict_types = 1);


namespace App\Infrastructure\Persistence\Doctrine\Repository;

use App\Application\Qualification\QualificationRepository\QualificationWriteRepository;
use App\Domain\Qualification\Qualification;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class DoctrineQualificationWriteRepository extends ServiceEntityRepository implements QualificationWriteRepository
{

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Qualification::class);
    }

    public function save(Qualification $qualification): void
    {
        $this->_em->persist($qualification);
        $this->_em->flush();
    }
}