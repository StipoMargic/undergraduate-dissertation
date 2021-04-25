<?php

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Model\User;


use Undabot\SymfonyJsonApi\Model\ApiModel;
use Undabot\SymfonyJsonApi\Model\Resource\Annotation\Attribute;
use Undabot\SymfonyJsonApi\Service\Resource\Validation\Constraint\ResourceType;

/**
 * @ResourceType(type="user")
 */
class UserWriteModel implements ApiModel
{
    public string $id;

    /** @Attribute */
    public string $username;

    /** @Attribute */
    public string $email;

    /** @Attribute */
    public string $role;

    /** @Attribute */
    public string $password;

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

    public function __construct(
        string $id,
        string $username,
        string $email,
        string $role,
        string $password,
        ?string $avatar,
        ?string $address,
        ?string $city,
        ?string $phone,
        ?string $occupation,
        ?string $facebook,
        ?string $twitter,
        ?string $linkedin
    ) {
        $this->id = $id;
        $this->username = $username;
        $this->email = $email;
        $this->role = $role;
        $this->password = $password;
        $this->avatar = $avatar;
        $this->address = $address;
        $this->city = $city;
        $this->phone = $phone;
        $this->occupation = $occupation;
        $this->facebook = $facebook;
        $this->twitter = $twitter;
        $this->linkedin = $linkedin;
    }
}