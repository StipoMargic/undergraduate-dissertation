<?php


namespace App\Application\Service\CommandHandler\Web\Category;


use App\Application\Category\CategoryRepository\CategoryReadRepository;
use App\Application\Category\CategoryRepository\CategoryWriteRepository;
use App\Application\Command\Web\Category\UpdateCategoryCommand;
use App\Domain\Category\Exception\CategoryNotFoundException;
use App\Infrastructure\Image\Upload\ImageUploader;
use Ramsey\Uuid\Uuid;
use Symfony\Component\HttpFoundation\File\File;

final class UpdateCategoryCommandHandler
{
    public function __construct(
        public CategoryReadRepository $categoryReadRepository,
        public CategoryWriteRepository $categoryWriteRepository,
        public ImageUploader $uploader
    ) {
    }

    public function __invoke(UpdateCategoryCommand $command): void
    {

        $category = $this->categoryReadRepository->get(Uuid::fromString($command->id));
        if (null === $category) {
            throw CategoryNotFoundException::withName($command->name);
        }

        $image = $this->uploader->upload($this->createImage($command->image), 'category');

        $category->update(
            $command->name,
            $image,
            $command->description
        );

        $this->categoryWriteRepository->save($category);
    }

    private function createImage(string $image): File
    {
        return $this->uploader->convert($image);
    }
}