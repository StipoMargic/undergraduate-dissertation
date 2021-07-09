<?php


namespace App\Infrastructure\UI\HTTP\Web\v1\Model\Experience;

use App\Domain\Experience\Experience;
use JetBrains\PhpStorm\Pure;
use Undabot\SymfonyJsonApi\Model\ApiModel;
use Undabot\SymfonyJsonApi\Model\Resource\Annotation\Attribute;
use Undabot\SymfonyJsonApi\Service\Resource\Validation\Constraint\ResourceType;

/** @ResourceType(type="experience") */
class ExperienceReadModel implements ApiModel
{
    public string $id;

    /** @Attribute */
    public string $jobTitle;

    /** @Attribute */
    public int $yearStart;

    /** @Attribute */
    public ?int $yearEnd;

    /** @Attribute */
    public ?string $description;

    public function __construct(string $id, string $jobTitle, int $yearStart, ?int $yearEnd, ?string $description)
    {
        $this->id = $id;
        $this->jobTitle = $jobTitle;
        $this->yearStart = $yearStart;
        $this->yearEnd = $yearEnd;
        $this->description = $description;
    }

    #[Pure] public static function fromEntity(Experience $experience): self
    {
        return new self(
            (string) $experience->getId(),
            $experience->getJobTitle(),
            $experience->getYearStart(),
            null === $experience->getYearEnd() ? null : $experience->getYearEnd(),
            null === $experience->getDescription() ? null : $experience->getDescription()
        );
    }
}