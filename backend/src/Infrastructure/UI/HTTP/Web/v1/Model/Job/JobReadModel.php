<?php
declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Model\Job;

use App\Domain\Job\Job;
use Undabot\SymfonyJsonApi\Model\ApiModel;
use Undabot\SymfonyJsonApi\Model\Resource\Annotation\Attribute;
use Undabot\SymfonyJsonApi\Service\Resource\Validation\Constraint\ResourceType;

/** @ResourceType(type="job") */
class JobReadModel implements ApiModel
{
    public string $id;

    /** @Attribute */
    public string $name;

    /** @Attribute */
    public string $jobDuties;

    /** @Attribute */
    public string $skills;

    /** @Attribute */
    public string $vacancy;

    /** @Attribute */
    public string $postDate;

    /** @Attribute */
    public string $activeTill;

    /** @Attribute */
    public string $location;

    /** @Attribute */
    public string $salary;

    /** @Attribute */
    public string $hours;

    /** @Attribute */
    public string $typeOfPosition;

    /** @Attribute */
    public bool $disableFriendly;

    /** @Attribute */
    public string $jobSummary;

    /** @Attribute */
    public string $jobPositionName;

    /** @Attribute */
    public string $createdAt;

    /** @Attribute */
    public ?string $updatedAt;

    /** @Attribute */
    public ?string $deletedAt;

    public function __construct(
        string $id,
        string $name,
        string $jobDuties,
        string $skills,
        string $vacancy,
        string $postDate,
        string $activeTill,
        string $location,
        string $salary,
        string $hours,
        string $typeOfPosition,
        bool $disableFriendly,
        string $jobSummary,
        string $jobPositionName,
        string $createdAt,
        ?string $updatedAt,
        ?string $deletedAt
    ) {
        $this->id = $id;
        $this->name = $name;
        $this->jobDuties = $jobDuties;
        $this->skills = $skills;
        $this->vacancy = $vacancy;
        $this->postDate = $postDate;
        $this->activeTill = $activeTill;
        $this->location = $location;
        $this->salary = $salary;
        $this->hours = $hours;
        $this->typeOfPosition = $typeOfPosition;
        $this->disableFriendly = $disableFriendly;
        $this->jobSummary = $jobSummary;
        $this->jobPositionName = $jobPositionName;
        $this->createdAt = $createdAt;
        $this->updatedAt = $updatedAt;
        $this->deletedAt = $deletedAt;
    }

    public static function fromEntity(Job $job): self
    {
        return new self(
            (string) $job->getId(),
            $job->getUser()->getUsername(),
            $job->getJobDuties(),
            $job->getSkills(),
            $job->getVacancy(),
            $job->getPostDate()->format('Y-m-d H:i:s'),
            $job->getActiveTill(),
            $job->getLocation(),
            $job->getSalary(),
            $job->getHours(),
            $job->getTypeOfPosition(),
            $job->isDisableFriendly(),
            $job->getJobSummary(),
            $job->getJobPositionName(),
            $job->getCreatedAt()->format('Y-m-d H:i:s'),
            null === $job->getUpdatedAt() ? null : $job->getUpdatedAt()->format('Y-m-d H:i:s'),
            null === $job->getDeletedAt() ? null : $job->getDeletedAt()->format('Y-m-d H:i:s'),
        );
    }
}