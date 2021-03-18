<?php

declare(strict_types = 1);

namespace App\Application\Query\Web\User;


use App\Application\Query\QueryInterface;
use Undabot\JsonApi\Implementation\Model\Request\Filter\FilterSet;
use Undabot\JsonApi\Implementation\Model\Request\Sort\SortSet;

class UserQuery implements QueryInterface
{
    public function __construct(
        public ?int $offset,
        public ?int $size,
        public ?FilterSet $filterSet,
        public ?SortSet $sortSet
    ) {
    }
}