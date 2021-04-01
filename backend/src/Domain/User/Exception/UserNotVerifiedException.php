<?php

declare(strict_types = 1);

namespace App\Domain\User\Exception;


use JetBrains\PhpStorm\Pure;
use Throwable;

class UserNotVerifiedException extends \Exception
{
    #[Pure] public function __construct($message = "", $code = 401, Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}