<?php

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Model\Portfolio;


use App\Domain\Image\Image;
use App\Domain\Portfolio\Portfolio;
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
    public array $images;

    /** @Attribute */
    public string $companyName;

    /** @Attribute */
    public string $address;

    /** @Attribute */
    public string $city;

    /** @Attribute */
    public string $phone;

    /** @Attribute */
    public int $disabilityPercent;

    /** @Attribute */
    public string $paycheck;

    /** @Attribute */
    public string $aboutCompany;

    /** @Attribute */
    public string $aboutJob;

    /** @Attribute */
    public string $jobPosition;

    /** @Attribute */
    public string $createdAt;

    /** @Attribute */
    public ?string $updatedAt;

    /** @Attribute */
    public ?string $deletedAt;

    public function __construct(
        string $id,
        string $user,
        array $images,
        string $companyName,
        string $address,
        string $city,
        string $phone,
        int $disabilityPercent,
        string $paycheck,
        string $aboutCompany,
        string $aboutJob,
        string $jobPosition,
        string $createdAt,
        ?string $updatedAt,
        ?string $deletedAt
    ) {
        $this->id = $id;
        $this->user = $user;
        $this->images = $images;
        $this->companyName = $companyName;
        $this->address = $address;
        $this->city = $city;
        $this->phone = $phone;
        $this->disabilityPercent = $disabilityPercent;
        $this->paycheck = $paycheck;
        $this->aboutCompany = $aboutCompany;
        $this->aboutJob = $aboutJob;
        $this->jobPosition = $jobPosition;
        $this->createdAt = $createdAt;
        $this->updatedAt = $updatedAt;
        $this->deletedAt = $deletedAt;
    }

    public static function fromEntity(Portfolio $portfolio): self
    {
        $images = array_map(static function (Image $image) {
            return $image->getPath();
        }, $portfolio->getImages()->getValues());

        return new self(
            (string) $portfolio->getId(),
            $portfolio->getUser()->getUsername(),
            $images,
            $portfolio->getCompanyName(),
            $portfolio->getAddress(),
            $portfolio->getCity(),
            $portfolio->getPhone(),
            $portfolio->getDisabilityPercent(),
            $portfolio->getPaycheck(),
            $portfolio->getAboutCompany(),
            $portfolio->getAboutJob(),
            $portfolio->getJobPosition(),
            $portfolio->getCreatedAt()->format('Y-m-d H:i:s'),
            null === $portfolio->getUpdatedAt() ? null : $portfolio->getUpdatedAt()->format('Y-m-d H:i:s'),
            null === $portfolio->getDeletedAt() ? null : $portfolio->getDeletedAt()->format('Y-m-d H:i:s')
        );
    }
}