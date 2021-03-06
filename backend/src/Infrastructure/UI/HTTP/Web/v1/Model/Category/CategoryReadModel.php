<?php

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Model\Category;

use App\Domain\Category\Category;
use App\Domain\Portfolio\Portfolio;
use Undabot\SymfonyJsonApi\Model\ApiModel;
use Undabot\SymfonyJsonApi\Model\Resource\Annotation\Attribute;
use Undabot\SymfonyJsonApi\Service\Resource\Validation\Constraint\ResourceType;

/** @ResourceType(type="category") */
class CategoryReadModel implements ApiModel
{
    public string $id;

    /** @Attribute */
    public array $portfolios;

    /** @Attribute */
    public string $name;

    /** @Attribute */
    public string $image;

    /** @Attribute */
    public ?string $description;

    /** @Attribute */
    public ?string $deletedAt;

    /** @Attribute */
    public int $published;

    /** @Attribute */
    public int $deactivated;

    public function __construct(
        string $id,
        array $portfolios,
        string $name,
        string $image,
        ?string $description,
        ?string $deletedAt,
        int $published,
        int $deactivated
    ) {
        $this->id = $id;
        $this->portfolios = $portfolios;
        $this->name = $name;
        $this->image = $image;
        $this->description = $description;
        $this->deletedAt = $deletedAt;
        $this->published = $published;
        $this->deactivated = $deactivated;
    }

    public static function fromEntity(Category $category): self
    {
        $published = 0;
        $deactivated = 0;

        $portfolios = array_map(static function (Portfolio $portfolio) {
            return $portfolio->getId();
        }, $category->getPortfolios()->getValues());

        foreach ($category->getPortfolios()->getValues() as $item) {
            if ($item->getDeletedAt() === null) {
                $published += 1;
            } else {
                $deactivated += 1;
            }
        }

        return new self(
            (string) $category->getId(),
            $portfolios,
            $category->getName(),
            $category->getImage(),
            $category->getDescription() === null ? null : $category->getDescription(),
            null === $category->getDeletedAt() ? null : $category->getDeletedAt()->format('Y-m-d H:i:s'),
            $published,
            $deactivated
        );
    }
}