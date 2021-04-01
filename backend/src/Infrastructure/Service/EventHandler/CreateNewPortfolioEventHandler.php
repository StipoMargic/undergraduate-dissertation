<?php

declare(strict_types = 1);

namespace App\Infrastructure\Service\EventHandler;


use App\Application\Event\CreateNewPortfolioEvent;
use App\Domain\Portfolio\Portfolio;
use Doctrine\ORM\Event\LifecycleEventArgs;

class CreateNewPortfolioEventHandler extends CreateNewPortfolioEvent
{
    public function prePersist(LifecycleEventArgs $args): void
    {
        $entity = $args->getObject();

        if (!$entity instanceof Portfolio) {
            return;
        }

        $entity->setUser($this->getCurrentUser());
    }

    public function getCurrentUser()
    {
        return $this->token->getToken()->getUser();
    }
}