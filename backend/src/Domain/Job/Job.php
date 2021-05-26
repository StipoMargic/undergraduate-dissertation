<?php

declare(strict_types = 1);

namespace App\Domain\Job;

use App\Domain\Common\EntityInterface;
use App\Domain\User\User;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\UuidInterface;

/**
 * @ORM\Entity
 * @ORM\Table(name="Job")
 */
class Job implements EntityInterface
{
    /**
     * @ORM\Id“
     * @ORM\Column(type="uuid", unique=true)
     */
    private UuidInterface $id;

    /**  @ORM\ManyToOne(targetEntity="App\Domain\User\User", inversedBy="jobs", cascade="persist") */
    private User $user;

    /** @ORM\Column(name="job_duties", type="string", nullable=false) */
    private string $jobDuties;

    /** @ORM\Column(name="skills", type="string", nullable=false) */
    private string $skills;

    /** @ORM\Column(name="vacancy", type="string", nullable=false) */
    private string $vacancy;

    /** @ORM\Column(name="post_date", type="datetime_immutable", nullable=false) */
    private \DateTimeImmutable $postDate;

    /** @ORM\Column(name="active_till", type="string", nullable=false) */
    private string $activeTill;

    /** @ORM\Column(name="location", type="string", nullable=false) */
    private string $location;

    /** @ORM\Column(name="salary", type="string", nullable=false) */
    private string $salary;

    /** @ORM\Column(name="hours", type="string", nullable=false) */
    private string $hours;

    /** @ORM\Column(name="type_of_position", type="string", nullable=false) */
    private string $typeOfPosition;

    /** @ORM\Column(name="disable_friendly", nullable=false, type="boolean") */
    private bool $disableFriendly;

    /** @ORM\Column(name="created_at", type="datetime_immutable", nullable=false) */
    private \DateTimeImmutable $createdAt;

    /** @ORM\Column(name="updated_at", type="datetime_immutable", nullable=true) */
    private ?\DateTimeImmutable $updatedAt;

    /** @ORM\Column(name="deleted_at", type="datetime_immutable", nullable=true) */
    private ?\DateTimeImmutable $deletedAt;

    public function __construct(
        UuidInterface $id,
        string $jobDuties,
        string $skills,
        string $vacancy,
        string $activeTill,
        string $location,
        string $salary,
        string $hours,
        string $typeOfPosition,
        bool $disableFriendly,
    ) {
        $this->id = $id;
        $this->jobDuties = $jobDuties;
        $this->skills = $skills;
        $this->vacancy = $vacancy;
        $this->postDate = new \DateTimeImmutable();
        $this->activeTill = $activeTill;
        $this->location = $location;
        $this->salary = $salary;
        $this->hours = $hours;
        $this->typeOfPosition = $typeOfPosition;
        $this->disableFriendly = $disableFriendly;
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

    public function setUser(User $user): void
    {
        $this->user = $user;
    }

    public function getJobDuties(): string
    {
        return $this->jobDuties;
    }

    public function setJobDuties(string $jobDuties): void
    {
        $this->jobDuties = $jobDuties;
    }

    public function getSkills(): string
    {
        return $this->skills;
    }

    public function setSkills(string $skills): void
    {
        $this->skills = $skills;
    }

    public function getVacancy(): string
    {
        return $this->vacancy;
    }

    public function setVacancy(string $vacancy): void
    {
        $this->vacancy = $vacancy;
    }

    public function getActiveTill(): string
    {
        return $this->activeTill;
    }

    public function setActiveTill(string $activeTill): void
    {
        $this->activeTill = $activeTill;
    }

    public function getLocation(): string
    {
        return $this->location;
    }

    public function setLocation(string $location): void
    {
        $this->location = $location;
    }

    public function getSalary(): string
    {
        return $this->salary;
    }

    public function setSalary(string $salary): void
    {
        $this->salary = $salary;
    }

    public function getHours(): string
    {
        return $this->hours;
    }

    public function setHours(string $hours): void
    {
        $this->hours = $hours;
    }

    public function getTypeOfPosition(): string
    {
        return $this->typeOfPosition;
    }

    public function setTypeOfPosition(string $typeOfPosition): void
    {
        $this->typeOfPosition = $typeOfPosition;
    }

    public function isDisableFriendly(): bool
    {
        return $this->disableFriendly;
    }

    public function setDisableFriendly(bool $disableFriendly): void
    {
        $this->disableFriendly = $disableFriendly;
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

    public function getPostDate(): \DateTimeImmutable
    {
        return $this->postDate;
    }

}