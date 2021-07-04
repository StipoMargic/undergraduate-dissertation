<?php


namespace App\Application\Command\Web\User;


use App\Application\Command\CommandInterface;

class VerifyUserCommand implements CommandInterface
{
    public function __construct(
        public string $id,
        public string $token
    ) {
    }
}