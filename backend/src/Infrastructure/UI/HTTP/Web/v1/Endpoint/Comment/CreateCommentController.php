<?php


namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\Comment;


use App\Application\Command\Web\Comment\CreateCommentCommand;
use App\Application\Comment\CommentRepository\CommentReadRepository;
use App\Application\Service\Bus\CommandBus;
use App\Infrastructure\UI\HTTP\Web\v1\ApiResponder\ResourceResponder;
use App\Infrastructure\UI\HTTP\Web\v1\Model\Comment\CommentWriteModel;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Routing\Annotation\Route;
use Undabot\JsonApi\Definition\Model\Request\CreateResourceRequestInterface;
use Undabot\SymfonyJsonApi\Http\Model\Response\ResourceCreatedResponse;
use Undabot\SymfonyJsonApi\Http\Service\SimpleResourceHandler;

final class CreateCommentController
{
    #[Route('/api/v1/comment', name: 'api_v1_comment_create', methods: ['POST'])]
    public function create(
        CreateResourceRequestInterface $request,
        SimpleResourceHandler $resourceHandler,
        CommandBus $commandBus,
        CommentReadRepository $repository,
        ResourceResponder $responder
    ): ResourceCreatedResponse {
        $createModel = $resourceHandler->getModelFromRequest($request, CommentWriteModel::class);


        $command = new CreateCommentCommand($createModel->id, $createModel->portfolio, $createModel->job,
            $createModel->user, $createModel->score, $createModel->message);

        $commandBus->handleCommand($command);

        $comment = $repository->get(Uuid::fromString($command->id));

        return $responder->resourceCreated($comment);
    }
}