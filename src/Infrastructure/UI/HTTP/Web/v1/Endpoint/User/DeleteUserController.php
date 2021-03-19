<?php /** @noinspection PhpDocSignatureInspection */

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\User;


use App\Application\Command\Web\User\DeleteUserCommand;
use App\Application\Service\Bus\CommandBus;
use Ramsey\Uuid\UuidInterface;
use Symfony\Component\Routing\Annotation\Route;
use Undabot\SymfonyJsonApi\Http\Model\Response\ResourceDeletedResponse;

final class DeleteUserController
{
    /** @Route("/api/users/{id}", name="api_v1_users_delete", methods={"DELETE"} */
    public function delete(
        UuidInterface $id,
        CommandBus $commandBus,
    ): ResourceDeletedResponse {
        $command = new DeleteUserCommand((string) $id);
        $commandBus->handleCommand($command);

        return new ResourceDeletedResponse();
    }
}