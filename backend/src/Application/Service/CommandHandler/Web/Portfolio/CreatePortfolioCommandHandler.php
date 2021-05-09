<?php
declare(strict_types = 1);

namespace App\Application\Service\CommandHandler\Web\Portfolio;

use App\Application\Category\CategoryRepository\CategoryReadRepository;
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
        private CategoryReadRepository $categoryReadRepository,
    ) {
    }

    public function __invoke(CreatePortfolioCommand $command): void
    {
        $category = $this->categoryReadRepository->get(Uuid::fromString($command->category));

        $portfolio = new Portfolio(
            Uuid::fromString($command->id),
            $category, $command->advancedKnowledge, $command->advancedKnowledgeBulletins, $command->skills,
            $command->salary, $command->disabilityPercent, $command->rate, $command->hour
        );

        $this->portfolioWriteRepository->save($portfolio);
    }
}