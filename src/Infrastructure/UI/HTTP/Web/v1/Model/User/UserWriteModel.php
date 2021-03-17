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

    public function __construct(string $id, string $username, string $email, string $role, string $password)
    {
        $this->id = $id;
        $this->username = $username;
        $this->email = $email;
        $this->role = $role;
        $this->password = $password;
    }
}