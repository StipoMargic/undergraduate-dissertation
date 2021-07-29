<?php

declare(strict_types=1);

namespace App\Application\Command\Web\Portfolio;

use App\Application\Command\CommandInterface;

class UpdatePortfolioCommand implements CommandInterface {
    public function __construct(
        public string $id,
        public string $advancedKnowledge,
        public string $advancedKnowledgeBulletins,
        public string $skills,
        public int $disabilityPercent,
        public string $rate,
        public string $hour,
    ) {
    }
}