<?php


namespace App\Infrastructure\Service\EventHandler;


use App\Application\Event\CreateNewJobEvent;
use App\Domain\Job\Job;
use Doctrine\ORM\Event\LifecycleEventArgs;

class CreateNewJobEventHandler extends CreateNewJobEvent
{

    public function prePersist(LifecycleEventArgs $args): void
    {
        $entity = $args->getObject();

        if (!$entity instanceof Job) {
            return;
        }

        $entity->setUser($this->getCurrentUser());
    }

    public function getCurrentUser()
    {
        return $this->token->getToken()->getUser();
    }
}