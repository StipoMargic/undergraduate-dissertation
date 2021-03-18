<?php /** @noinspection PhpDocSignatureInspection */

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\User;


use App\Application\Query\Web\User\UserQuery;
use App\Application\Service\Bus\QueryBus;
use App\Infrastructure\UI\HTTP\Web\v1\ApiResponder\ResourceResponder;
use Symfony\Component\Routing\Annotation\Route;
use Undabot\JsonApi\Definition\Model\Request\GetResourceCollectionRequestInterface;
use Undabot\SymfonyJsonApi\Http\Model\Response\ResourceCollectionResponse;

final class ListUserController
{
    /**
     * @Route("/api/v1/users", name="web.v1.user.list", methods={"GET"})
     */
    public function list(
        GetResourceCollectionRequestInterface $request,
        QueryBus $queryBus,
        ResourceResponder $responder
    ): ResourceCollectionResponse {
        $request->allowFilters(['role']);

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