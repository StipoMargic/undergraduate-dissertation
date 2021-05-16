<?php

declare(strict_types = 1);

namespace App\Domain\Qualification;

use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\UuidInterface;

/**
 * @ORM\Entity
 * @ORM\Table(name="Qualification")
 */
class Qualification
{
    /**
     * @ORM\Id
     * @ORM\Column(type="uuid", nullable=false)
     */
    private UuidInterface $id;



    /** @ORM\Column(name="name_of_qualification", type="string", nullable=false) */
    private string $nameOfQualification;

    /** @ORM\Column(name="year_start", type="integer", nullable=false) */
    private int $yearStart;

    /** @ORM\Column(name="year_end", type="integer" , nullable=true) */
    private ?int $yearEnd;

    /** @ORM\Column(name="description", nullable=true) */
    private ?string $description;

    public function __construct(
        UuidInterface $id,
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

    public function getId(): UuidInterface
    {
        return $this->id;
    }

    public function getNameOfQualification(): string
    {
        return $this->nameOfQualification;
    }

    public function setNameOfQualification(string $nameOfQualification): void
    {
        $this->nameOfQualification = $nameOfQualification;
    }

    public function getYearStart(): int
    {
        return $this->yearStart;
    }

    public function setYearStart(int $yearStart): void
    {
        $this->yearStart = $yearStart;
    }

    public function getYearEnd(): ?int
    {
        return $this->yearEnd;
    }

    public function setYearEnd(?int $yearEnd): void
    {
        $this->yearEnd = $yearEnd;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }
}