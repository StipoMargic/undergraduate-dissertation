<?php

declare(strict_types = 1);

namespace App\Application\Service\CommandHandler\Web\Category;


use App\Application\Category\CategoryRepository\CategoryReadRepository;
use App\Application\Category\CategoryRepository\CategoryWriteRepository;
use App\Application\Command\Web\Category\CreateCategoryCommand;
use App\Domain\Category\Category;
use App\Domain\Category\Exception\CategoryNotFoundException;
use App\Infrastructure\Image\Upload\ImageUploader;
use Ramsey\Uuid\Uuid;
use Symfony\Component\HttpFoundation\File\File;

final class CreateCategoryCommandHandler
{
    public function __construct(
        private CategoryReadRepository $categoryReadRepository,
        private CategoryWriteRepository $categoryWriteRepository,
        private ImageUploader $imageUploader
    ) {
    }

    public function __invoke(CreateCategoryCommand $command): void
    {
        if ($this->categoryReadRepository->get(Uuid::fromString($command->id))) {
            throw CategoryNotFoundException::withName($command->name);
        }

        $image = $this->imageUploader->upload($this->createImage($command->image), 'category');

        $category = new Category(
            Uuid::fromString($command->id),
            [],
            $command->name,
            $image,
            $command->description
        );

        $this->categoryWriteRepository->save($category);
    }

    private function createImage(string $image): File
    {
        return $this->imageUploader->convert($image);
    }
}