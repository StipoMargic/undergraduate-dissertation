<?php
declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\Job;


use App\Application\Command\Web\Job\UpdateJobCommand;
use App\Application\Job\JobRepository\JobReadRepository;
use App\Application\Service\Bus\CommandBus;
use App\Infrastructure\UI\HTTP\Web\v1\ApiResponder\ResourceResponder;
use App\Infrastructure\UI\HTTP\Web\v1\Model\Job\JobUpdateModel;
use Ramsey\Uuid\Uuid;
use Ramsey\Uuid\UuidInterface;
use Symfony\Component\Routing\Annotation\Route;
use Undabot\JsonApi\Definition\Model\Request\UpdateResourceRequestInterface;
use Undabot\SymfonyJsonApi\Http\Model\Response\ResourceUpdatedResponse;
use Undabot\SymfonyJsonApi\Http\Service\SimpleResourceHandler;
use Undabot\SymfonyJsonApi\Model\Resource\CombinedResource;
use Undabot\SymfonyJsonApi\Service\Resource\Factory\ResourceFactory;

final class UpdateJobController
{
    #[Route('/api/v1/job/{id}', name: 'api_v1_job_update', methods: ['PUT', 'PATCH'])]
    public function update(
        UuidInterface $id,
        UpdateResourceRequestInterface $request,
        JobReadRepository $repository,
        CommandBus $commandBus,
        SimpleResourceHandler $resourceHandler,
        ResourceFactory $resourceFactory,
        ResourceResponder $responder,
    ): ResourceUpdatedResponse {
        $job = $repository->get($id);
        $baseModel = JobUpdateModel::fromEntity($job);
        $baseResource = $resourceFactory->make($baseModel);

        $updateResource = new CombinedResource($baseResource, $request->getResource());
        $updateModel = $resourceHandler->getModelFromResource($updateResource, JobUpdateModel::class);

        $command = new UpdateJobCommand(
            $updateModel->id, $updateModel->jobDuties, $updateModel->skills,
            $updateModel->vacancy, $updateModel->activeTill,
            $updateModel->location, $updateModel->salary, $updateModel->hours, $updateModel->typeOfPosition,
            $updateModel->disabledFriendly, $updateModel->jobSummary, $updateModel->jobPositionName,
            $updateModel->jobDutiesBulletins
        );

        $commandBus->handleCommand($command);

        $updatedUser = $repository->get(Uuid::fromString($command->id));

        return $responder->resourceUpdated($updatedUser);
    }
}
