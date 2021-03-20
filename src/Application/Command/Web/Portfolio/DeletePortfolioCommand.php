<?php

declare(strict_types=1);

namespace App\Application\Command\Web\Portfolio;

use App\Application\Command\CommandInterface;

class DeletePortfolioCommand implements CommandInterface {

    public function __construct(
        public string $id
    )
    {
    }
}