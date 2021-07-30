<?php

declare(strict_types = 1);

namespace App\Infrastructure\Service\QueryHandler\Web\Portfolio;

use App\Application\Query\Web\Portfolio\PortfolioQuery;
use App\Domain\Portfolio\Portfolio;
use Doctrine\ORM\EntityManagerInterface;
use Undabot\JsonApi\Implementation\Model\Request\Sort\SortSet;
use Undabot\SymfonyJsonApi\Model\Collection\ArrayCollection;
use Undabot\SymfonyJsonApi\Model\Collection\ObjectCollection;
use Undabot\SymfonyJsonApi\Service\Pagination\Paginator;

class PortfolioQueryHandler
{
    public function __construct(private EntityManagerInterface $entityManager)
    {
    }

    public function __invoke(PortfolioQuery $query
    ): ObjectCollection {
        $qb = $this->entityManager->createQueryBuilder()->select('p')->from(Portfolio::class, 'p');

        if (null !== $query->filterSet && null !== $query->filterSet->getFilter('category')) {
            $categoryName = $query->filterSet->getFilter('category')->getValue();
            $qb = $qb->join('p.category', 'ca')->where('ca.name LIKE :category')
                ->setParameter(':category', '%' . $categoryName . '%');
        }

        if (null !== $query->filterSet && null !== $query->filterSet->getFilter('skills')) {
            $skills = $query->filterSet->getFilter('skills')->getValue();
            $qb = $qb->where('p.skills LIKE :skills')->setParameter(':skills', '%' . $skills . '%');
        }

        if (property_exists($query, 'sortSet') && null !== $query->sortSet && $query->sortSet instanceof SortSet) {
            foreach ($query->sortSet->getSortsArray() as $column => $direction) {
                $qb = $qb->orderBy('p.' . $column, $direction);
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