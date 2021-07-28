<?php


namespace App\Infrastructure\Persistence\Doctrine\Fixtures;


use App\Domain\Category\Category;
use App\Domain\Portfolio\Portfolio;
use App\Domain\User\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Faker\Generator;
use Ramsey\Uuid\Uuid;

class PortfolioFixtures extends Fixture implements DependentFixtureInterface
{
    public const PORTFOLIOS_TO_CREATE = 1540;
    public Generator $faker;

    public function __construct()
    {
        $this->faker = Factory::create();
    }


    public function load(ObjectManager $manager): void
    {
        for ($i = 0; $i < self::PORTFOLIOS_TO_CREATE; $i++) {
            $salary = $this->faker->numberBetween(10000, 50000);
            $hours = (int) ($this->faker->numberBetween(140, 240) / 4);
            $rate = $salary / $hours;
            $rate = (int) $rate;

            $portfolio = new Portfolio(Uuid::uuid4(),
                $this->getReference(Category::class . random_int(0, count(CategoryFixtures::CATEGORY_NAMES) - 1)),
                $this->faker->text(150),
                $this->faker->text(45) . ", " . $this->faker->text(45) . ", " . $this->faker->text(45) . ", "
                . $this->faker->text(45) . ", " . $this->faker->text(45),
                $this->faker->text(5) . ", " . $this->faker->text(5) . ", " . $this->faker->text(5) . ", "
                . $this->faker->text(5) . ", " . $this->faker->text(5),
                random_int(0, 100),
                (string) $rate,
                (string) $hours
            );
            /** @var User $user */
            $user = $this->getReference(User::class . "f" . random_int(0, UserFixtures::USERS_TO_CREATE / 2 - 1));
            if (false === $user->isVerified()) {
                $portfolio->delete();
            }
            $portfolio->setUser($user);
            $manager->persist($portfolio);
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