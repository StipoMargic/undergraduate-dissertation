<?php


namespace App\Application\User\UserRepository;


use App\Domain\User\User;
use Ramsey\Uuid\UuidInterface;

interface UserReadRepository
{
    public function get(UuidInterface $id): ?User;

    public function getByUsername(string $username): ?User;

    public function get0ByEmail(string $email): ?User;
}
