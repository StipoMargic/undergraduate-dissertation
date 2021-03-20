<?php

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\Portfolio;


use Symfony\Component\Routing\Annotation\Route;
use Undabot\SymfonyJsonApi\Http\Model\Response\ResourceCreatedResponse;

final class CreatePortfolioController
{
    /** @Route("/api/v1/portfolios", name="api_v1_portfolios_create", methods={"POST"}) */
    public function create(): ResourceCreatedResponse
    {

    }
}