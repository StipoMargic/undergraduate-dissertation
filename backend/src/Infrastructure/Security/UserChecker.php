<?php /** @noinspection PhpUnhandledExceptionInspection */

declare(strict_types = 1);

namespace App\Infrastructure\Security;


use App\Domain\User\Exception\UserIsDeactivatedException;
use App\Domain\User\Exception\UserNotVerifiedException;
use App\Domain\User\User;
use Symfony\Component\Security\Core\User\UserCheckerInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class UserChecker implements UserCheckerInterface
{

    public function checkPreAuth(UserInterface $user)
    {
        if (!$user instanceof User) {
            return;
        }

        if (!$user->isVerified()) {
            throw new UserNotVerifiedException("User is not verified! Please verify it before login in.");
        }
    }

    public function checkPostAuth(UserInterface $user)
    {
        if (!$user instanceof User) {
            return;
        }

        if ($user->getDeletedAt()) {
            throw new UserIsDeactivatedException("User is currently deactivated contact administrator for more support!");
        }
    }
}