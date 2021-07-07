<?php


namespace App\Infrastructure\UI\HTTP\Web\v1\Model\Comment;

use Undabot\SymfonyJsonApi\Model\ApiModel;
use Undabot\SymfonyJsonApi\Service\Resource\Validation\Constraint\ResourceType;
use Undabot\SymfonyJsonApi\Model\Resource\Annotation\Attribute;

/** @ResourceType(type="comment") */
class CommentWriteModel implements ApiModel
{
    public string $id;

    /** @Attribute  */
    public string $portfolio;

    /** @Attribute  */
    public string $job;

    /** @Attribute  */
    public string $user;

    /** @Attribute  */
    public int $score;

    /** @Attribute  */
    public string $message;

    public function __construct(string $id, string $portfolio, string $job, string $user, int $score, string $message)
    {
        $this->id = $id;
        $this->portfolio = $portfolio;
        $this->job = $job;
        $this->user = $user;
        $this->score = $score;
        $this->message = $message;
    }
}