<?php
declare(strict_types = 1);

namespace App\Application\Service\CommandHandler\Web\Portfolio;

use App\Application\Command\Web\Portfolio\DeletePortfolioCommand;
use App\Application\Portfolio\PortfolioRepository\PortfolioReadRepository;
use App\Application\Portfolio\PortfolioRepository\PortfolioWriteRepository;
use Ramsey\Uuid\Uuid;

final class DeletePortfolioCommandHandler
{
    public function __construct(
        private PortfolioReadRepository $portfolioReadRepository,
        private PortfolioWriteRepository $portfolioWriteRepository
    )
    {
    }

    public function __invoke(DeletePortfolioCommand $command): void
    {
        $portfolio = $this->portfolioReadRepository->get(Uuid::fromString($command->id));
        $portfolio->delete();
        $this->portfolioWriteRepository->save($portfolio);
    }
}