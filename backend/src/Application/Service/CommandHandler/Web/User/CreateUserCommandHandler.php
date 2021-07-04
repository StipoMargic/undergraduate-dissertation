<?php /** @noinspection PhpUnhandledExceptionInspection */

declare(strict_types = 1);

namespace App\Application\Service\CommandHandler\Web\User;


use App\Application\Command\Web\User\CreateUserCommand;
use App\Application\User\UserRepository\UserReadRepository;
use App\Application\User\UserRepository\UserWriteRepository;
use App\Domain\User\Exception\NotValidRoleException;
use App\Domain\User\Exception\UserAlreadyExistException;
use App\Domain\User\User;
use App\Infrastructure\Image\Upload\ImageUploader;
use Ramsey\Uuid\Uuid;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mime\Message;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

final class CreateUserCommandHandler
{
    public function __construct(
        public UserWriteRepository $userWriteRepository,
        public UserReadRepository $userReadRepository,
        public UserPasswordEncoderInterface $encoder,
        public MailerInterface $mailer,
        public ImageUploader $imageUploader
    ) {
    }


    public function __invoke(CreateUserCommand $command)
    {
        if ($this->userReadRepository->getByEmail($command->email)) {
            throw UserAlreadyExistException::withEmail($command->email);
        }
        if (!in_array($command->role, User::ALLOWED_API_ROLES)) {
            throw NotValidRoleException::withRole($command->role);
        }

        $user = new User(
            Uuid::fromString($command->id),
            $command->username,
            $command->email,
            $command->password,
            $command->role,
            null === $command->avatar ? null : $this->makeAvatar($command->avatar),
            $command->address,
            $command->city,
            $command->phone,
            $command->occupation,
            $command->facebook,
            $command->twitter,
            $command->linkedin,
            $command->about
        );

        $user->setPassword($this->encodePassword($user, $command->password));

        $this->userWriteRepository->save($user);

        $this->sendVerificationEmail($user);
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

    private function sendVerificationEmail(User $user): void
    {
        $email = (new TemplatedEmail())
            ->from("info@liberato.io")
            ->to(new Address($user->getEmail(), $user->getUsername()))
            ->subject('Thanks for signing up!')
            ->htmlTemplate('emails/signup.html.twig')
            ->context([
                'username' => $user->getUsername(),
                'token' => $user->getToken(),
            ]);

        $this->mailer->send($email);
    }
}