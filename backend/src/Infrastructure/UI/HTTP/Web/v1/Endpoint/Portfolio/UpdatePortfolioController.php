<?php

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\Portfolio;


use App\Application\Command\Web\Portfolio\UpdatePortfolioCommand;
use App\Application\Portfolio\PortfolioRepository\PortfolioReadRepository;
use App\Application\Service\Bus\CommandBus;
use App\Infrastructure\UI\HTTP\Web\v1\ApiResponder\ResourceResponder;
use App\Infrastructure\UI\HTTP\Web\v1\Model\Portfolio\UpdatePortfolioModel;
use Ramsey\Uuid\Uuid;
use Ramsey\Uuid\UuidInterface;
use Symfony\Component\Routing\Annotation\Route;
use Undabot\JsonApi\Definition\Model\Request\UpdateResourceRequestInterface;
use Undabot\SymfonyJsonApi\Http\Model\Response\ResourceUpdatedResponse;
use Undabot\SymfonyJsonApi\Http\Service\SimpleResourceHandler;
use Undabot\SymfonyJsonApi\Model\Resource\CombinedResource;
use Undabot\SymfonyJsonApi\Service\Resource\Factory\ResourceFactory;

final class UpdatePortfolioController
{
    /** @Route("/api/v1/portfolios/{id}", name="api_v1_portfolios_update", methods={"PUT"}) */
    public function update(
        UuidInterface $id,
        UpdateResourceRequestInterface $request,
        PortfolioReadRepository $repository,
        CommandBus $commandBus,
        SimpleResourceHandler $resourceHandler,
        ResourceFactory $resourceFactory,
        ResourceResponder $responder,
    ): ResourceUpdatedResponse {
        $portfolio = $repository->get($id);
        $baseModel = UpdatePortfolioModel::fromEntity($portfolio);
        $baseResource = $resourceFactory->make($baseModel);

        $updateResource = new CombinedResource($baseResource, $request->getResource());
        $updateModel = $resourceHandler->getModelFromResource($updateResource, UpdatePortfolioModel::class);

        $command = new UpdatePortfolioCommand(
            $updateModel->id,
            $updateModel->advancedKnowledge,
            $updateModel->advancedKnowledgeBulletins,
            $updateModel->skills,
            $updateModel->disabilityPercent,
            $updateModel->rate,
            $updateModel->hour,
        );

        $commandBus->handleCommand($command);

        $updatedPortfolio = $repository->get(Uuid::fromString($command->id));

        return $responder->resourceUpdated($updatedPortfolio);
    }
}