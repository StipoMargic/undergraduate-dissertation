<?php

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Model\Portfolio;


use Undabot\SymfonyJsonApi\Model\ApiModel;
use Undabot\SymfonyJsonApi\Model\Resource\Annotation\ToOne;
use Undabot\SymfonyJsonApi\Service\Resource\Validation\Constraint\ResourceType;

/**
 * @ResourceType(type="portfolio")
 */
class PortfolioWriteModel implements ApiModel
{
    public string $id;

    /** @ToOne(name="user", type="user") */
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
        string $jobPosition
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
    }
}