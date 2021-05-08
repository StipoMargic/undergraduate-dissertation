<?php

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\Category;

use App\Application\Portfolio\PortfolioRepository\PortfolioReadRepository;
use Ramsey\Uuid\UuidInterface;
use Symfony\Component\Routing\Annotation\Route;
use Undabot\SymfonyJsonApi\Http\Model\Response\ResourceResponse;

final class GetCategoryController
{

    #[Route('/api/v1/category/{id}', name: 'api_v1_category_get', methods: ['GET'])]
    public function get(
        UuidInterface $id,
        PortfolioReadRepository $repository
    ): ResourceResponse {
        $portfolio = $repository->get($id);

        return new ResourceResponse($portfolio);
    }
}