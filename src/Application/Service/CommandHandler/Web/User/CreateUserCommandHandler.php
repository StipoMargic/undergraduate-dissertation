<?php

declare(strict_types = 1);

namespace App\Application\Service\CommandHandler\Web\User;


use App\Application\Command\Web\User\CreateUserCommand;
use App\Application\User\UserRepository\UserReadRepository;
use App\Application\User\UserRepository\UserWriteRepository;
use App\Domain\User\Exception\UserAlreadyExistException;
use App\Domain\User\User;
use App\Infrastructure\UI\HTTP\Web\v1\Model\User\UserWriteModel;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

final class CreateUserCommandHandler
{
    public UserWriteRepository $userWriteRepository;
    public UserReadRepository $userReadRepository;
    public UserPasswordEncoderInterface $encoder;

    public function __construct(
        UserWriteRepository $userWriteRepository,
        UserReadRepository $userReadRepository,
        UserPasswordEncoderInterface $encoder
    ) {
        $this->userWriteRepository = $userWriteRepository;
        $this->userReadRepository = $userReadRepository;
        $this->encoder = $encoder;
    }


    public function __invoke(CreateUserCommand $command)
    {
        if ($this->userReadRepository->getByEmail($command->email)){
            throw UserAlreadyExistException::withEmail($command->email);
        }

        $user = new User(
            Uuid::fromString($command->id),
            $command->username,
            $command->email,
            $command->password,
            $command->role,
            null,
            null,
            null
        );

        $user->setPassword($this->encodePassword($user, $command->password));

        $this->userWriteRepository->save($user);
    }

    private function encodePassword(User $user, string $password): string
    {
        return $this->encoder->encodePassword($user, $password);
    }
}