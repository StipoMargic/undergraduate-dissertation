<?php /** @noinspection PhpDocSignatureInspection */

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\User;


use App\Application\Command\Web\User\CreateUserCommand;
use App\Application\Service\Bus\CommandBus;
use App\Application\User\UserRepository\UserReadRepository;
use App\Infrastructure\UI\HTTP\Web\v1\ApiResponder\ResourceResponder;
use App\Infrastructure\UI\HTTP\Web\v1\Model\User\UserWriteModel;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\Routing\Annotation\Route;
use Undabot\JsonApi\Definition\Model\Request\CreateResourceRequestInterface;
use Undabot\SymfonyJsonApi\Http\Model\Response\ResourceCreatedResponse;
use Undabot\SymfonyJsonApi\Http\Service\SimpleResourceHandler;

final class UserRegistrationController
{
    /** @Route("/api/register", name="api_v1_register", methods={"POST"}) */
    public function create(
        CreateResourceRequestInterface $request,
        SimpleResourceHandler $resourceHandler,
        CommandBus $commandBus,
        UserReadRepository $repository,
        ResourceResponder $responder
    ): ResourceCreatedResponse
    {
        $createModel = $resourceHandler->getModelFromRequest($request, UserWriteModel::class);

        $command = new CreateUserCommand($createModel->id, $createModel->username, $createModel->email, $createModel->role, $createModel->password, $createModel->avatar);

        $commandBus->handleCommand($command);

        $user = $repository->getByEmail($command->email);

        return $responder->resourceCreated($user);
    }
}