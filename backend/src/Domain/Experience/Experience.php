<?php


namespace App\Domain\Experience;


use App\Domain\Common\EntityInterface;
use App\Domain\Portfolio\Portfolio;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\UuidInterface;

/**
 * @ORM\Entity
 * @ORM\Table("Experience")
 */

class Experience implements EntityInterface
{
    /**
     * @ORM\Id
     * @ORM\Column(type="uuid", unique=true)
     */
    private UuidInterface $id;

    /** @ORM\Column(type="string", nullable=false, name="job_title") */
    private string $jobTitle;

    /** @ORM\ManyToOne(targetEntity="App\Domain\Portfolio\Portfolio", inversedBy="experiences", cascade="persist") */
    private Portfolio $portfolio;

    /** @ORM\Column(name="year_start", type="integer", nullable=false) */
    private int $yearStart;

    /** @ORM\Column(name="year_end", type="integer" , nullable=true) */
    private ?int $yearEnd;

    /** @ORM\Column(name="description", nullable=true) */
    private ?string $description;

    public function __construct(
        UuidInterface $id,
        string $jobTitle,
        int $yearStart,
        ?int $yearEnd,
        ?string $description,
        Portfolio $portfolio
    ) {
        $this->id = $id;
        $this->jobTitle = $jobTitle;
        $this->portfolio = $portfolio;
        $this->yearStart = $yearStart;
        $this->yearEnd = $yearEnd;
        $this->description = $description;
    }

    public function getId(): UuidInterface
    {
        return $this->id;
    }

    public function getJobTitle(): string
    {
        return $this->jobTitle;
    }

    public function setJobTitle(string $jobTitle): void
    {
        $this->jobTitle = $jobTitle;
    }

    public function getPortfolio(): Portfolio
    {
        return $this->portfolio;
    }

    public function setPortfolio(Portfolio $portfolio): void
    {
        $this->portfolio = $portfolio;
    }

    public function getYearStart(): int
    {
        return $this->yearStart;
    }

    public function setYearStart(int $yearStart): void
    {
        $this->yearStart = $yearStart;
    }

    public function getYearEnd(): ?int
    {
        return $this->yearEnd;
    }

    public function setYearEnd(?int $yearEnd): void
    {
        $this->yearEnd = $yearEnd;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }

    public function delete(): void
    {
        // TODO: Implement delete() method.
    }
}