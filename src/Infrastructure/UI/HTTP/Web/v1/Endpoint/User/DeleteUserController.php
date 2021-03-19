<?php /** @noinspection PhpDocSignatureInspection */

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\User;


use App\Application\Command\Web\User\DeleteUserCommand;
use App\Application\Service\Bus\CommandBus;
use App\Domain\User\User;
use Ramsey\Uuid\UuidInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\Routing\Annotation\Route;
use Undabot\SymfonyJsonApi\Http\Model\Response\ResourceDeletedResponse;

final class DeleteUserController
{
    /** @Route("/api/v1/users/{id}", name="api_v1_users_delete", methods={"DELETE"})
     * @IsGranted("DELETE", subject="user", message="You are not logged in as this user!")
     */
    public function delete(
        UuidInterface $id,
        CommandBus $commandBus,
        User $user
    ): ResourceDeletedResponse {
        $command = new DeleteUserCommand((string) $id);
        $commandBus->handleCommand($command);

        return new ResourceDeletedResponse();
    }
}