<?php
declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Model\Job;

use Undabot\SymfonyJsonApi\Model\ApiModel;
use Undabot\SymfonyJsonApi\Service\Resource\Validation\Constraint\ResourceType;

/** @ResourceType(type="job") */
class JobWriteModel implements ApiModel
{
    public string $id;

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

    public function __construct(
        string $id,
        string $jobDuties,
        string $skills,
        string $vacancy,
        string $postDate,
        string $activeTill,
        string $location,
        string $salary,
        string $hours,
        string $typeOfPosition,
        bool $disableFriendly
    ) {
        $this->id = $id;
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
    }
}