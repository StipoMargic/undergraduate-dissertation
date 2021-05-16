<?php

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Model\Portfolio;


use App\Domain\Image\Image;
use App\Domain\Portfolio\Portfolio;
use App\Domain\Qualification\Qualification;
use Undabot\SymfonyJsonApi\Model\ApiModel;
use Undabot\SymfonyJsonApi\Service\Resource\Validation\Constraint\ResourceType;
use Undabot\SymfonyJsonApi\Model\Resource\Annotation\Attribute;

/**
 * @ResourceType(type="portfolio")
 */
class PortfolioReadModel implements ApiModel
{
    public string $id;

    /** @Attribute */
    public string $user;

    /** @Attribute */
    public string $category;

    /** @Attribute */
    public string $advancedKnowledge;

    /** @Attribute */
    public array $qualifications;

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
    public string $createdAt;

    /** @Attribute */
    public ?string $updatedAt;

    /** @Attribute */
    public ?string $deletedAt;

    public function __construct(
        string $id,
        string $user,
        string $category,
        string $advancedKnowledge,
        string $advancedKnowledgeBulletins,
        string $skills,
        string $salary,
        int $disabilityPercent,
        string $rate,
        string $hour,
        string $createdAt,
        ?string $updatedAt,
        ?string $deletedAt,
        array $qualifications
    ) {
        $this->id = $id;
        $this->user = $user;
        $this->category = $category;
        $this->advancedKnowledge = $advancedKnowledge;
        $this->advancedKnowledgeBulletins = $advancedKnowledgeBulletins;
        $this->skills = $skills;
        $this->salary = $salary;
        $this->disabilityPercent = $disabilityPercent;
        $this->rate = $rate;
        $this->hour = $hour;
        $this->createdAt = $createdAt;
        $this->updatedAt = $updatedAt;
        $this->deletedAt = $deletedAt;
        $this->qualifications = $qualifications;
    }


    public static function fromEntity(Portfolio $portfolio): self
    {
        $qualifications = array_map(static function (Qualification $q) {
            return $q->getId();
        }, $portfolio->getQualification()->getValues());

        return new self(
            (string) $portfolio->getId(),
            $portfolio->getUser()->getUsername(),
            $portfolio->getCategory()->getName(),
            $portfolio->getAdvancedKnowledge(),
            $portfolio->getAdvancedKnowledgeBulletins(),
            $portfolio->getSkills(),
            $portfolio->getSalary(),
            $portfolio->getDisabilityPercent(),
            $portfolio->getRate(),
            $portfolio->getHours(),
            $portfolio->getCreatedAt()->format('Y-m-d H:i:s'),
            null === $portfolio->getUpdatedAt() ? null : $portfolio->getUpdatedAt()->format('Y-m-d H:i:s'),
            null === $portfolio->getDeletedAt() ? null : $portfolio->getDeletedAt()->format('Y-m-d H:i:s'),
            $qualifications
        );
    }
}