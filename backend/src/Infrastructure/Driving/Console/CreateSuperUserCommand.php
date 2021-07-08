<?php
declare(strict_types = 1);

namespace App\Infrastructure\Driving\Console;

use App\Application\User\UserRepository\UserReadRepository;
use App\Application\User\UserRepository\UserWriteRepository;
use App\Domain\User\User;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


class CreateSuperUserCommand extends Command
{
    protected static $defaultName = 'app:create-superUser';

    public function __construct(
        public UserReadRepository $userReadRepository,
        public UserWriteRepository $userWriteRepository,
        public UserPasswordEncoderInterface $userPasswordEncoder
    ) {
        parent::__construct();
    }

    protected function configure()
    {
        $this->setDescription("Make user with ROLE_ADMIN")
            ->addArgument('name', InputArgument::REQUIRED, 'Input user name')
            ->addArgument('email', InputArgument::REQUIRED, "Input user email")
            ->addArgument('password', InputArgument::REQUIRED, "Input user password");
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $name = $input->getArgument("name");
        $email = $input->getArgument("email");
        $password = $input->getArgument("password");

        $isValid = !$this->validateInput($io, $name, $email, $password);

        if ($isValid) {
            $userExist = $this->userReadRepository->getByEmail($email);
            if (!$userExist) {
                $userCreated = $this->createUser($name, $email, $password);
                $io->success("User created!");

                return Command::SUCCESS;
            }
            $io->error("User already exist!");
        }

        return Command::FAILURE;
    }

    private function validateInput(SymfonyStyle $io, string $name, string $email, string $password): int
    {
        if (strlen($name) < 4 || strlen($name) > 10) {
            $io->error("Name should be between 4 and 10 char, ${name} provided!");

            return Command::FAILURE;
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $io->error("${email} is not valid email!");

            return Command::FAILURE;
        }

        if (strlen($password) < 1 || strlen($password) > 20) {
            $io->error("Password length should be between 8 and 20");

            return Command::FAILURE;
        }

        return Command::SUCCESS;
    }

    private function createUser(string $name, string $email, string $password): User
    {
        $user = new User(
            Uuid::uuid4(),
            $name,
            $email,
            $password,
            "ROLE_ADMIN",
            null,
            null, null, null, null, null, null, null, "About1"
        );

        $password = $this->userPasswordEncoder->encodePassword($user, $user->getPassword());

        $user = new User(
            $user->getId(),
            $name,
            $email,
            $password,
            $user->getRoles()[0],
            $user->getAvatar(),
            $user->getAddress(),
            $user->getCity(),
            $user->getPhone(),
            $user->getOccupation(),
            $user->getFacebook(),
            $user->getTwitter(),
            $user->getLinkedin(),
            $user->getAbout()
        );

        $user->setVerified(true);
        $user->removeToken();

        $this->userWriteRepository->save($user);

        return $user;
    }
}