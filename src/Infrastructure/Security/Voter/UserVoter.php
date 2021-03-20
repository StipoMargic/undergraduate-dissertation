<?php

declare(strict_types = 1);

namespace App\Infrastructure\Security\Voter;


use App\Domain\User\User;
use JetBrains\PhpStorm\Pure;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class UserVoter extends Voter
{
    private const DELETE = "DELETE";
    private const EDIT = "EDIT";

    #[Pure] protected function supports(string $attribute, $subject): bool
    {
        return in_array($attribute, [self::DELETE, self::EDIT]) && $subject instanceof User;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {
        return true;
        $user = $token->getUser();
        if (!$user instanceof User || !$subject instanceof User) {
            return false;
        }

        if ($user->getRoles()[0] === User::ROLE_ADMIN) {
            return true;
        }

        switch ($attribute) {
            case self::EDIT:
            case self::DELETE:
                return $this->isOwner($subject, $user);
        }

        return false;
    }

    #[Pure] private function isOwner(User $subject, User $user): bool
    {
        return $subject->getId() === $user->getId();
    }
}