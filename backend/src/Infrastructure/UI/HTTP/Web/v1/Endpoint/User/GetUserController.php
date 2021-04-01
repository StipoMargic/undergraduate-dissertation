<?php /** @noinspection PhpDocSignatureInspection */

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\User;


use App\Application\User\UserRepository\UserReadRepository;
use App\Infrastructure\UI\HTTP\Web\v1\ApiResponder\ResourceResponder;
use Ramsey\Uuid\UuidInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\Routing\Annotation\Route;
use Undabot\SymfonyJsonApi\Http\Model\Response\ResourceResponse;

final class GetUserController
{
    /**  @Route("/api/v1/users/{id}", name="api_v1_get_user", methods={"GET"})
     * @IsGranted("IS_AUTHENTICATED_ANONYMOUSLY")
     */
    public function get(
        UuidInterface $id,
        UserReadRepository $repository,
        ResourceResponder $responder
    ): ResourceResponse {
        $user = $repository->get($id);

        return $responder->resource($user);
    }
}