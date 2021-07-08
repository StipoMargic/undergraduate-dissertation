<?php


namespace App\Infrastructure\Service\QueryHandler\Web\Job;


use App\Application\Query\Web\Job\JobQuery;
use App\Domain\Job\Job;
use Doctrine\ORM\EntityManagerInterface;
use Undabot\JsonApi\Implementation\Model\Request\Sort\SortSet;
use Undabot\SymfonyJsonApi\Model\Collection\ArrayCollection;
use Undabot\SymfonyJsonApi\Model\Collection\ObjectCollection;
use Undabot\SymfonyJsonApi\Service\Pagination\Paginator;

class JobQueryHandler
{
    public function __construct(private EntityManagerInterface $entityManager)
    {
    }

    public function __invoke(JobQuery $query): ObjectCollection
    {
        $qb = $this->entityManager->createQueryBuilder()->select('j')->from(Job::class, 'j');

        if (property_exists($query, 'sortSet') && null !== $query->sortSet && $query->sortSet instanceof SortSet) {
            foreach ($query->sortSet->getSortsArray() as $column => $direction) {
                $qb = $qb->orderBy('j.' . $column, $direction);
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
