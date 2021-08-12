<?php /** @noinspection PhpUnhandledExceptionInspection */

declare(strict_types = 1);

namespace App\Application\Service\CommandHandler\Web\User;


use App\Application\Command\Web\User\UpdateUserCommand;
use App\Application\User\UserRepository\UserReadRepository;
use App\Application\User\UserRepository\UserWriteRepository;
use App\Domain\User\Exception\UserNotFoundException;
use App\Domain\User\User;
use App\Infrastructure\Image\Upload\ImageUploader;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UpdateUserCommandHandler
{
    public function __construct(
        public UserReadRepository $userReadRepository,
        public UserPasswordEncoderInterface $encoder,
        public ImageUploader $imageUploader,
        public UserWriteRepository $userWriteRepository
    ) {
    }

    public function __invoke(UpdateUserCommand $command): void
    {
        $user = $this->userReadRepository->get(Uuid::fromString($command->id));

        if (!$user) {
            throw UserNotFoundException::withEmail($command->email);
        }

        $user->update(
            null === $command->username ? $user->getUsername() : $command->username,
            null === $command->email ? $user->getEmail() : $command->email,
            null === $command->avatar ? $user->getAvatar() : $this->makeAvatar($command->avatar),
            $command->phone,
            $command->address,
            $command->city,
            $command->about,
            $command->occupation,
            $command->facebook,
            $command->twitter,
            $command->linkedin
        );
        if ($command->password !== null){
            $user->setPassword($this->encodePassword($user, $command->password));
        }
        
        $this->userWriteRepository->save($user);
    }

    private function encodePassword(User $user, string $password): string
    {
        return $this->encoder->encodePassword($user, $password);
    }

    private function makeAvatar(string $avatar): string
    {
        $image = $this->imageUploader->convert($avatar);

        return $this->imageUploader->upload($image, 'avatar');
    }
}