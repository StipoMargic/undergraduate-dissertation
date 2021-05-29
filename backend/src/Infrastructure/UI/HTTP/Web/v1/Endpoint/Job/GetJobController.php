<?php


namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\Job;


use App\Application\Job\JobRepository\JobReadRepository;
use App\Domain\Job\Job;
use App\Infrastructure\UI\HTTP\Web\v1\ApiResponder\ResourceResponder;
use Ramsey\Uuid\UuidInterface;
use Symfony\Component\Routing\Annotation\Route;
use Undabot\JsonApi\Definition\Model\Request\GetResourceRequestInterface;
use Undabot\SymfonyJsonApi\Http\Model\Response\ResourceResponse;
use Undabot\SymfonyJsonApi\Model\Collection\ObjectCollection;
use Undabot\SymfonyJsonApi\Model\Collection\UniqueCollection;

class GetJobController
{
    #[Route('/api/v1/job/{id}', name: 'api_v1_job_get', methods: ['GET'])]
    public function get(
        UuidInterface $id,
        JobReadRepository $repository,
        ResourceResponder $responder,
        GetResourceRequestInterface $request
    ): ResourceResponse {
        $request->allowIncluded(['user']);
        $job = $repository->get($id);


        return $responder->resource($job, $this->getIncludedItems($request, $job)->getItems());
    }

    private function getIncludedItems(
        GetResourceRequestInterface $request,
        Job $job
    ): ObjectCollection {
        $includedItems = new UniqueCollection();

        if (true === $request->isIncluded('user')) {
            $includedItems->addObject($job->getUser());
        }

        return $includedItems;
    }
}