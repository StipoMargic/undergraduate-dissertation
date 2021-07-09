<?php


namespace App\Infrastructure\UI\HTTP\Web\v1\Model\Job;

use Undabot\SymfonyJsonApi\Model\ApiModel;
use Undabot\SymfonyJsonApi\Model\Resource\Annotation\Attribute;
use Undabot\SymfonyJsonApi\Service\Resource\Validation\Constraint\ResourceType;

/** @ResourceType(type="JobApplication") */
class JobApplicationModel implements ApiModel
{
    public string $id;

    /** @Attribute */
    public string $subject;

    /** @Attribute */
    public string $message;

    /** @Attribute */
    public string $jobId;

    /** @Attribute */
    public string $resume;

    /** @Attribute */
    public string $username;

    public function __construct(
        string $id,
        string $subject,
        string $message,
        string $jobId,
        string $resume,
        string $username
    ) {
        $this->id = $id;
        $this->subject = $subject;
        $this->username = $username;
        $this->message = $message;
        $this->jobId = $jobId;
        $this->resume = $resume;
    }

}