<?php

declare(strict_types = 1);

namespace App\Infrastructure\Security\Voter;


use App\Domain\User\User;
use JetBrains\PhpStorm\Pure;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class UserVoter extends Voter
{

    #[Pure] protected function supports(string $attribute, $subject): bool
    {
        return in_array($attribute, ['DELETE', 'EDIT']) && $subject instanceof User;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();
        if (!$user instanceof User || !$subject instanceof User) {
            return false;
        }

        if ($user->getRoles()[0] === User::ROLE_ADMIN) {
            return true;
        }

        switch ($attribute) {
            case 'DELETE':
                if ($subject->getId() === $user->getId()) {
                    return true;
                }
                break;
            case 'EDIT':
                if ($subject->getId() === $user->getId()) {
                    return true;
                }
        }

        return false;
    }
}