<?php


namespace App\Domain\Category\Exception;


use App\Domain\Category\Category;
use App\Domain\Common\Exception\EntityNotFoundException;
use JetBrains\PhpStorm\Pure;

class CategoryNotFoundException extends EntityNotFoundException
{

    public static function getClassName(): string
    {
        return Category::class;
    }

    #[Pure] public static function withName(string $name): self
    {
        $message = sprintf("Category with name %s not found!", $name);

        return new self($message, 404);
    }
}