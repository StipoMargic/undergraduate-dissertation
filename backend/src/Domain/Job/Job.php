<?php

declare(strict_types = 1);

namespace App\Domain\Job;

use App\Domain\Comment\Comment;
use App\Domain\Common\EntityInterface;
use App\Domain\User\User;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\UuidInterface;

/**
 * @ORM\Entity
 * @ORM\Table(name="Job")
 */
class Job implements EntityInterface
{
    /**
     * @ORM\Id
     * @ORM\Column(type="uuid", unique=true)
     */
    private UuidInterface $id;

    /**  @ORM\ManyToOne(targetEntity="App\Domain\User\User", inversedBy="jobs", cascade="persist") */
    private User $user;

    /** @ORM\OneToMany(targetEntity="App\Domain\Comment\Comment", mappedBy="job") */
    private ?Collection $comments;

    /** @ORM\Column(name="job_duties", type="string", nullable=false) */
    private string $jobDuties;

    /** @ORM\Column(name="job_duties_bulletins", type="string", nullable=false) */
    private string $jobDutiesBulletins;

    /** @ORM\Column(name="skills", type="string", nullable=false) */
    private string $skills;

    /** @ORM\Column(name="vacancy", type="integer", nullable=false) */
    private int $vacancy;

    /** @ORM\Column(name="post_date", type="datetime_immutable", nullable=false) */
    private \DateTimeImmutable $postDate;

    /** @ORM\Column(name="active_till", type="datetime_immutable", nullable=false) */
    private \DateTimeImmutable $activeTill;

    /** @ORM\Column(name="location", type="string", nullable=false) */
    private string $location;

    /** @ORM\Column(name="salary", type="integer", nullable=false) */
    private int $salary;

    /** @ORM\Column(name="hours", type="integer", nullable=false) */
    private int $hours;

    /** @ORM\Column(name="type_of_position", type="string", nullable=false) */
    private string $typeOfPosition;

    /** @ORM\Column(name="disable_friendly", nullable=false, type="boolean") */
    private bool $disableFriendly;

    /** @ORM\Column(name="job_summary", nullable=false, type="string") */
    private string $jobSummary;

    /** @ORM\Column(name="job_position_name", nullable=false, type="string") */
    private string $jobPositionName;

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
        int $vacancy,
        \DateTimeImmutable $activeTill,
        string $location,
        int $salary,
        int $hours,
        string $typeOfPosition,
        bool $disableFriendly,
        string $jobSummary,
        string $jobPositionName,
        string $jobDutiesBulletins
    ) {
        $this->id = $id;
        $this->jobDutiesBulletins = $jobDutiesBulletins;
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
        $this->jobSummary = $jobSummary;
        $this->jobPositionName = $jobPositionName;
        $this->comments = new ArrayCollection();
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

    public function getVacancy(): int
    {
        return $this->vacancy;
    }

    public function setVacancy(int $vacancy): void
    {
        $this->vacancy = $vacancy;
    }

    public function getActiveTill(): \DateTimeImmutable|string
    {
        return $this->activeTill;
    }

    public function setActiveTill(\DateTimeImmutable|string $activeTill): void
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

    public function getSalary(): int
    {
        return $this->salary;
    }

    public function setSalary(int $salary): void
    {
        $this->salary = $salary;
    }

    public function getHours(): int
    {
        return $this->hours;
    }

    public function setHours(int $hours): void
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

    public function getJobSummary(): string
    {
        return $this->jobSummary;
    }

    public function getJobPositionName(): string
    {
        return $this->jobPositionName;
    }

    public function getJobDutiesBulletins(): string
    {
        return $this->jobDutiesBulletins;
    }

    public function setJobDutiesBulletins(string $jobDutiesBulletins): void
    {
        $this->jobDutiesBulletins = $jobDutiesBulletins;
    }

    public function getComments(): ArrayCollection|Collection|null
    {
        return $this->comments;
    }


    public function addComment(Comment $comment)
    {
        $this->comments->add($comment);
    }
}