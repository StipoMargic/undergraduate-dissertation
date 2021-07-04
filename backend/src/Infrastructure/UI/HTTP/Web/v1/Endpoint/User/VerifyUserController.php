<?php
declare(strict_types=1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\User;


use App\Application\Command\Web\User\VerifyUserCommand;
use App\Application\Service\Bus\CommandBus;
use App\Application\User\UserRepository\UserReadRepository;
use App\Domain\User\Exception\UserNotFoundException;
use App\Infrastructure\UI\HTTP\Web\v1\ApiResponder\ResourceResponder;
use Symfony\Component\Routing\Annotation\Route;
use Undabot\SymfonyJsonApi\Http\Model\Response\ResourceUpdatedResponse;

class VerifyUserController
{
    #[Route('/v1/verify/{token}', name: 'api_v1_verify', methods: ['POST'])]
    public function verify(
        string $token,
        CommandBus $commandBus,
        UserReadRepository $repository,
        ResourceResponder $responder
    ): ResourceUpdatedResponse {
        $user = $repository->getByToken($token);
        if (!$user){
            throw UserNotFoundException::verificationTokenError();
        }

        $command = new VerifyUserCommand((string) $user->getId(), $token);

        $commandBus->handleCommand($command);

        $verifiedUser = $repository->get($user->getId());

        return $responder->resourceUpdated($verifiedUser);
    }
}