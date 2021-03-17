<?php /** @noinspection PhpDocSignatureInspection */

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\User;


use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class Login extends AbstractController
{
    /**
     * @Route(path="/api/login_check", name="api_login_check", methods={"POST"})
     */
    public function getTokenUser(JWTTokenManagerInterface $JWTManager): JsonResponse
    {
        return new JsonResponse(['token' => $JWTManager->create($this->getUser())]);
    }
}