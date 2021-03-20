<?php

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\Portfolio;


use Symfony\Component\Routing\Annotation\Route;
use Undabot\SymfonyJsonApi\Http\Model\Response\ResourceUpdatedResponse;

final class UpdatePortfolioController
{
    /** @Route("/api/v1/portfolios/{id}", name="api_v1_portfolios_update", methods={"PUT"}) */
    public function update(): ResourceUpdatedResponse
    {

    }
}