<?php

declare(strict_types = 1);

namespace App\Infrastructure\Security\Voter;


use App\Domain\Portfolio\Portfolio;
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
        return in_array($attribute, [self::DELETE, self::EDIT]);
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();
        if (!$user instanceof User) {
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

    #[Pure] private function isOwner($subject, User $user): bool
    {
        if ($subject instanceof Portfolio){
            return $subject->getUser()->getId() === $user->getId();
        }
        return false;
    }
}