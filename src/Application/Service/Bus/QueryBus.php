<?php

declare(strict_types=1);

namespace App\Application\Service\Bus;

use App\Application\Query\QueryInterface;
use Undabot\SymfonyJsonApi\Model\Collection\ObjectCollection;

interface QueryBus
{
    public function handleQuery(QueryInterface $query): ObjectCollection;
}
