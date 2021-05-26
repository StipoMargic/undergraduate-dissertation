<?php
declare(strict_types = 1);

namespace App\Application\Event;


use Doctrine\ORM\Event\LifecycleEventArgs;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

abstract class CreateNewJobEvent
{
    public function __construct(public TokenStorageInterface $token)
    {
    }

    abstract public function prePersist(LifecycleEventArgs $args): void;

    abstract public function getCurrentUser();
}