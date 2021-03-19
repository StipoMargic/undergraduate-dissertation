<?php

declare(strict_types = 1);

namespace App\Application\Service\CommandHandler\Web\User;


use App\Application\Command\Web\User\DeleteUserCommand;
use App\Application\User\UserRepository\UserReadRepository;
use App\Application\User\UserRepository\UserWriteRepository;
use Ramsey\Uuid\Uuid;

final class DeleteUserCommandHandler
{
    public function __construct(public UserReadRepository $userReadRepository, public UserWriteRepository $userWriteRepository)
    {
    }

    public function __invoke(DeleteUserCommand $command): void
    {
        $user = $this->userReadRepository->get(Uuid::fromString($command->id));

        $user->delete();

        $this->userWriteRepository->save($user);
    }
}
