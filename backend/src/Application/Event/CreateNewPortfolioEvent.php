<?php


namespace App\Application\Event;


use Doctrine\ORM\Event\LifecycleEventArgs;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

abstract class CreateNewPortfolioEvent
{
    public function __construct(public TokenStorageInterface $token)
    {
    }

    abstract public function prePersist(LifecycleEventArgs $args): void;

    abstract public function getCurrentUser();
}