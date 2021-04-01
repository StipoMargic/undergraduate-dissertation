<?php

declare(strict_types = 1);

namespace App\Infrastructure\Persistence\Doctrine\Repository;


use App\Application\Portfolio\PortfolioRepository\PortfolioWriteRepository;
use App\Domain\Portfolio\Portfolio;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class DoctrinePortfolioWriteRepository extends ServiceEntityRepository implements PortfolioWriteRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Portfolio::class);
    }

    public function save(Portfolio $portfolio): void
    {
        $this->_em->persist($portfolio);
        $this->_em->flush();
    }
}