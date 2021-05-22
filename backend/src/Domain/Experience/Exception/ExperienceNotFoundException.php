<?php


namespace App\Domain\Experience\Exception;


use App\Domain\Common\Exception\EntityNotFoundException;
use App\Domain\Experience\Experience;

class ExperienceNotFoundException extends EntityNotFoundException
{

    public static function getClassName(): string
    {
        return Experience::class;
    }
}