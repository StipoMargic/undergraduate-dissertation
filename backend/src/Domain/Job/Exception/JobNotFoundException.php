<?php

declare(strict_types=1);

namespace App\Domain\Job\Exception;


use App\Domain\Common\Exception\EntityNotFoundException;

class JobNotFoundException extends EntityNotFoundException
{

    public static function getClassName(): string
    {
        // T
    }
}