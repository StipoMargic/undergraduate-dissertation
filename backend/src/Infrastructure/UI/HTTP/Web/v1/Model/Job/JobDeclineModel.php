<?php


namespace App\Infrastructure\UI\HTTP\Web\v1\Model\Job;

use Undabot\SymfonyJsonApi\Model\ApiModel;
use Undabot\SymfonyJsonApi\Model\Resource\Annotation\Attribute;
use Undabot\SymfonyJsonApi\Service\Resource\Validation\Constraint\ResourceType;

/** @ResourceType(type="JobApplication") */
class JobDeclineModel
    implements ApiModel
{
    public string $id;

    /** @Attribute */
    public string $jobId;

    /** @Attribute */
    public string $applicantName;

    public function __construct(string $id, string $jobId, string $applicantName)
    {
        $this->id = $id;
        $this->jobId = $jobId;
        $this->applicantName = $applicantName;
    }
}