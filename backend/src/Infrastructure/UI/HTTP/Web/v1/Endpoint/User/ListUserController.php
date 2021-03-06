<?php /** @noinspection PhpDocSignatureInspection */

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\User;


use App\Application\Query\Web\User\UserQuery;
use App\Application\Service\Bus\QueryBus;
use App\Infrastructure\UI\HTTP\Web\v1\ApiResponder\ResourceResponder;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\Routing\Annotation\Route;
use Undabot\JsonApi\Definition\Model\Request\GetResourceCollectionRequestInterface;
use Undabot\SymfonyJsonApi\Http\Model\Response\ResourceCollectionResponse;

final class ListUserController
{
    /**
     * @Route("/api/v1/users", name="api_v1_user_list", methods={"GET"})
     * @IsGranted("IS_AUTHENTICATED_ANONYMOUSLY")
     */
    public function list(
        GetResourceCollectionRequestInterface $request,
        QueryBus $queryBus,
        ResourceResponder $responder
    ): ResourceCollectionResponse {
        $request->allowFilters(['name', 'role']);

        $pagination = $request->getPagination();
        $entities = $queryBus->handleQuery(new UserQuery(null === $pagination ? null : $pagination->getOffset(),
                null === $pagination ? null : $pagination->getSize(),
                $request->getFilterSet(),
                $request->getSortSet()
            )
        );

        return $responder->resourceObjectCollection($entities);
    }
}