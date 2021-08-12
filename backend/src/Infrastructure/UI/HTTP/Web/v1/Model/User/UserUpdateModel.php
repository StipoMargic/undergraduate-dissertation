<?php

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Model\User;

use App\Domain\User\User;
use JetBrains\PhpStorm\Pure;
use Symfony\Component\Validator\Constraints as Assert;
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
    public ?string $avatar;

    /** @Attribute */
    public ?string $address;

    /** @Attribute */
    public ?string $city;

    /** @Attribute */
    public ?string $phone;

    /** @Attribute */
    public ?string $occupation;

    /** @Attribute */
    public ?string $facebook;

    /** @Attribute */
    public ?string $twitter;

    /** @Attribute */
    public ?string $linkedin;

    /** @Attribute */
    public string $about;

    public function __construct(
        string $id,
        ?string $username,
        string $email,
        ?string $password,
        ?string $avatar,
        ?string $address,
        ?string $city,
        ?string $phone,
        ?string $occupation,
        ?string $facebook,
        ?string $twitter,
        ?string $linkedin,
        string $about
    ) {
        $this->id = $id;
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
        $this->avatar = $avatar;
        $this->address = $address;
        $this->city = $city;
        $this->phone = $phone;
        $this->occupation = $occupation;
        $this->facebook = $facebook;
        $this->twitter = $twitter;
        $this->linkedin = $linkedin;
        $this->about = $about;
    }


    #[Pure] public static function fromEntity(User $user): self
    {
        return new self(
            (string) $user->getId(),
            $user->getUsername(),
            $user->getEmail(),
            $user->getPassword(),
            $user->getAvatar(),
            null === $user->getAddress() ? null : $user->getAddress(),
            $user->getCity(),
            $user->getPhone(),
            $user->getOccupation(),
            $user->getFacebook(),
            $user->getTwitter(),
            $user->getLinkedin(),
            $user->getAbout()
        );
    }
}