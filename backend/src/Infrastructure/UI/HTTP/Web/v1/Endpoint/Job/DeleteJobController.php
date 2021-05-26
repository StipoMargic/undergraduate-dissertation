<?php
declare(strict_types=1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\Job;


use App\Application\Command\Web\Job\DeleteJobCommand;
use App\Application\Service\Bus\CommandBus;
use Ramsey\Uuid\UuidInterface;
use Symfony\Component\Routing\Annotation\Route;
use Undabot\SymfonyJsonApi\Http\Model\Response\ResourceDeletedResponse;

final class DeleteJobController
{
    #[Route('/api/v1/job/{id}', name: 'api_v1_job_delete', methods: ['DELETE'])]
    public function delete(
        UuidInterface $id,
        CommandBus $commandBus
    ): ResourceDeletedResponse
    {
        $command = new DeleteJobCommand((string) $id);
        $commandBus->handleCommand($command);

        return new ResourceDeletedResponse();
    }
}