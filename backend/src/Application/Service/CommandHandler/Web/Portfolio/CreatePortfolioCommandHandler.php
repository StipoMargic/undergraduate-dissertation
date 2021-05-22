<?php
declare(strict_types = 1);

namespace App\Application\Service\CommandHandler\Web\Portfolio;

use App\Application\Category\CategoryRepository\CategoryReadRepository;
use App\Application\Command\Web\Portfolio\CreatePortfolioCommand;
use App\Application\Portfolio\PortfolioRepository\PortfolioWriteRepository;
use App\Domain\Experience\Experience;
use App\Domain\Portfolio\Portfolio;
use App\Domain\Qualification\Qualification;
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

        $this->addQualificationsToPortfolio($command->qualifications, $portfolio);
        $this->addExperiencesToPortfolio($command->experiences, $portfolio);

        $this->portfolioWriteRepository->save($portfolio);
    }

    private function addQualificationsToPortfolio(array $qualifications, Portfolio $portfolio): void
    {
        foreach ($qualifications as $item) {
            $qualification = new Qualification(Uuid::fromString((string) Uuid::uuid4()), $item["nameOfQualification"],
                $item["yearStart"], $item["yearEnd"], $item["description"], $portfolio);
            $portfolio->addQualification($qualification);
        }
    }

    private function addExperiencesToPortfolio(array $experiences, Portfolio $portfolio): void
    {
        foreach ($experiences as $experience) {
            $newExperience = new Experience(Uuid::fromString((string) Uuid::uuid4()), $experience["jobTitle"],
                $experience["yearStart"], $experience["yearEnd"], $experience["description"], $portfolio);
            $portfolio->addExperience($newExperience);
        }
    }
}