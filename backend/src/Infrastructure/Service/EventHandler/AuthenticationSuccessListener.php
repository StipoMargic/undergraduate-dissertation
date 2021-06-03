<?php


namespace App\Infrastructure\Service\EventHandler;


use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\Security\Core\User\UserInterface;

class AuthenticationSuccessListener
{
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        $data = $event->getData();
        $user = $event->getUser();

        if (!$user instanceof UserInterface) {
            return;
        }

        $additionalData = [
            'role' => $user->getRoles()[0],
            'username' => $user->getUsername(),
        ];

        $data = array_merge($data, $additionalData);

        $event->setData($data);
    }
}