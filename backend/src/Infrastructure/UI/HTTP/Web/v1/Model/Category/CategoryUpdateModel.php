<?php


namespace App\Infrastructure\UI\HTTP\Web\v1\Model\Category;

use App\Domain\Category\Category;
use Undabot\SymfonyJsonApi\Model\ApiModel;
use Undabot\SymfonyJsonApi\Model\Resource\Annotation\Attribute;
use Undabot\SymfonyJsonApi\Service\Resource\Validation\Constraint\ResourceType;

/** @ResourceType(type="category") */
class CategoryUpdateModel implements ApiModel
{
    public string $id;

    /** @Attribute */
    public string $name;

    /** @Attribute */
    public string $image;

    /** @Attribute */
    public string $description;

    public function __construct(string $id, string $name, string $image, string $description)
    {
        $this->id = $id;
        $this->name = $name;
        $this->image = $image;
        $this->description = $description;
    }

    public static function fromEntity(Category $category): self
    {
        return new self(
            $category->getId(),
            $category->getName(),
            $category->getImage(),
            $category->getDescription(),
        );
    }
}