<?php


namespace App\Application\Service\CommandHandler\Web\Portfolio;


use App\Application\Command\Web\Portfolio\HireFreelancerCommand;
use App\Application\Portfolio\PortfolioRepository\PortfolioReadRepository;
use App\Application\Portfolio\PortfolioRepository\PortfolioWriteRepository;
use App\Domain\Portfolio\Portfolio;
use Ramsey\Uuid\Uuid;

final class HireFreelancerCommandHandler
{
    public function __construct(
        public PortfolioReadRepository $portfolioReadRepository,
        public PortfolioWriteRepository $portfolioWriteRepository
    ) {
    }

    public function __invoke(HireFreelancerCommand $command): void
    {
        $portfolio = $this->portfolioReadRepository->get(Uuid::fromString($command->portfolioId));

        $portfolio->addHired($command->companyName);

        $this->portfolioWriteRepository->save($portfolio);
        $this->sendMail($portfolio, $command->subject, $command->message);
    }

    private function sendMail(?Portfolio $portfolio, string $subject, string $message)
    {

    }
}