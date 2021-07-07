<?php


namespace App\Domain\Comment;

use App\Domain\Job\Job;
use App\Domain\Portfolio\Portfolio;
use App\Domain\User\User;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\UuidInterface;

/**
 * @ORM\Entity
 * @ORM\Table(name="Comment")
 */
class Comment
{
    /**
     * @ORM\Id
     * @ORM\Column(type="uuid", unique=true)
     */
    private UuidInterface $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Domain\Portfolio\Portfolio", inversedBy="comments")
     */
    private ?Portfolio $portfolio;

    /**
     * @ORM\ManyToOne(targetEntity="App\Domain\Job\Job",inversedBy="comments")
     */
    private ?Job $job;

    /**
     * @ORM\Column(type="string", nullable=false)
     */
    private User $user;

    /**
     * @ORM\Column(type="integer", nullable=false)
     */
    private int $score;

    /**
     * @ORM\Column(type="string", nullable=false, length=1000)
     */
    private string $message;


    /** @ORM\Column(name="created_at", type="datetime_immutable", nullable=false) */
    private \DateTimeImmutable $createdAt;

    public function __construct(
        UuidInterface $id,
        ?Portfolio $portfolio,
        ?Job $job,
        User $user,
        int $score,
        string $message
    ) {
        $this->id = $id;
        $this->portfolio = $portfolio;
        $this->job = $job;
        $this->user = $user;
        $this->score = $score;
        $this->message = $message;
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getId(): UuidInterface
    {
        return $this->id;
    }

    public function getPortfolio(): ?Portfolio
    {
        return $this->portfolio;
    }

    public function setPortfolio(?Portfolio $portfolio): void
    {
        $this->portfolio = $portfolio;
    }

    public function getJob(): ?Job
    {
        return $this->job;
    }

    public function setJob(?Job $job): void
    {
        $this->job = $job;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function setUser(User $user): void
    {
        $this->user = $user;
    }

    public function getScore(): int
    {
        return $this->score;
    }

    public function setScore(int $score): void
    {
        $this->score = $score;
    }

    public function getMessage(): string
    {
        return $this->message;
    }

    public function setMessage(string $message): void
    {
        $this->message = $message;
    }
}