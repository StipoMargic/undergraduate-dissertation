<?php

declare(strict_types = 1);

namespace App\Infrastructure\Persistence\Doctrine\Repository;


use App\Application\User\UserRepository\UserReadRepository;
use App\Domain\User\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use PHPUnit\Runner\Exception;
use Ramsey\Uuid\UuidInterface;


class DoctrineUserReadRepository extends ServiceEntityRepository implements UserReadRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function get(UuidInterface $id): ?User
    {
        try {
            /** @var User|null $entity */
            $entity = $this->find((string) $id);
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }

        return $entity;
    }

    public function getByUsername(string $username): ?User
    {
        try {
            /** @var User|null $entity */
            $entity = $this->_em->getRepository(User::class)->findOneBy(['username' => $username]);
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }

        return $entity;
    }

    public function get0ByEmail(string $email): ?User
    {
        try {
            /** @var User|null $entity */
            $entity = $this->_em->getRepository(User::class)->findOneBy(['email' => $email]);
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }

        return $entity;
    }
}