<?php

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Model\Portfolio;


use App\Domain\Portfolio\Portfolio;
use Undabot\SymfonyJsonApi\Model\ApiModel;
use Undabot\SymfonyJsonApi\Model\Resource\Annotation\Attribute;
use Undabot\SymfonyJsonApi\Service\Resource\Validation\Constraint\ResourceType;

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
    public string $avatar;

    /** @Attribute */
    public string $location;

    /** @Attribute */
    public string $createdAt;

    /** @Attribute */
    public ?string $updatedAt;

    /** @Attribute */
    public ?string $deletedAt;

    /** @Attribute */
    public array $hiredBy;

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
        string $location,
        string $avatar,
        string $createdAt,
        ?string $updatedAt,
        ?string $deletedAt,
        array $hiredBy
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
        $this->avatar = $avatar;
        $this->location = $location;
        $this->createdAt = $createdAt;
        $this->updatedAt = $updatedAt;
        $this->deletedAt = $deletedAt;
        $this->hiredBy = $hiredBy;
    }


    public static function fromEntity(Portfolio $portfolio): self
    {
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
            $portfolio->getUser()->getCity(),
            '/images/avatar/' . $portfolio->getUser()->getAvatar(),
            $portfolio->getCreatedAt()->format('Y-m-d H:i:s'),
            null === $portfolio->getUpdatedAt() ? null : $portfolio->getUpdatedAt()->format('Y-m-d H:i:s'),
            null === $portfolio->getDeletedAt() ? null : $portfolio->getDeletedAt()->format('Y-m-d H:i:s'),
            $portfolio->getHiredBy()
        );
    }
}