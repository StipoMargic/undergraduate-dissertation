<?php

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Model\Portfolio;

use Undabot\SymfonyJsonApi\Model\ApiModel;
use Undabot\SymfonyJsonApi\Model\Resource\Annotation\Attribute;
use Undabot\SymfonyJsonApi\Service\Resource\Validation\Constraint\ResourceType;

/**
 * @ResourceType(type="portfolio")
 */
class PortfolioWriteModel implements ApiModel
{
    public string $id;

    /** @Attribute */
    public string $category;

    /** @Attribute */
    public string $advancedKnowledge;

    /** @Attribute */
    public string $advancedKnowledgeBulletins;

    /** @Attribute */
    public string $skills;

    /** @Attribute */
    public string $salary;

    /** @Attribute */
    public int $disabilityPercent;

    /** @Attribute */
    public string $rate;

    /** @Attribute */
    public string $hour;

    /** @Attribute */
    public array $qualifications;

    /** @Attribute */
    public array $experiences;

    public function __construct(
        string $id,
        string $category,
        string $advancedKnowledge,
        string $advancedKnowledgeBulletins,
        string $skills,
        string $salary,
        int $disabilityPercent,
        string $rate,
        string $hour,
        array $qualifications,
        array $experiences
    ) {
        $this->id = $id;
        $this->category = $category;
        $this->advancedKnowledge = $advancedKnowledge;
        $this->advancedKnowledgeBulletins = $advancedKnowledgeBulletins;
        $this->skills = $skills;
        $this->salary = $salary;
        $this->disabilityPercent = $disabilityPercent;
        $this->rate = $rate;
        $this->hour = $hour;
        $this->qualifications = $qualifications;
        $this->experiences = $experiences;
    }

}