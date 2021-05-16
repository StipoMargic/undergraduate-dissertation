<?php

declare(strict_types = 1);

namespace App\Infrastructure\Service\QueryHandler\Web\Category;


use App\Application\Query\Web\Category\CategoryQuery;
use App\Domain\Category\Category;
use Doctrine\ORM\EntityManagerInterface;
use Undabot\JsonApi\Implementation\Model\Request\Sort\SortSet;
use Undabot\SymfonyJsonApi\Model\Collection\ArrayCollection;
use Undabot\SymfonyJsonApi\Service\Pagination\Paginator;

class CategoryQueryHandler
{
    public function __construct(private EntityManagerInterface $entityManager)
    {
    }

    public function __invoke(CategoryQuery $query): \Undabot\SymfonyJsonApi\Model\Collection\ObjectCollection|ArrayCollection
    {
        $qb = $this->entityManager->createQueryBuilder()->select('c')->from(Category::class, 'c');

        if (property_exists($query, 'sortSet') && null !== $query->sortSet && $query->sortSet instanceof SortSet) {
            foreach ($query->sortSet->getSortsArray() as $column => $direction) {
                $qb = $qb->orderBy('c.' . $column, $direction);
            }
        }

        return (null !== $query->offset && null !== $query->size)
            ? (new Paginator())
                ->createPaginatedCollection(
                    $qb,
                    $query->offset,
                    $query->size
                )
            : new ArrayCollection($qb->getQuery()->getResult());
    }
}