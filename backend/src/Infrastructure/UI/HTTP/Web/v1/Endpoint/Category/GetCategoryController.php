<?php

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\Category;

use App\Application\Category\CategoryRepository\CategoryReadRepository;
use App\Infrastructure\UI\HTTP\Web\v1\ApiResponder\ResourceResponder;
use Ramsey\Uuid\UuidInterface;
use Symfony\Component\Routing\Annotation\Route;
use Undabot\SymfonyJsonApi\Http\Model\Response\ResourceResponse;

final class GetCategoryController
{

    #[Route('/api/v1/category/{id}', name: 'api_v1_category_get', methods: ['GET'])]
    public function get(
        UuidInterface $id,
        CategoryReadRepository $repository,
        ResourceResponder $responder
    ): ResourceResponse {
        $category = $repository->get($id);

        return $responder->resource($category);
    }
}