<?php

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\Category;

use App\Application\Command\Web\Category\DeleteCategoryCommand;
use App\Application\Service\Bus\CommandBus;
use Ramsey\Uuid\UuidInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\Routing\Annotation\Route;
use Undabot\SymfonyJsonApi\Http\Model\Response\ResourceDeletedResponse;

final class DeleteCategoryController
{
    #[Route('/api/v1/category/{id}', name: 'api_v1_category_delete', methods: ['DELETE'])]
    /** @IsGranted("ROLE_ADMIN") */
    public function delete(
        UuidInterface $id,
        CommandBus $commandBus
    ): ResourceDeletedResponse {
        $command = new DeleteCategoryCommand((string) $id);
        $commandBus->handleCommand($command);

        return new ResourceDeletedResponse();
    }
}