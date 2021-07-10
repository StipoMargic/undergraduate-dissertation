<?php


namespace App\Domain\Job\Exception;


use JetBrains\PhpStorm\Pure;

class JobApplicantAlreadyAppliedException extends \Exception
{
    #[Pure] public static function alreadyApplied(string $username): self
    {
        $message = sprintf("%s already applied!", $username);

        return new self($message, 400);

}
}