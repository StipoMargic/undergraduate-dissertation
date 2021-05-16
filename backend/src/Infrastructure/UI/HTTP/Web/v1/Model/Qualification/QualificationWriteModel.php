<?php

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Model\Qualification;

use Undabot\SymfonyJsonApi\Model\ApiModel;
use Undabot\SymfonyJsonApi\Model\Resource\Annotation\Attribute;
use Undabot\SymfonyJsonApi\Service\Resource\Validation\Constraint\ResourceType;

/** @ResourceType(type="qualification") */
class QualificationWriteModel implements ApiModel
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
}
