<?php
declare(strict_types = 1);

namespace App\Application\Service\CommandHandler\Web\Portfolio;

use App\Application\Command\Web\Portfolio\CreatePortfolioCommand;
use App\Application\Portfolio\PortfolioRepository\PortfolioReadRepository;
use App\Application\Portfolio\PortfolioRepository\PortfolioWriteRepository;
use App\Application\User\UserRepository\UserReadRepository;
use App\Domain\Image\Image;
use App\Domain\Portfolio\Portfolio;
use App\Infrastructure\Image\Upload\ImageUploader;
use Ramsey\Uuid\Uuid;

final class CreatePortfolioCommandHandler
{
    public function __construct(
        private PortfolioWriteRepository $portfolioWriteRepository,
        private ImageUploader $imageUploader
    ) {
    }

    public function __invoke(CreatePortfolioCommand $command): void
    {
        $images = $this->getImages($command);

        $portfolio = new Portfolio(
            Uuid::fromString($command->id),
            [],
            $command->companyName,
            $command->address,
            $command->city,
            $command->phone,
            $command->disabilityPercent,
            $command->paycheck,
            $command->aboutCompany,
            $command->aboutJob,
            $command->jobPosition
        );

        foreach ($images as $image) {
            $imageEntity = new Image(Uuid::fromString((string) Uuid::uuid4()), [$portfolio], 'portfolio/' . $image);
            $portfolio->addImage($imageEntity);
        }

        $this->portfolioWriteRepository->save($portfolio);
    }

    private function getImages(CreatePortfolioCommand $command): array
    {
        $images = [];

        foreach ($command->images as $image) {
            $newImage = $this->imageUploader->convert($image);
            $imageName = $this->imageUploader->upload($newImage, 'portfolios');
            array_push($images, $imageName);
        }

        return $images;
    }
}