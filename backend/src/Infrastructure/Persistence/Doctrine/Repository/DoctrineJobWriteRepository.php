<?php


namespace App\Infrastructure\Persistence\Doctrine\Repository;


use App\Application\Job\JobRepository\JobWriteRepository;
use App\Domain\Job\Job;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class DoctrineJobWriteRepository extends ServiceEntityRepository implements JobWriteRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Job::class);
    }

    public function save(Job $job): void
    {
        $this->_em->persist($job);
        $this->_em->flush();
    }
}