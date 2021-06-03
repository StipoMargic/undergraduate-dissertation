<?php
declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\Job;


use App\Application\Command\Web\Job\CreateJobCommand;
use App\Application\Job\JobRepository\JobReadRepository;
use App\Application\Service\Bus\CommandBus;
use App\Infrastructure\UI\HTTP\Web\v1\ApiResponder\ResourceResponder;
use App\Infrastructure\UI\HTTP\Web\v1\Model\Job\JobWriteModel;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Routing\Annotation\Route;
use Undabot\JsonApi\Definition\Model\Request\CreateResourceRequestInterface;
use Undabot\SymfonyJsonApi\Http\Model\Response\ResourceCreatedResponse;
use Undabot\SymfonyJsonApi\Http\Service\SimpleResourceHandler;

class CreateJobController
{
    #[Route('/api/v1/job', name: 'api_v1_job_create', methods: ['POST'])]
    public function create(
        CreateResourceRequestInterface $request,
        SimpleResourceHandler $resourceHandler,
        CommandBus $commandBus,
        JobReadRepository $repository,
        ResourceResponder $responder
    ): ResourceCreatedResponse {
        $createModel = $resourceHandler->getModelFromRequest($request, JobWriteModel::class);

        $command = new CreateJobCommand($createModel->id, $createModel->jobDuties, $createModel->skills,
            $createModel->vacancy, $createModel->activeTill,
            $createModel->location, $createModel->salary, $createModel->hours, $createModel->typeOfPosition,
            $createModel->disabledFriendly, $createModel->jobSummary, $createModel->jobPositionName, $createModel->jobDutiesBulletins);
        $commandBus->handleCommand($command);

        $job = $repository->get(Uuid::fromString($command->id));

        return $responder->resourceCreated($job);
    }
}