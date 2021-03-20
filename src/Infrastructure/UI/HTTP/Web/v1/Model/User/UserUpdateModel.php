<?php

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Model\User;

use App\Domain\User\User;
use JetBrains\PhpStorm\Pure;
use Undabot\SymfonyJsonApi\Model\ApiModel;
use Undabot\SymfonyJsonApi\Model\Resource\Annotation\Attribute;
use Undabot\SymfonyJsonApi\Service\Resource\Validation\Constraint\ResourceType;

/**
 * @ResourceType(type="user")
 * @psalm-immutable
 */
class UserUpdateModel implements ApiModel
{
    public string $id;

    /** @Attribute */
    public ?string $username;

    /** @Attribute */
    public ?string $email;

    /** @Attribute */
    public ?string $password;

    /** @Attribute */
    public ?string $role;

    /** @Attribute */
    public ?string $avatar;

    /** @Attribute */
    public ?string $address;

    /** @Attribute */
    public ?string $city;

    public function __construct(
        string $id,
        ?string $username,
        ?string $email,
        ?string $password,
        ?string $role,
        ?string $avatar,
        ?string $address,
        ?string $city,
    ) {
        $this->id = $id;
        $this->username = $username;
        $this->email = $email;
        $this->role = $role;
        $this->avatar = $avatar;
        $this->address = $address;
        $this->city = $city;
        $this->password = $password;
    }

    #[Pure] public static function fromEntity(User $user): self
    {
        return new self(
            (string) $user->getId(),
            $user->getUsername(),
            $user->getEmail(),
            $user->getPassword(),
            $user->getRoles()[0],
            $user->getAvatar(),
            $user->getAddress(),
            $user->getCity()
        );
    }
}