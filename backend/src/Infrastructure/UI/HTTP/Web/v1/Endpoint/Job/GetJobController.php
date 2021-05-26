<?php


namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\Job;


use App\Application\Job\JobRepository\JobReadRepository;
use App\Infrastructure\UI\HTTP\Web\v1\ApiResponder\ResourceResponder;
use Ramsey\Uuid\UuidInterface;
use Symfony\Component\Routing\Annotation\Route;
use Undabot\JsonApi\Definition\Model\Request\GetResourceRequestInterface;
use Undabot\SymfonyJsonApi\Http\Model\Response\ResourceResponse;

class GetJobController
{
    #[Route('/api/v1/job/{id}', name: 'api_v1_job_get', methods: ['GET'])]
    public function get(
        UuidInterface $id,
        JobReadRepository $repository,
        ResourceResponder $responder,
    ): ResourceResponse {
        $job = $repository->get($id);

        return $responder->resource($job);
    }
}