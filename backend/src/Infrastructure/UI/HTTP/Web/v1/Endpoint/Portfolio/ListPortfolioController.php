<?php

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\Portfolio;


use App\Application\Query\Web\Portfolio\PortfolioQuery;
use App\Application\Service\Bus\QueryBus;
use App\Infrastructure\UI\HTTP\Web\v1\ApiResponder\ResourceResponder;
use Symfony\Component\Routing\Annotation\Route;
use Undabot\JsonApi\Definition\Model\Request\GetResourceCollectionRequestInterface;
use Undabot\SymfonyJsonApi\Http\Model\Response\ResourceCollectionResponse;

final class ListPortfolioController
{
    #[Route('/api/v1/portfolios', name: 'api_v1_portfolios_list', methods: ['GET'])]
    public function list(
        GetResourceCollectionRequestInterface $request,
        QueryBus $queryBus,
        ResourceResponder $responder
    ){
        $request->allowSorting(['$disabilityPercent', 'createdAt']);
        $pagination = $request->getPagination();

        $entities = $queryBus->handleQuery(new PortfolioQuery(null === $pagination ? null : $pagination->getOffset(),
            null === $pagination ? null : $pagination->getSize(), $request->getSortSet()));

        return $responder->resourceObjectCollection($entities);
    }
}