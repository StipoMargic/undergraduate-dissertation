<?php


namespace App\Infrastructure\Persistence\Doctrine\Fixtures;


use App\Domain\Job\Job;
use App\Domain\User\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Faker\Generator;
use Ramsey\Uuid\Uuid;

class JobFixtures extends Fixture implements DependentFixtureInterface
{
    public const JOBS_TO_CREATE = 1320;
    public Generator $faker;

    public function __construct()
    {
        $this->faker = Factory::create();
    }

    /**
     * @throws \Exception
     */
    public function load(ObjectManager $manager): void
    {
        $positionNames = ["Full time", "Part time", "Remote"];

        for ($i = 0; $i < self::JOBS_TO_CREATE; $i++) {
            $randomDay = time() + (random_int(1,14,) * 24 * 60 * 60);
            $date = date ('Y-m-d H:i:s', $randomDay);
            $activeTill = new \DateTime($date);


            $job = new Job(Uuid::uuid4(),
                $this->faker->text(200),
                $this->faker->text(5) . ", " . $this->faker->text(5) . ", " . $this->faker->text(5) . ", "
                . $this->faker->text(5) . ", " . $this->faker->text(5),
                random_int(3, 10),
                $activeTill,
                $this->faker->city,
                $this->faker->numberBetween(20000, 50000),
                $this->faker->numberBetween(180, 249),
                $positionNames[random_int(0, count($positionNames) - 1)],
                $this->faker->boolean,
                $this->faker->text(200),
                $this->faker->jobTitle,
                $this->faker->text(45) . ", " . $this->faker->text(45) . ", " . $this->faker->text(45) . ", "
                . $this->faker->text(45) . ", " . $this->faker->text(45)
            );

            /** @var User  $user */
            $user = $this->getReference(User::class . "c" . random_int(0, UserFixtures::USERS_TO_CREATE / 2 - 1));
            $job->setUser($user);
            if (false === $user->isVerified()){
                $user->setVerified(true);
                $user->removeToken();
                 }

            $manager->persist($job);
        }
        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            CategoryFixtures::class,
            UserFixtures::class,
        ];
    }
}
