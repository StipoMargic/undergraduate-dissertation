<?php

declare(strict_types = 1);

namespace App\Application\Command\Web\User;


use App\Application\Command\CommandInterface;

class DeleteUserCommand implements CommandInterface
{
    public function __construct(
        public string $id
    ) {
    }
}