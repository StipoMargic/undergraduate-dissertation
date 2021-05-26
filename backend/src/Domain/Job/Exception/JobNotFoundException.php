<?php

declare(strict_types=1);

namespace App\Domain\Job\Exception;


use App\Domain\Common\Exception\EntityNotFoundException;
use App\Domain\Job\Job;

class JobNotFoundException extends EntityNotFoundException
{

    public static function getClassName(): string
    {
        return Job::class;
    }
}