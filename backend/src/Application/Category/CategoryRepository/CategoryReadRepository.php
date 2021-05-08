<?php

declare(strict_types = 1);

namespace App\Application\Category\CategoryRepository;


use App\Domain\Category\Category;
use Ramsey\Uuid\UuidInterface;

interface CategoryReadRepository
{
    public function get(UuidInterface $id): ?Category;
}