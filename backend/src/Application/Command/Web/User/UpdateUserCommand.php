<?php

declare(strict_types = 1);

namespace App\Application\Command\Web\User;


use App\Application\Command\CommandInterface;

class UpdateUserCommand implements CommandInterface
{
    public function __construct(
        public string $id,
        public ?string $username,
        public ?string $email,
        public ?string $password,
        public ?string $avatar,
        public ?string $phone,
        public ?string $address,
        public ?string $city,
        public string $about,
        public ?string $occupation,
        public ?string $facebook,
        public ?string $twitter,
        public ?string $linkedin
    ) {
    }
}