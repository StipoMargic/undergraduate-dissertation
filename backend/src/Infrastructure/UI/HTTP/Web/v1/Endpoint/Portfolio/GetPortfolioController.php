<?php /** @noinspection PhpDocSignatureInspection */

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\Portfolio;


use App\Application\Portfolio\PortfolioRepository\PortfolioReadRepository;
use App\Domain\Portfolio\Portfolio;
use App\Infrastructure\UI\HTTP\Web\v1\ApiResponder\ResourceResponder;
use Ramsey\Uuid\UuidInterface;
use Symfony\Component\Routing\Annotation\Route;
use Undabot\JsonApi\Definition\Model\Request\GetResourceRequestInterface;
use Undabot\SymfonyJsonApi\Http\Model\Response\ResourceResponse;
use Undabot\SymfonyJsonApi\Model\Collection\ObjectCollection;
use Undabot\SymfonyJsonApi\Model\Collection\UniqueCollection;

final class GetPortfolioController
{
    /** @Route("/api/v1/portfolios/{id}", name="api_v1_portfolios_get", methods={"GET"}) */
    public function get(
        UuidInterface $id,
        PortfolioReadRepository $repository,
        ResourceResponder $responder,
        GetResourceRequestInterface $request
    ): ResourceResponse {
        $request->allowIncluded(['qualifications']);
        $portfolio = $repository->get($id);

        return $responder->resource($portfolio, $this->getIncludedItems($request, $portfolio)->getItems());
    }

    private function getIncludedItems(
        GetResourceRequestInterface $request,
        Portfolio $portfolio
    ): ObjectCollection {
        $includedEntities = new UniqueCollection();

        if (true === $request->isIncluded('qualifications') && !$portfolio->getQualification()->isEmpty()) {
            $includedEntities->addObjects($portfolio->getQualification()->getValues());
        }

        return $includedEntities;
    }
}