<?php

declare(strict_types = 1);

namespace App\Domain\Category;

use App\Domain\Portfolio\Portfolio;
use Assert\Assertion;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JetBrains\PhpStorm\Pure;
use Ramsey\Uuid\UuidInterface;

/**
 * @ORM\Entity
 * @ORM\Table(name="Category")
 */
class Category
{
    /**
     * @ORM\Id
     * @ORM\Column(type="uuid", unique=true)
     */
    private UuidInterface $id;

    /** @ORM\OneToMany(targetEntity="App\Domain\Portfolio\Portfolio", mappedBy="category", cascade="persist") */
    private ?Collection $portfolios;

    /** @ORM\Column(name="name", type="string", nullable=false) */
    private string $name;

    /** @ORM\Column(name="image", type="string", nullable=false) */
    private string $image;

    /** @ORM\Column(name="description", type="string", nullable=true) */
    private ?string $description;

    /** @ORM\Column(name="created_at", type="datetime_immutable", nullable=false) */
    private \DateTimeImmutable $createdAt;

    /** @ORM\Column(name="updated_at", type="datetime_immutable", nullable=true) */
    private ?\DateTimeImmutable $updatedAt;

    /** @ORM\Column(name="deleted_at", type="datetime_immutable", nullable=true) */
    private ?\DateTimeImmutable $deletedAt;

    public function __construct(
        UuidInterface $id,
        array $portfolios,
        string $name,
        string $image,
        ?string $description
    ) {
        $this->id = $id;
        $this->portfolios = $this->verifyPortfolios($portfolios);
        $this->name = $name;
        $this->image = $image;
        $this->description = $description;
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = null;
        $this->deletedAt = null;
    }

    private function verifyPortfolios(array $portfolios): ArrayCollection
    {
        Assertion::allIsInstanceOf($portfolios, Portfolio::class,
            "All items must be of type 'Portfolios', %s provided");

        return new ArrayCollection($portfolios);
    }

    public function getId(): UuidInterface
    {
        return $this->id;
    }

    public function getPortfolios(): ?Collection
    {
        return $this->portfolios;
    }

    public function setPortfolios(?array $portfolios): void
    {
        $this->portfolios = $this->verifyPortfolios($portfolios);
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getImage(): string
    {
        return $this->image;
    }

    public function setImage(string $image): void
    {
        $this->image = $image;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): void
    {
        $this->description = $description;
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