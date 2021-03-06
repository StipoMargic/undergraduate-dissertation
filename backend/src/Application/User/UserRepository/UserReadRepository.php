<?php


namespace App\Application\User\UserRepository;


use App\Domain\User\User;
use Ramsey\Uuid\UuidInterface;

interface UserReadRepository
{
    public function get(UuidInterface $id): ?User;

    public function getByUsername(string $username): ?User;

    public function getByEmail(string $email): ?User;

    public function getByToken(string $token): ?User;
}
