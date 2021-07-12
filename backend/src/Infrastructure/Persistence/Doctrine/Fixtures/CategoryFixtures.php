<?php


namespace App\Infrastructure\Persistence\Doctrine\Fixtures;


use App\Domain\Category\Category;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Faker\Generator;
use Ramsey\Uuid\Uuid;

class CategoryFixtures extends Fixture
{
    public const CATEGORY_NAMES = ['IT', 'Traffic', 'Crafting', 'Finance', 'Executives'];
    private Generator $faker;

    public function __construct()
    {
        $this->faker = Factory::create();
    }


    public function load(ObjectManager $manager): void
    {
        for ($i = 0; $i < count(self::CATEGORY_NAMES); $i++) {
            $image = self::CATEGORY_NAMES[$i] . '.png';
            $category = new Category(Uuid::uuid4(), [], self::CATEGORY_NAMES[$i],
                $image, $this->faker->text(15));

            $this->setReference(Category::class . $i, $category);
            $manager->persist($category);
        }
        $manager->flush();
    }
}