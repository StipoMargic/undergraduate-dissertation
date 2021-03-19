<?php

declare(strict_types = 1);

namespace App\Domain\Image\Exception;


use App\Domain\Common\Exception\EntityNotFoundException;
use App\Domain\Image\Image;

class ImageNotFoundException extends EntityNotFoundException
{
    public static function getClassName(): string
    {
        return Image::class;
    }
}