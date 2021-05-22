<?php

declare(strict_types=1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Model\Category;


use Undabot\SymfonyJsonApi\Model\ApiModel;
use Undabot\SymfonyJsonApi\Model\Resource\Annotation\Attribute;
use Undabot\SymfonyJsonApi\Service\Resource\Validation\Constraint\ResourceType;


/** @ResourceType(type="category") */
class CategoryWriteModel implements ApiModel
{
    public string $id;

    /** @Attribute  */
    public string $name;

    /** @Attribute  */
    public string $image;

    /** @Attribute  */
    public ?string $description;

    public function __construct(string $id, string $name, string $image, ?string $description)
    {
        $this->id = $id;
        $this->name = $name;
        $this->image = $image;
        $this->description = $description;
    }
}