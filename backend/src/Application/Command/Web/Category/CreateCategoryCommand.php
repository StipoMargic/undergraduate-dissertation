<?php

declare(strict_types = 1);

namespace App\Application\Command\Web\Category;


use App\Application\Command\CommandInterface;

class CreateCategoryCommand implements CommandInterface
{
    public function __construct(
        public string $id,
        public string $name,
        public string $image,
        public ?string $description
    ) {
    }
}