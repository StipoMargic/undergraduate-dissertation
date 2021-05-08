<?php

declare(strict_types = 1);

namespace App\Application\Service\CommandHandler\Web\Category;


use App\Application\Category\CategoryRepository\CategoryReadRepository;
use App\Application\Category\CategoryRepository\CategoryWriteRepository;
use App\Application\Command\Web\Category\DeleteCategoryCommand;
use App\Domain\Category\Exception\CategoryNotFoundException;
use Ramsey\Uuid\Uuid;

class DeleteCategoryCommandHandler
{
    public function __construct(
        private CategoryReadRepository $categoryReadRepository,
        private CategoryWriteRepository $categoryWriteRepository
    ) {
    }


    public function __invoke(DeleteCategoryCommand $command)
    {
        $category = $this->categoryReadRepository->get(Uuid::fromString($command->id));

        if ($category === null) {
            throw CategoryNotFoundException::withId($command->id);
        }

        $category->delete();
        $this->categoryWriteRepository->save($category);
    }
}