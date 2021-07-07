<?php


namespace App\Infrastructure\UI\HTTP\Web\v1\Model\Portfolio;

use Undabot\SymfonyJsonApi\Model\Resource\Annotation\Attribute;
use Undabot\SymfonyJsonApi\Model\ApiModel;
use Undabot\SymfonyJsonApi\Service\Resource\Validation\Constraint\ResourceType;

/** @ResourceType(type="FreelancerHire") */
class HireFreelancerModel implements ApiModel
{
    public string $id;

    /** @Attribute */
    public string $subject;

    /** @Attribute */
    public string $message;

    /** @Attribute */
    public string $portfolioId;

    /** @Attribute */
    public string $companyName;

    public function __construct(string $id, string $subject, string $message, string $portfolioId, string $companyName)
    {
        $this->id = $id;
        $this->subject = $subject;
        $this->message = $message;
        $this->portfolioId = $portfolioId;
        $this->companyName = $companyName;
    }
}