<?php

declare(strict_types = 1);

namespace App\Infrastructure\Service\QueryHandler\Web\User;


use App\Application\Query\Web\User\UserQuery;
use App\Domain\User\User;
use Doctrine\ORM\EntityManagerInterface;
use Undabot\JsonApi\Implementation\Model\Request\Sort\SortSet;
use Undabot\SymfonyJsonApi\Model\Collection\ArrayCollection;
use Undabot\SymfonyJsonApi\Model\Collection\ObjectCollection;
use Undabot\SymfonyJsonApi\Service\Pagination\Paginator;

final class UserQueryHandler
{
    public function __construct(
        public EntityManagerInterface $entityManager
    ) {
    }

    public function __invoke(UserQuery $query): ObjectCollection
    {
        $qb = $this->entityManager->createQueryBuilder()->select('u')->from(User::class, 'u');

        if (null !== $query->filterSet && null !== $query->filterSet->getFilter('role')) {
            $userByRole = $query->filterSet->getFilter('role')->getValue();
            $qb = $qb->where('u.roles = :roles')->setParameter(':roles', $userByRole);
        }

        if (null !== $query->filterSet && null !== $query->filterSet->getFilter('name')) {
            $username = $query->filterSet->getFilter('name')->getValue();
            $qb = $qb->where('u.username LIKE :name')
                ->setParameter(':name', '%' . $username . '%');
        }


        if (property_exists($query, 'sortSet') && null !== $query->sortSet && $query->sortSet instanceof SortSet) {
            foreach ($query->sortSet->getSortsArray() as $column => $direction) {
                $qb = $qb->orderBy('u.' . $column, $direction);
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