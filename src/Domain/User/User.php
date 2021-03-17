<?php

declare(strict_types = 1);

namespace App\Domain\User;


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
    /**
     * @ORM\Id
     * @ORM\Column(type="uuid", unique=true)
     */
    private UuidInterface $id;

    /**
     * @ORM\Column(name="username", type="string")
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

    public function __construct(UuidInterface $id, string $username, string $email, string $password)
    {
        $this->id = $id;
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
    }

    public function getId(): UuidInterface
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getUsername(): string
    {
        return $this->username;
    }

    /**
     * @param string $username
     */
    public function setUsername(string $username): void
    {
        $this->username = $username;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * @param string $email
     */
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
        return ["ROLE_USER"];
    }


    public function getSalt(): ?string
    {
        return null;
    }

    public function eraseCredentials(): void
    {
    }
}