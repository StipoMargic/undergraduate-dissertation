<?php


namespace App\Infrastructure\UI\HTTP\Web\v1\Model\Comment;

use App\Domain\Comment\Comment;
use Undabot\SymfonyJsonApi\Model\ApiModel;
use Undabot\SymfonyJsonApi\Model\Resource\Annotation\Attribute;
use Undabot\SymfonyJsonApi\Service\Resource\Validation\Constraint\ResourceType;

/** @ResourceType(type="comment") */
class CommentReadModel implements ApiModel
{
    public string $id;

    /** @Attribute */
    public ?string $portfolio;

    /** @Attribute */
    public ?string $job;

    /** @Attribute */
    public string $user;

    /** @Attribute */
    public int $score;

    /** @Attribute */
    public string $message;

    /** @Attribute */
    public string $createdAt;

    public function __construct(
        string $id,
        ?string $portfolio,
        ?string $job,
        string $user,
        int $score,
        string $message,
        string $createdAt
    ) {
        $this->id = $id;
        $this->portfolio = $portfolio;
        $this->job = $job;
        $this->user = $user;
        $this->score = $score;
        $this->message = $message;
        $this->createdAt = $createdAt;
    }

    public static function fromEntity(Comment $comment): self
    {
        return new self(
            (string) $comment->getId(),
            null === $comment->getPortfolio() ? null : (string) $comment->getPortfolio()->getId(),
            null === $comment->getJob() ? null : (string) $comment->getJob()->getId(),
            $comment->getUser()->getUsername(),
            $comment->getScore(),
            $comment->getMessage(),
            $comment->getCreatedAt()->format('Y-m-d H:i:s')
        );
    }
}