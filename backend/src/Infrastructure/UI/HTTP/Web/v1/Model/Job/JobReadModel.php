<?php
declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Model\Job;

use App\Domain\Comment\Comment;
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
    public string $logo;

    /** @Attribute */
    public string $jobDuties;

    /** @Attribute */
    public string $skills;

    /** @Attribute */
    public int $vacancy;

    /** @Attribute */
    public string $postDate;

    /** @Attribute */
    public string $activeTill;

    /** @Attribute */
    public string $location;

    /** @Attribute */
    public int $salary;

    /** @Attribute */
    public int $hours;

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

    /** @Attribute */
    public string $jobDutiesBulletins;

    /** @Attribute */
    public array $applied;

    /** @Attribute */
    public array $approved;

    /** @Attribute */
    public array $declined;

    /** @Attribute */
    public array $comments;

    /** @Attribute */
    public float $averageScore;

    public function __construct(
        string $id,
        string $name,
        string $logo,
        string $jobDuties,
        string $skills,
        int $vacancy,
        string $postDate,
        string $activeTill,
        string $location,
        int $salary,
        int $hours,
        string $typeOfPosition,
        bool $disableFriendly,
        string $jobSummary,
        string $jobPositionName,
        string $createdAt,
        ?string $updatedAt,
        ?string $deletedAt,
        string $jobDutiesBulletins,
        array $applied,
        array $comments,
        float $averageScore,
        array $approved,
        array $declined
    ) {
        $this->id = $id;
        $this->name = $name;
        $this->logo = $logo;
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
        $this->jobDutiesBulletins = $jobDutiesBulletins;
        $this->createdAt = $createdAt;
        $this->updatedAt = $updatedAt;
        $this->deletedAt = $deletedAt;
        $this->applied = $applied;
        $this->comments = $comments;
        $this->averageScore = $averageScore;
        $this->approved = $approved;
        $this->declined = $declined;
    }

    public static function fromEntity(Job $job): self
    {
        $comments = array_map(static function (Comment $comment) {
            return [
                'user' => $comment->getUser()->getUsername(),
                'score' => $comment->getScore(),
                'message' => $comment->getMessage(),
                'createdAt' => $comment->getCreatedAt()->format('Y-m-d H:i:s'),
            ];
        }, $job->getComments()->getValues());

        return new self(
            (string) $job->getId(),
            $job->getUser()->getUsername(),
            "images/avatar/" . $job->getUser()->getAvatar(),
            $job->getJobDuties(),
            $job->getSkills(),
            $job->getVacancy(),
            $job->getPostDate()->format('Y-m-d'),
            $job->getActiveTill()->format('Y-m-d'),
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
            $job->getJobDutiesBulletins(),
            $job->getApplied(),
            $comments,
            $job->calculateAverageScore(),
            $job->getApplied(),
            $job->getDeclined()
        );
    }
}