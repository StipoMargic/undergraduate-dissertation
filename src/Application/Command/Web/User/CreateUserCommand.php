<?php

declare(strict_types = 1);

namespace App\Application\Command\Web\User;

use App\Application\Command\CommandInterface;

class CreateUserCommand implements CommandInterface
{
    public function __construct(
        public string $id,
        public string $username,
        public string $email,
        public string $role,
        public string $password,
        public ?string $avatar
    ) {
    }

}