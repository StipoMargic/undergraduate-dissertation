<?php

declare(strict_types=1);

namespace App\Domain\Common\Exception;

use Exception;

abstract class EntityNotFoundException extends Exception
{
    public static function withId(string $id): Exception
    {
        $message = sprintf('%s with Id %s not found', static::getClassName(), $id);

        return new parent($message, 404);
    }

    abstract public static function getClassName(): string;
}
