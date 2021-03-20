<?php

declare(strict_types = 1);

namespace App\Infrastructure\Persistence\Doctrine\Repository;


use App\Application\Portfolio\PortfolioRepository\PortfolioReadRepository;
use App\Domain\Portfolio\Portfolio;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Ramsey\Uuid\UuidInterface;

class DoctrinePortfolioReadRepository extends ServiceEntityRepository implements PortfolioReadRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Portfolio::class);
    }

    public function get(UuidInterface $id): ?Portfolio
    {
        try {
            /** @var Portfolio $entity */
            $entity = $this->find($id);
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }

        return $entity;
    }
}