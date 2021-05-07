<?php

declare(strict_types=1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Model\Category;


use Undabot\SymfonyJsonApi\Model\ApiModel;
use Undabot\SymfonyJsonApi\Service\Resource\Validation\Constraint\ResourceType;
use Undabot\SymfonyJsonApi\Model\Resource\Annotation\Attribute;


/** @ResourceType(type="category") */
class CategoryWriteModel implements ApiModel
{
    public string $id;

    /** @Attribute  */
    public string $name;

    /** @Attribute  */
    public string $imaqe;

    /** @Attribute  */
    public ?string $description;

    public function __construct(string $id, string $name, string $imaqe, ?string $description)
    {
        $this->id = $id;
        $this->name = $name;
        $this->imaqe = $imaqe;
        $this->description = $description;
    }
}