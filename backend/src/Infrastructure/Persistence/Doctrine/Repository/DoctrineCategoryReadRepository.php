<?php

declare(strict_types = 1);

namespace App\Infrastructure\Persistence\Doctrine\Repository;


use App\Application\Category\CategoryRepository\CategoryReadRepository;
use App\Domain\Category\Category;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Ramsey\Uuid\UuidInterface;

class DoctrineCategoryReadRepository extends ServiceEntityRepository implements CategoryReadRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Category::class);
    }

    public function get(UuidInterface $id): ?Category
    {
        try {
            /** @var Category $entity */
            $entity = $this->find($id);
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }

        return $entity;
    }
}