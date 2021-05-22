<?php

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Model\Qualification;

use App\Domain\Qualification\Qualification;
use JetBrains\PhpStorm\Pure;
use Undabot\SymfonyJsonApi\Model\ApiModel;
use Undabot\SymfonyJsonApi\Service\Resource\Validation\Constraint\ResourceType;
use Undabot\SymfonyJsonApi\Model\Resource\Annotation\Attribute;

/** @ResourceType(type="qualification") */
class QualificationReadModel implements ApiModel
{
    public string $id;

    /** @Attribute */
    public string $nameOfQualification;

    /** @Attribute */
    public int $yearStart;

    /** @Attribute */
    public ?int $yearEnd;

    /** @Attribute */
    public ?string $description;

    public function __construct(
        string $id,
        string $nameOfQualification,
        int $yearStart,
        ?int $yearEnd,
        ?string $description
    ) {
        $this->id = $id;
        $this->nameOfQualification = $nameOfQualification;
        $this->yearStart = $yearStart;
        $this->yearEnd = $yearEnd;
        $this->description = $description;
    }

    #[Pure] public static function fromEntity(Qualification $qualification): self
    {
        return new self(
            (string) $qualification->getId(),
            $qualification->getNameOfQualification(),
            $qualification->getYearStart(),
            $qualification->getYearEnd(),
            $qualification->getDescription()
        );
    }
}