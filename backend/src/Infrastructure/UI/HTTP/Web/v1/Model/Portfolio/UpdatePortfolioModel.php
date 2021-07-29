<?php
declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Model\Portfolio;

use App\Domain\Portfolio\Portfolio;
use Undabot\SymfonyJsonApi\Model\ApiModel;
use Undabot\SymfonyJsonApi\Model\Resource\Annotation\Attribute;
use Undabot\SymfonyJsonApi\Service\Resource\Validation\Constraint\ResourceType;

/** @ResourceType(type="portfolio") */
class UpdatePortfolioModel implements ApiModel
{
    public string $id;

    /** @Attribute */
    public string $advancedKnowledge;

    /** @Attribute */
    public string $advancedKnowledgeBulletins;

    /** @Attribute */
    public string $skills;

    /** @Attribute */
    public int $disabilityPercent;

    /** @Attribute */
    public string $rate;

    /** @Attribute */
    public string $hour;

    public function __construct(
        string $id,
        string $advancedKnowledge,
        string $advancedKnowledgeBulletins,
        string $skills,
        int $disabilityPercent,
        string $rate,
        string $hour
    ) {
        $this->id = $id;
        $this->advancedKnowledge = $advancedKnowledge;
        $this->advancedKnowledgeBulletins = $advancedKnowledgeBulletins;
        $this->skills = $skills;
        $this->disabilityPercent = $disabilityPercent;
        $this->rate = $rate;
        $this->hour = $hour;
    }

    public static function fromEntity(Portfolio $portfolio): self
    {
        return new self(
            (string) $portfolio->getId(),
            $portfolio->getAdvancedKnowledge(),
            $portfolio->getAdvancedKnowledgeBulletins(),
            $portfolio->getSkills(),
            $portfolio->getDisabilityPercent(),
            $portfolio->getRate(),
            $portfolio->getHours(),
        );
    }
}