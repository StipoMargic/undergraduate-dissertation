<?php

declare(strict_types = 1);

namespace App\Application\Category\CategoryRepository;

use App\Domain\Category\Category;

interface CategoryWriteRepository
{
    public function save(Category $category): void;
}