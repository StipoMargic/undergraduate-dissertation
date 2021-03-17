<?php

declare(strict_types = 1);

namespace App\Domain\User\Exception;


use JetBrains\PhpStorm\Pure;

class UserAlreadyExistException extends \Exception
{
    #[Pure] public static function withEmail(string $email): self
    {
        $message = sprintf("User with %s already exist!");

        return  new self($message, 400);
    }
}