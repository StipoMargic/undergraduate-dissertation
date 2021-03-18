<?php

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\User;


use App\Application\Command\Web\User\DeleteUserCommand;
use App\Application\Service\Bus\CommandBus;
use Ramsey\Uuid\UuidInterface;
use Undabot\SymfonyJsonApi\Http\Model\Response\ResourceDeletedResponse;

final class DeleteUserController
{
    public function delete(
        UuidInterface $id,
        CommandBus $commandBus,
    ): ResourceDeletedResponse {
        $command = new DeleteUserCommand((string) $id);
        $commandBus->handleCommand($command);

        return new ResourceDeletedResponse();
    }
}