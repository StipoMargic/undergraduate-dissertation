<?php

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\Category;


use App\Application\Category\CategoryRepository\CategoryReadRepository;
use App\Application\Command\Web\Category\UpdateCategoryCommand;
use App\Application\Service\Bus\CommandBus;
use App\Infrastructure\UI\HTTP\Web\v1\ApiResponder\ResourceResponder;
use App\Infrastructure\UI\HTTP\Web\v1\Model\Category\CategoryUpdateModel;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\Routing\Annotation\Route;
use Undabot\JsonApi\Definition\Model\Request\UpdateResourceRequestInterface;
use Undabot\SymfonyJsonApi\Http\Model\Response\ResourceUpdatedResponse;
use Undabot\SymfonyJsonApi\Http\Service\SimpleResourceHandler;
use Undabot\SymfonyJsonApi\Model\Resource\CombinedResource;
use Undabot\SymfonyJsonApi\Service\Resource\Factory\ResourceFactory;

final class UpdateCategoryController
{
    #[Route('/api/v1/category/{id}', name: 'api_v1_category_update', methods: ['PUT', 'PATCH'])]
    /** @IsGranted("ROLE_ADMIN") */
    public function update(
        string $id,
        UpdateResourceRequestInterface $request,
        SimpleResourceHandler $resourceHandler,
        CommandBus $commandBus,
        ResourceFactory $resourceFactory,
        CategoryReadRepository $repository,
        ResourceResponder $responder
    ): ResourceUpdatedResponse {
        $category = $repository->get($id);

        $baseUpdateModel = CategoryUpdateModel::fromEntity($category);

        $baseResource = $resourceFactory->make($baseUpdateModel);
        $updateResource = new CombinedResource($baseResource, $request->getResource());

        $updateModel = $resourceHandler->getModelFromResource($updateResource, CategoryUpdateModel::class);
        $command = new UpdateCategoryCommand(
            $updateModel->id,
            $updateModel->name,
            $updateModel->image,
            $updateModel->description
        );

        $commandBus->handleCommand($command);

        $updatedCategory = $repository->get(CategoryId::fromString($command->id));

        return $responder->resourceUpdated($updatedCategory);
    }
}