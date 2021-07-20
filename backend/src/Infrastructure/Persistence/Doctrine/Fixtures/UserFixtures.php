<?php


namespace App\Infrastructure\Persistence\Doctrine\Fixtures;


use App\Application\User\UserRepository\UserWriteRepository;
use App\Domain\User\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Faker\Generator;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


class UserFixtures extends Fixture
{
    public const USERS_TO_CREATE = 590;

    private Generator $faker;

    public function __construct(
        public UserPasswordEncoderInterface $userPasswordEncoder,
        public UserWriteRepository $userWriteRepository,

    ) {
        $this->faker = Factory::create();
    }

    public function load(ObjectManager $manager): void
    {

        for ($i = 0; $i < self::USERS_TO_CREATE / 2; $i++) {
            $flag = $this->faker->boolean(75);
            $user = new User(
                Uuid::uuid4(),
                $this->faker->name(),
                $this->faker->email,
                'password',
                User::ROLE_USER,
                null,
                $this->faker->streetAddress,
                $this->faker->city,
                $this->faker->phoneNumber,
                $this->faker->jobTitle,
                'https://facebook.com',
                'https://twitter.com',
                'https://linkedin.com',
                $this->faker->text
            );

            $password = $this->userPasswordEncoder->encodePassword($user, $user->getPassword());

            $user = new User(
                $user->getId(),
                $user->getUsername(),
                $user->getEmail(),
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
                $user->getAbout(),
            );

            if ($flag) {
                $user->setVerified(true);
                $user->removeToken();
            }

            $this->setReference(User::class . "f" . $i, $user);

            $manager->persist($user);
        }

        for ($i = 0; $i < self::USERS_TO_CREATE / 2; $i++) {
            $flag = $this->faker->boolean(75);
            $user = new User(
                Uuid::uuid4(),
                $this->faker->name(),
                $this->faker->email,
                'password',
                User::ROLE_EMPLOYER,
                null,
                $this->faker->streetAddress,
                $this->faker->city,
                $this->faker->phoneNumber,
                $this->faker->jobTitle,
                'https://facebook.com',
                'https://twitter.com',
                'https://linkedin.com',
                $this->faker->text
            );

            $password = $this->userPasswordEncoder->encodePassword($user, $user->getPassword());

            $user = new User(
                $user->getId(),
                $user->getUsername(),
                $user->getEmail(),
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
                $user->getAbout(),
            );

            if ($flag) {
                $user->setVerified(true);
                $user->removeToken();
            }

            $this->setReference(User::class . "c" . $i, $user);

            $manager->persist($user);
        }

        $manager->flush();
    }

}