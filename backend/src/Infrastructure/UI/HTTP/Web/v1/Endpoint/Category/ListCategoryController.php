<?php

declare(strict_types=1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\Category;

use App\Application\Query\Web\Category\CategoryQuery;
use App\Application\Service\Bus\QueryBus;
use App\Infrastructure\UI\HTTP\Web\v1\ApiResponder\ResourceResponder;
use Symfony\Component\Routing\Annotation\Route;
use Undabot\JsonApi\Definition\Model\Request\GetResourceCollectionRequestInterface;
use Undabot\SymfonyJsonApi\Http\Model\Response\ResourceCollectionResponse;

final class ListCategoryController
{
    #[Route('/api/v1/categories', name: 'api_v1_categories_list', methods: ['GET'])]
    public function list(
        GetResourceCollectionRequestInterface $request,
        QueryBus $queryBus,
        ResourceResponder $responder
    ): ResourceCollectionResponse {
        $request->allowSorting(['name', 'createdAt']);

        $pagination = $request->getPagination();
        $entities = $queryBus->handleQuery(new CategoryQuery(null === $pagination ? null : $pagination->getOffset(),
            null ===
            $pagination ? null : $pagination->getSize(), $request->getSortSet()));


        return $responder->resourceObjectCollection($entities);
    }
}