<?php

declare(strict_types = 1);

namespace App\Application\Command\Web\Category;


use App\Application\Command\CommandInterface;

class DeleteCategoryCommand implements CommandInterface
{
    public function __construct(public string $id)
    {
    }
}