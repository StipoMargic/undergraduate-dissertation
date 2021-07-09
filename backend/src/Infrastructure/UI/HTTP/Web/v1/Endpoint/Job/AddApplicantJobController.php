<?php
declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\Job;


use App\Application\Command\Web\Job\JobApplicationCommand;
use App\Application\Job\JobRepository\JobReadRepository;
use App\Application\Service\Bus\CommandBus;
use App\Infrastructure\UI\HTTP\Web\v1\ApiResponder\ResourceResponder;
use App\Infrastructure\UI\HTTP\Web\v1\Model\Job\JobApplicationModel;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Routing\Annotation\Route;
use Undabot\JsonApi\Definition\Model\Request\CreateResourceRequestInterface;
use Undabot\SymfonyJsonApi\Http\Model\Response\ResourceUpdatedResponse;
use Undabot\SymfonyJsonApi\Http\Service\SimpleResourceHandler;

final class AddApplicantJobController
{
    #[Route('/api/v1/job/{id}/apply-now', name: 'api_v1_apply_job', methods: ['POST'])]
    public function create(
        CreateResourceRequestInterface $request,
        SimpleResourceHandler $resourceHandler,
        ResourceResponder $responder,
        JobReadRepository $repository,
        CommandBus $commandBus
    ): ResourceUpdatedResponse {
        $createModel = $resourceHandler->getModelFromRequest($request, JobApplicationModel::class);

        $command = new JobApplicationCommand($createModel->id, $createModel->subject, $createModel->message,
            $createModel->jobId, $createModel->resume, $createModel->username);
        $commandBus->handleCommand($command);

        $job = $repository->get(Uuid::fromString($createModel->jobId));

        return $responder->resourceUpdated($job);
    }
}