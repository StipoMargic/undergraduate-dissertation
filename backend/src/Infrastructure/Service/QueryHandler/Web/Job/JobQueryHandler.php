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

        if (null !== $query->filterSet && null !== $query->filterSet->getFilter('name')) {
            $companyName = $query->filterSet->getFilter('name')->getValue();
            $qb = $qb->join('j.user', 'jn')->where('jn.username LIKE :name')
                ->setParameter(':name', '%' . $companyName . '%');
        }

        if (null !== $query->filterSet && null !== $query->filterSet->getFilter('jobPositionName')) {
            $jobPositionName = $query->filterSet->getFilter('jobPositionName')->getValue();
            $qb = $qb->where('j.jobPositionName LIKE :jobPositionName')
                ->setParameter(':jobPositionName', '%' . $jobPositionName . '%');
        }

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
