<?php


namespace App\Infrastructure\Persistence\Doctrine\Repository;


use App\Application\Job\JobRepository\JobReadRepository;
use App\Domain\Job\Job;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Ramsey\Uuid\UuidInterface;

class DoctrineJobReadRepository extends ServiceEntityRepository implements JobReadRepository
{

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Job::class);
    }

    public function get(UuidInterface $id): ?Job
    {
        try {
            /** @var Job $entity */
            $entity = $this->find($id);
        }catch (\Exception $e){
            throw new \Exception($e->getMessage());
        }

        return $entity;
    }
}