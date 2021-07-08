<?php

declare(strict_types=1);

namespace App\Application\Query\Web\Job;


use App\Application\Query\QueryInterface;
use Undabot\JsonApi\Implementation\Model\Request\Filter\FilterSet;
use Undabot\JsonApi\Implementation\Model\Request\Sort\SortSet;

class JobQuery implements QueryInterface
{
    public function __construct(
        public ?int $offset,
        public ?int $size,
        public ?SortSet $sortSet,
        public ?FilterSet $filterSet
    )
    {
    }
}