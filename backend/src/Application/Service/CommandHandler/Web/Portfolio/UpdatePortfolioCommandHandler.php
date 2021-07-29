<?php
declare(strict_types = 1);

namespace App\Application\Service\CommandHandler\Web\Portfolio;

use App\Application\Command\Web\Portfolio\UpdatePortfolioCommand;
use App\Application\Portfolio\PortfolioRepository\PortfolioReadRepository;
use App\Application\Portfolio\PortfolioRepository\PortfolioWriteRepository;
use Ramsey\Uuid\Uuid;

final class UpdatePortfolioCommandHandler
{
    public function __construct(
        private PortfolioReadRepository $portfolioReadRepository,
        private PortfolioWriteRepository $portfolioWriteRepository
    ) {
    }

    public function __invoke(UpdatePortfolioCommand $command): void
    {
        $portfolio = $this->portfolioReadRepository->get(Uuid::fromString($command->id));

        $portfolio->update(
            $command->advancedKnowledge,
            $command->advancedKnowledgeBulletins,
            $command->disabilityPercent,
            $command->skills,
            $command->rate,
            $command->hour
        );

         $this->portfolioWriteRepository->save($portfolio);
    }
}