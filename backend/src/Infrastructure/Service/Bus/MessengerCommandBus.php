<?php

declare(strict_types=1);

namespace App\Infrastructure\Service\Bus;

use App\Application\Command\CommandInterface;
use App\Application\Service\Bus\CommandBus;
use Symfony\Component\Messenger\Exception\HandlerFailedException;
use Symfony\Component\Messenger\HandleTrait;
use Symfony\Component\Messenger\MessageBusInterface;

class MessengerCommandBus implements CommandBus
{
    use HandleTrait;

    public function __construct(MessageBusInterface $commandBus)
    {
        $this->messageBus = $commandBus;
    }

    /**
     * @throws \Throwable
     */
    public function handleCommand(CommandInterface $command): void
    {
        try {
            $this->handle($command);
        } catch (HandlerFailedException $ex) {
            throw $ex->getNestedExceptions()[0];
        }
    }
}
