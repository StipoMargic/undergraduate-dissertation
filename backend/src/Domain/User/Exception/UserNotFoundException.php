<?php

declare(strict_types = 1);

namespace App\Domain\User\Exception;


use App\Domain\Common\Exception\EntityNotFoundException;
use App\Domain\User\User;
use JetBrains\PhpStorm\Pure;

final class UserNotFoundException extends EntityNotFoundException
{

    public static function getClassName(): string
    {
        return User::class;
    }

    #[Pure] public static function withEmail(string $email): self
    {
        $message = sprintf("User with email %s not found!", $email);

        return new self($message, 404);
    }
}