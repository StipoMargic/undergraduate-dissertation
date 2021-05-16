<?php

declare(strict_types = 1);

namespace App\Domain\Qualification\Exception;

use App\Domain\Common\Exception\EntityNotFoundException;
use App\Domain\Qualification\Qualification;

final class QualificationNotFoundException extends EntityNotFoundException
{
    public static function getClassName(): string
    {
        return Qualification::class;
    }
}