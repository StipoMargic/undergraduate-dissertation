<?php /** @noinspection PhpDocSignatureInspection */

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\User;


use App\Application\Command\Web\User\UpdateUserCommand;
use App\Application\Service\Bus\CommandBus;
use App\Application\User\UserRepository\UserReadRepository;
use App\Infrastructure\UI\HTTP\Web\v1\ApiResponder\ResourceResponder;
use App\Infrastructure\UI\HTTP\Web\v1\Model\User\UserUpdateModel;
use Ramsey\Uuid\Uuid;
use Ramsey\Uuid\UuidInterface;
use Symfony\Component\Routing\Annotation\Route;
use Undabot\JsonApi\Definition\Model\Request\UpdateResourceRequestInterface;
use Undabot\SymfonyJsonApi\Http\Model\Response\ResourceUpdatedResponse;
use Undabot\SymfonyJsonApi\Http\Service\SimpleResourceHandler;
use Undabot\SymfonyJsonApi\Model\Resource\CombinedResource;
use Undabot\SymfonyJsonApi\Service\Resource\Factory\ResourceFactory;

final class UpdateUserController
{
    /** @Route("/api/users/{id}", name="api_v1_users_update", methods={"PUT"} */
    public function update(
        UuidInterface $id,
        UpdateResourceRequestInterface $request,
        UserReadRepository $repository,
        CommandBus $commandBus,
        SimpleResourceHandler $resourceHandler,
        ResourceFactory $resourceFactory,
        ResourceResponder $responder
    ): ResourceUpdatedResponse {
        $baseModel = UserUpdateModel::fromEntity($repository->get($id));
        $baseResource = $resourceFactory->make($baseModel);

        $updateResource = new CombinedResource($baseResource, $request->getResource());
        $updateModel = $resourceHandler->getModelFromResource($updateResource, UserUpdateModel::class);

        $command = new UpdateUserCommand(
            $updateModel->id,
            $updateModel->username,
            $updateModel->email,
            $updateModel->password,
            $updateModel->role,
            $updateModel->avatar,
            $updateModel->address,
            $updateModel->city
        );

        $commandBus->handleCommand($command);

        $updatedUser = $repository->get(Uuid::fromString($command->id));

        return $responder->resourceUpdated($updatedUser);
    }
}