<?php
declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Model\Job;

use App\Domain\Job\Job;
use Undabot\SymfonyJsonApi\Model\ApiModel;
use Undabot\SymfonyJsonApi\Model\Resource\Annotation\Attribute;
use Undabot\SymfonyJsonApi\Service\Resource\Validation\Constraint\ResourceType;

/** @ResourceType(type="job") */
class JobUpdateModel implements ApiModel
{
    public string $id;

    /** @Attribute */
    public string $jobDuties;

    /** @Attribute */
    public string $skills;

    /** @Attribute */
    public int $vacancy;

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
    public bool $disabledFriendly;

    /** @Attribute */
    public string $jobSummary;

    /** @Attribute */
    public string $jobPositionName;

    /** @Attribute */
    public string $jobDutiesBulletins;

    public function __construct(
        string $id,
        string $jobDuties,
        string $skills,
        int $vacancy,
        string $activeTill,
        string $location,
        int $salary,
        int $hours,
        string $typeOfPosition,
        bool $disabledFriendly,
        string $jobSummary,
        string $jobPositionName,
        string $jobDutiesBulletins
    ) {
        $this->jobDutiesBulletins = $jobDutiesBulletins;
        $this->id = $id;
        $this->jobDuties = $jobDuties;
        $this->skills = $skills;
        $this->vacancy = $vacancy;
        $this->activeTill = $activeTill;
        $this->location = $location;
        $this->salary = $salary;
        $this->hours = $hours;
        $this->typeOfPosition = $typeOfPosition;
        $this->disabledFriendly = $disabledFriendly;
        $this->jobSummary = $jobSummary;
        $this->jobPositionName = $jobPositionName;
    }

    public static function fromEntity(Job $job): self
    {
        return new self(
            (string) $job->getId(),
            $job->getJobDuties(),
            $job->getSkills(),
            $job->getVacancy(),
            $job->getActiveTill()->format('Y-m-d'),
            $job->getLocation(),
            $job->getSalary(),
            $job->getHours(),
            $job->getTypeOfPosition(),
            $job->isDisableFriendly(),
            $job->getJobSummary(),
            $job->getJobPositionName(),
            $job->getJobDutiesBulletins(),
        );
    }
}