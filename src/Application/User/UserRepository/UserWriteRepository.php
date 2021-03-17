<?php


namespace App\Application\User\UserRepository;


use App\Domain\User\User;

interface UserWriteRepository
{
    public function save(User $user): void;
}