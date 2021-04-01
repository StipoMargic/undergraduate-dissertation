<?php

declare(strict_types = 1);

namespace App\Domain\User\Exception;


use App\Domain\User\User;

class NotValidRoleException extends \Exception
{
    public static function withRole(string $role): self
    {
        $message = sprintf("%s is not allowed! Choose %s or %s please.", $role, User::ALLOWED_API_ROLES[0],
            User::ALLOWED_API_ROLES[1]);

        return new self($message, 400);
    }
}