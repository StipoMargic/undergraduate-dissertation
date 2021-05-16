<?php

declare(strict_types = 1);

namespace App\Application\Query\Web\Category;

use App\Application\Query\QueryInterface;
use Undabot\JsonApi\Implementation\Model\Request\Sort\SortSet;

class CategoryQuery implements QueryInterface
{
    public function __construct(
        public ?int $offset,
        public ?int $size,
        public ?SortSet $sortSet
    ) {
    }
}