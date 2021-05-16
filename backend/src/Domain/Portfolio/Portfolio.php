<?php

declare(strict_types = 1);

namespace App\Domain\Portfolio;

use App\Domain\Category\Category;
use App\Domain\Common\EntityInterface;
use App\Domain\Image\Image;
use App\Domain\User\User;
use Assert\Assertion;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\UuidInterface;

/**
 * @ORM\Entity
 * @ORM\Table(name="portfolio")
 */
final class Portfolio implements EntityInterface
{
    /**
     * @ORM\Id
     * @ORM\Column(type="uuid", unique=true)
     */
    private UuidInterface $id;

    /** @ORM\ManyToOne(targetEntity="App\Domain\User\User", inversedBy="portfolios", cascade="persist") */
    private User $user;

    /** @ORM\ManyToOne(targetEntity="App\Domain\Category\Category", inversedBy="portfolios", cascade="persist") */
    private Category $category;

    /** @ORM\Column(name="advancedKnowledge", type="string", nullable=false) */
    private string $advancedKnowledge;

    /** @ORM\Column(name="advancedKnowledgeBulletins", type="string", nullable=false) */
    private string $advancedKnowledgeBulletins;

    /** @ORM\Column(name="skills", type="string", nullable=false) */
    private string $skills;

    /** @ORM\Column(name="salary", type="string", nullable=false) */
    private string $salary;

    /** @ORM\Column(name="disability_percent", type="integer", nullable=false) */
    private int $disabilityPercent;

    /** @ORM\Column(name="$rate", type="string", nullable=false) */
    private string $rate;

    /** @ORM\Column(name="hours", type="string", nullable=false) */
    private string $hours;

    /** @ORM\Column(name="created_at", type="datetime_immutable", nullable=false) */
    private \DateTimeImmutable $createdAt;

    /** @ORM\Column(name="updated_at", type="datetime_immutable", nullable=true) */
    private ?\DateTimeImmutable $updatedAt;

    /** @ORM\Column(name="deleted_at", type="datetime_immutable", nullable=true) */
    private ?\DateTimeImmutable $deletedAt;


    public function __construct(
        UuidInterface $id,
        Category $category,
        string $advancedKnowledge,
        string $advancedKnowledgeBulletins,
        string $skills,
        string $salary,
        int $disabilityPercent,
        string $rate,
        string $hours
    ) {
        $this->id = $id;
        $this->category = $category;
        $this->advancedKnowledge = $advancedKnowledge;
        $this->advancedKnowledgeBulletins = $advancedKnowledgeBulletins;
        $this->skills = $skills;
        $this->salary = $salary;
        $this->disabilityPercent = $disabilityPercent;
        $this->rate = $rate;
        $this->hours = $hours;
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = null;
        $this->deletedAt = null;
    }


    public function getId(): UuidInterface
    {
        return $this->id;
    }

    public function setId(UuidInterface $id): void
    {
        $this->id = $id;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function setUser(User $user): void
    {
        $this->user = $user;
    }

    public function getCategory(): Category
    {
        return $this->category;
    }

    public function setCategory(Category $category): void
    {
        $this->category = $category;
    }

    public function getAdvancedKnowledge(): string
    {
        return $this->advancedKnowledge;
    }

    public function setAdvancedKnowledge(string $advancedKnowledge): void
    {
        $this->advancedKnowledge = $advancedKnowledge;
    }

    public function getAdvancedKnowledgeBulletins(): string
    {
        return $this->advancedKnowledgeBulletins;
    }

    public function setAdvancedKnowledgeBulletins(string $advancedKnowledgeBulletins): void
    {
        $this->advancedKnowledgeBulletins = $advancedKnowledgeBulletins;
    }

    public function getSkills(): string
    {
        return $this->skills;
    }

    public function setSkills(string $skills): void
    {
        $this->skills = $skills;
    }

    public function getSalary(): string
    {
        return $this->salary;
    }

    public function setSalary(string $salary): void
    {
        $this->salary = $salary;
    }

    public function getDisabilityPercent(): int
    {
        return $this->disabilityPercent;
    }

    public function setDisabilityPercent(int $disabilityPercent): void
    {
        $this->disabilityPercent = $disabilityPercent;
    }

    public function getRate(): string
    {
        return $this->rate;
    }

    public function setRate(string $rate): void
    {
        $this->rate = $rate;
    }

    public function getHours(): string
    {
        return $this->hours;
    }

    public function setHours(string $hours): void
    {
        $this->hours = $hours;
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