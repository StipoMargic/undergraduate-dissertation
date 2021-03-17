<?php

declare(strict_types = 1);

namespace App\Application\Command\Web\User;

use App\Application\Command\CommandInterface;

class CreateUserCommand implements CommandInterface
{
    public string $id;
    public string $username;
    public string $email;
    public string $role;
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