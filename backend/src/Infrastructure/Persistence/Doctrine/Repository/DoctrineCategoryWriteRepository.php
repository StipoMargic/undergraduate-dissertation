<?php

declare(strict_types = 1);


namespace App\Infrastructure\Persistence\Doctrine\Repository;


use App\Application\Category\CategoryRepository\CategoryWriteRepository;
use App\Domain\Category\Category;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class DoctrineCategoryWriteRepository extends ServiceEntityRepository implements CategoryWriteRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Category::class);
    }

    public function save(Category $category): void
    {
        $this->_em->persist($category);
        $this->_em->flush();
    }
}