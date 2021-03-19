<?php

declare(strict_types = 1);

namespace App\Domain\Portfolio;

use App\Domain\Common\EntityInterface;
use App\Domain\User\User;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\UuidInterface;

/**
 * @ORM\Entity
 * @ORM\Table(name="portfolio)
 */
final class Portfolio implements EntityInterface
{
    /**
     * @ORM\Id
     * @ORM\Column(type="uuid", unique=true)
     */
    private UuidInterface $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Domain\User\User", inversedBy="portfolios", cascade="persist")
     */
    private User $user;

    /** @ORM\Column(name="company_name", type="string", nullable=false) */
    private string $companyName;

    /** @ORM\Column(name="address", type="string", nullable=false) */
    private string $address;

    /** @ORM\Column(name="city", type="string", nullable=false) */
    private string $city;

    /** @ORM\Column(name="phone", type="string", nullable=false) */
    private string $phone;

    /** @ORM\Column(name="disability_percent", type="integer", nullable=false) */
    private int $disabilityPercent;

    /** @ORM\Column(name="paycheck", type="string", nullable=false) */
    private string $paycheck;

    /** @ORM\Column(name="about_company", type="string", nullable=false) */
    private string $aboutCompany;

    /** @ORM\Column(name="about_job", type="string", nullable=false) */
    private string $aboutJob;

    /** @ORM\Column(name="job_position", type="string", nullable=false) */
    private string $jobPosition;

    /** @ORM\Column(name="created_at", type="datetime_immutable", nullable=false) */
    private \DateTimeImmutable $createdAt;

    /** @ORM\Column(name="updated_at", type="datetime_immutable", nullable=true) */
    private ?\DateTimeImmutable $updatedAt;

    /** @ORM\Column(name="deleted_at", type="datetime_immutable", nullable=true) */
    private ?\DateTimeImmutable $deletedAt;

    public function __construct(
        UuidInterface $id,
        User $user,
        string $companyName,
        string $address,
        string $city,
        string $phone,
        int $disabilityPercent,
        string $paycheck,
        string $aboutCompany,
        string $aboutJob,
        string $jobPosition,
    ) {
        $this->id = $id;
        $this->user = $user;
        $this->companyName = $companyName;
        $this->address = $address;
        $this->city = $city;
        $this->phone = $phone;
        $this->disabilityPercent = $disabilityPercent;
        $this->paycheck = $paycheck;
        $this->aboutCompany = $aboutCompany;
        $this->aboutJob = $aboutJob;
        $this->jobPosition = $jobPosition;
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = null;
        $this->deletedAt = null;
    }

    public function getId(): UuidInterface
    {
        return $this->id;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function getCompanyName(): string
    {
        return $this->companyName;
    }

    public function getAddress(): string
    {
        return $this->address;
    }

    public function getCity(): string
    {
        return $this->city;
    }

    public function getPhone(): string
    {
        return $this->phone;
    }

    public function getDisabilityPercent(): int
    {
        return $this->disabilityPercent;
    }

    public function getPaycheck(): string
    {
        return $this->paycheck;
    }

    public function getAboutCompany(): string
    {
        return $this->aboutCompany;
    }

    public function getAboutJob(): string
    {
        return $this->aboutJob;
    }

    public function getJobPosition(): string
    {
        return $this->jobPosition;
    }

    public function getCreatedAt(): \DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function getDeletedAt(): ?\DateTimeImmutable
    {
        return $this->deletedAt;
    }

    public function delete(): void
    {
        $this->deletedAt = new \DateTimeImmutable();
    }
}