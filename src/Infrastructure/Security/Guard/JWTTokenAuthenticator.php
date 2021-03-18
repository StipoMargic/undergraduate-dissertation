<?php

declare(strict_types = 1);

namespace App\Infrastructure\Security\Guard;


use App\Application\User\UserRepository\UserReadRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Guard\JWTTokenAuthenticator as BaseAuthenticator;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

class JWTTokenAuthenticator extends BaseAuthenticator
{
}