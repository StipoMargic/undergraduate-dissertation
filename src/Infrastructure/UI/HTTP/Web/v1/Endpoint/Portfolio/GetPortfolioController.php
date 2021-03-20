<?php /** @noinspection PhpDocSignatureInspection */

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\Portfolio;


use App\Application\Portfolio\PortfolioRepository\PortfolioReadRepository;
use App\Infrastructure\UI\HTTP\Web\v1\ApiResponder\ResourceResponder;
use Ramsey\Uuid\UuidInterface;
use Symfony\Component\Routing\Annotation\Route;
use Undabot\SymfonyJsonApi\Http\Model\Response\ResourceResponse;

final class GetPortfolioController
{
    /** @Route("/api/v1/portfolios/{id}", name="api_v1_portfolios_get", methods={"GET"}) */
    public function get(
        UuidInterface $id,
        PortfolioReadRepository $repository,
        ResourceResponder $responder
    ): ResourceResponse
    {
        $portfolio = $repository->get($id);

        return $responder->resource($portfolio);
    }
}