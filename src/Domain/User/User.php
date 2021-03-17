<?php

declare(strict_types = 1);

namespace App\Domain\User;


use App\Application\User\VerificationToken;
use App\Domain\Common\EntityInterface;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\UuidInterface;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Entity
 * @ORM\Table(name="user")
 */
class User implements UserInterface
{
    public const ROLE_ADMIN = "ROLE_ADMIN";
    public const ROLE_USER = "ROLE_USER";
    public const ROLE_EMPLOYER = "ROLE_EMPLOYER";

    /**
     * @ORM\Id
     * @ORM\Column(type="uuid", unique=true)
     */
    private UuidInterface $id;

    /**
     * @ORM\Column(name="username", type="string", unique=true)
     */
    private string $username;

    /**
     * @ORM\Column(name="email", type="string", unique=true)
     */
    private string $email;

    /**
     * @ORM\Column(name="password", type="string", nullable=false)
     */
    private string $password;

    /**
     * @ORM\Column(name="roles", type="simple_array", nullable=false)
     */
    private array $roles;

    /**
     * @ORM\Column(name="verified", type="boolean", nullable=false)
     */
    private bool $verified;

    /**
     * @ORM\Column(name="token", type="string", nullable=true)
     */
    private ?string $token;

    /**
     * @ORM\Column(name="avatar", type="string", nullable=true)
     */
    private ?string $avatar;

    /**
     * @ORM\Column(name="address", type="string", nullable=true)
     */
    private ?string $address;

    /**
     * @ORM\Column(name="city", type="string", nullable=true)
     */
    private ?string $city;

    /**
     * @ORM\Column(name="created_at", type="datetime_immutable", nullable=false)
     */
    private \DateTimeImmutable $createdAt;

    /**
     * @ORM\Column(name="updated_at", type="datetime_immutable", nullable=true)
     */
    private ?\DateTimeImmutable $updatedAt;

    /**
     * @ORM\Column(name="deleted_at", type="datetime_immutable", nullable=true)
     */
    private ?\DateTimeImmutable $deletedAt;

    public function __construct(
        UuidInterface $id,
        string $username,
        string $email,
        string $password,
        string $role,
        ?string $avatar,
        ?string $address,
        ?string $city,
    ) {
        $this->id = $id;
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
        $this->roles = [$role];
        $this->verified = false;
        $this->token = VerificationToken::getRandomToken();
        $this->avatar = $avatar;
        $this->address = $address;
        $this->city = $city;
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = null;
        $this->deletedAt = null;
    }


    public function getId(): UuidInterface
    {
        return $this->id;
    }

    public function getUsername(): string
    {
        return $this->username;
    }

    public function setUsername(string $username): void
    {
        $this->username = $username;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): void
    {
        $this->password = $password;
    }

    public function getRoles(): array
    {
        return $this->roles;
    }

    public function setRoles(string $role): void
    {
        if (!in_array($role, $this->roles)) {
            $this->roles = [$role];
        }
    }


    public function isVerified(): bool
    {
        return $this->verified;
    }

    public function setVerified(bool $verified): void
    {
        $this->verified = $verified;
    }

    /**
     * @return string|null
     */
    public function getToken(): ?string
    {
        return $this->token;
    }

    public function getAvatar(): ?string
    {
        return $this->avatar;
    }

    public function setAvatar(?string $avatar): void
    {
        $this->avatar = $avatar;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(?string $address): void
    {
        $this->address = $address;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): void
    {
        $this->city = $city;
    }

    public function getCreatedAt(): \DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updatedAt): void
    {
        $this->updatedAt = $updatedAt;
    }

    public function getDeletedAt(): ?\DateTimeImmutable
    {
        return $this->deletedAt;
    }

    public function setDeletedAt(?\DateTimeImmutable $deletedAt): void
    {
        $this->deletedAt = $deletedAt;
    }

    public function getSalt(): ?string
    {
        return null;
    }

    public function eraseCredentials(): void
    {
    }

}