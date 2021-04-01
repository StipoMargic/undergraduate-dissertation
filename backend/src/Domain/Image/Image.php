<?php

declare(strict_types = 1);

namespace App\Domain\Image;


use App\Domain\Common\EntityInterface;
use App\Domain\Portfolio\Portfolio;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JetBrains\PhpStorm\Pure;
use Ramsey\Uuid\UuidInterface;

/**
 * @ORM\Entity
 * @ORM\Table(name="image")
 */
class Image implements EntityInterface
{
    /**
     * @ORM\Id
     * @ORM\Column(type="uuid", unique=true)
     */
    private UuidInterface $id;


    /**  @ORM\ManyToMany(targetEntity="App\Domain\Portfolio\Portfolio", mappedBy="images", cascade="persist") */
    private ?Collection $portfolios;

    /** @ORM\Column(name="path", type="string", nullable=false) */
    private string $path;

    /** @ORM\Column(name="created_at", type="datetime_immutable", nullable=false) */
    private \DateTimeImmutable $createdAt;

    /** @ORM\Column(name="updated_at", type="datetime_immutable", nullable=true) */
    private ?\DateTimeImmutable $updatedAt;

    /** @ORM\Column(name="deleted_at", type="datetime_immutable", nullable=true) */
    private ?\DateTimeImmutable $deletedAt;

    public function __construct(
        UuidInterface $id,
        array $portfolios,
        string $path,
    ) {
        $this->id = $id;
        $this->path = $path;
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = null;
        $this->deletedAt = null;
        if (false === empty($portfolios)) {
            $this->portfolios = $this->setPortfolios($portfolios);
        }
    }

    #[Pure] private function setPortfolios(array $portfolios): ?ArrayCollection
    {
        if (empty($portfolios)) {
            return null;
        }

        return new ArrayCollection($portfolios);
    }

    public function getId(): UuidInterface
    {
        return $this->id;
    }

    public function getPortfolios(): Collection|ArrayCollection|null
    {
        return $this->portfolios;
    }

    public function getPath(): string
    {
        return $this->path;
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

    public function addPortfolio(Portfolio $portfolio): void
    {
        if (false === $this->portfolios->contains($portfolio)) {
            $this->portfolios->add($portfolio);
        }
    }

    public function delete(): void
    {
        $this->deletedAt = new \DateTimeImmutable();
    }
}