<?php


namespace App\Application\Service\CommandHandler\Web\User;


use App\Application\Command\Web\User\VerifyUserCommand;
use App\Application\User\UserRepository\UserReadRepository;
use App\Application\User\UserRepository\UserWriteRepository;
use Ramsey\Uuid\Uuid;

class VerifyUserCommandHandler
{
    public function __construct(
        public UserWriteRepository $userWriteRepository,
        public UserReadRepository $userReadRepository,
    ) {
    }

    public function __invoke(VerifyUserCommand $command): void
    {
        $user = $this->userReadRepository->get(Uuid::fromString($command->id));

        $user->setVerified(true);
        $user->removeToken();

        $this->userWriteRepository->save($user);
    }
}