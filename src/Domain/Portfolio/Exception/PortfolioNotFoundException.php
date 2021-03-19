<?php

declare(strict_types = 1);

namespace App\Domain\Portfolio\Exception;


use App\Domain\Common\Exception\EntityNotFoundException;
use App\Domain\Portfolio\Portfolio;

class PortfolioNotFoundException extends EntityNotFoundException
{
    public static function getClassName(): string
    {
        return Portfolio::class;
    }
}