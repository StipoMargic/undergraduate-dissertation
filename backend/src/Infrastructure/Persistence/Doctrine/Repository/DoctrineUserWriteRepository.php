<?php

declare(strict_types = 1);

namespace App\Infrastructure\Persistence\Doctrine\Repository;


use App\Application\User\UserRepository\UserWriteRepository;
use App\Domain\User\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class DoctrineUserWriteRepository extends ServiceEntityRepository implements UserWriteRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function save(User $user): void
    {
        $this->_em->persist($user);
        $this->_em->flush();
    }
}