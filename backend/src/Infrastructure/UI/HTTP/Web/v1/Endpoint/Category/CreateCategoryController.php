<?php

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\Category;

use App\Application\Category\CategoryRepository\CategoryReadRepository;
use App\Application\Command\Web\Category\CreateCategoryCommand;
use App\Application\Service\Bus\CommandBus;
use App\Infrastructure\UI\HTTP\Web\v1\ApiResponder\ResourceResponder;
use App\Infrastructure\UI\HTTP\Web\v1\Model\Category\CategoryWriteModel;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Routing\Annotation\Route;
use Undabot\JsonApi\Definition\Model\Request\CreateResourceRequestInterface;
use Undabot\SymfonyJsonApi\Http\Model\Response\ResourceCreatedResponse;
use Undabot\SymfonyJsonApi\Http\Service\SimpleResourceHandler;

final class CreateCategoryController
{
    #[Route('/api/v1/category', name: 'api_v1_category_create', methods: ['POST'])]
    public function create(
        CreateResourceRequestInterface $request,
        SimpleResourceHandler $resourceHandler,
        CommandBus $commandBus,
        CategoryReadRepository $repository,
        ResourceResponder $responder
    ): ResourceCreatedResponse {
        $createModel = $resourceHandler->getModelFromRequest($request, CategoryWriteModel::class);

        $command = new CreateCategoryCommand($createModel->id, $createModel->name, $createModel->image,
            $createModel->description);
        $commandBus->handleCommand($command);

        $category = $repository->get(Uuid::fromString($command->id));

        return $responder->resourceCreated($category);
    }
}