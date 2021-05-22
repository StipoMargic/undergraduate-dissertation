<?php
declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\Contact;


use App\Application\Command\Web\Contact\SendContactMailCommand;
use App\Application\Service\Bus\CommandBus;
use App\Infrastructure\UI\HTTP\Web\v1\Model\Contact\ContactWriteModel;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Undabot\JsonApi\Definition\Model\Request\CreateResourceRequestInterface;
use Undabot\SymfonyJsonApi\Http\Service\SimpleResourceHandler;

class ContactController
{
    #[Route('/v1/contact', name: 'api_v1_contact', methods: ['POST'])]
    public function mail(
        CreateResourceRequestInterface $request,
        SimpleResourceHandler $resourceHandler,
        CommandBus $commandBus
    ): Response {
        $createModel = $resourceHandler->getModelFromRequest($request, ContactWriteModel::class);

        $command = new SendContactMailCommand($createModel->id, $createModel->name, $createModel->email, $createModel->company,
            $createModel->phone, $createModel->message);
        $commandBus->handleCommand($command);

        return new Response(null, Response::HTTP_NO_CONTENT);
    }
}