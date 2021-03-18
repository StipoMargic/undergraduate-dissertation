<?php

declare(strict_types = 1);

namespace App\Domain\User\Exception;


use JetBrains\PhpStorm\Pure;

class UserAlreadyExistException extends \Exception
{
    #[Pure] public static function withEmail(string $email): self
    {
        $message = sprintf("User with email %s already exist!", $email);

        return  new self($message, 400);
    }
}