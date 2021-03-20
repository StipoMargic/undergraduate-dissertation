<?php

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Model\User;

use App\Domain\Portfolio\Portfolio;
use App\Domain\User\User;
use Undabot\SymfonyJsonApi\Model\ApiModel;
use Undabot\SymfonyJsonApi\Model\Resource\Annotation\Attribute;
use Undabot\SymfonyJsonApi\Service\Resource\Validation\Constraint\ResourceType;

/**
 * @ResourceType(type="user")
 * @psalm-immutable
 */
class UserReadModel implements ApiModel
{
    public string $id;

    /** @Attribute  */
    public array $portfolios;

    /** @Attribute */
    public string $username;

    /** @Attribute */
    public string $email;

    /** @Attribute */
    public array $roles;

    /** @Attribute */
    public bool $verified;

    /** @Attribute */
    public ?string $token;

    /** @Attribute */
    public ?string $avatar;

    /** @Attribute */
    public ?string $address;

    /** @Attribute */
    public ?string $city;

    /** @Attribute */
    public string $createdAt;

    /** @Attribute */
    public ?string $updatedAt;

    /** @Attribute */
    public ?string $deletedAt;

    public function __construct(
        string $id,
        array $portfolios,
        string $username,
        string $email,
        array $roles,
        bool $verified,
        ?string $token,
        ?string $avatar,
        ?string $address,
        ?string $city,
        string $createdAt,
        ?string $updatedAt,
        ?string $deletedAt
    ) {
        $this->id = $id;
        $this->username = $username;
        $this->email = $email;
        $this->roles = $roles;
        $this->verified = $verified;
        $this->token = $token;
        $this->avatar = $avatar;
        $this->address = $address;
        $this->city = $city;
        $this->createdAt = $createdAt;
        $this->updatedAt = $updatedAt;
        $this->deletedAt = $deletedAt;
        $this->portfolios = $portfolios;
    }

    public static function fromEntity(User $user): self
    {
        $portfolios = array_map(static function(Portfolio $portfolio){
            return $portfolio->getId();
        }, $user->getPortfolios()->getValues());

        return new self(
            (string) $user->getId(),
            $portfolios,
            $user->getUsername(),
            $user->getEmail(),
            $user->getRoles(),
            $user->isVerified(),
            null === $user->getToken() ? null : $user->getToken(),
            null === $user->getAvatar() ? null : '/images/avatar/' . $user->getAvatar(),
            null === $user->getAddress() ? null : $user->getAddress(),
            null === $user->getCity() ? null : $user->getCity(),
            $user->getCreatedAt()->format('Y-m-d H:i:s'),
            null === $user->getUpdatedAt() ? null : $user->getUpdatedAt()->format('Y-m-d H:i:s'),
            null === $user->getDeletedAt() ? null : $user->getDeletedAt()->format('Y-m-d H:i:s')
        );
    }

}