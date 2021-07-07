<?php


namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\Portfolio;


use App\Application\Command\Web\Portfolio\HireFreelancerCommand;
use App\Application\Portfolio\PortfolioRepository\PortfolioReadRepository;
use App\Application\Service\Bus\CommandBus;
use App\Infrastructure\UI\HTTP\Web\v1\ApiResponder\ResourceResponder;
use App\Infrastructure\UI\HTTP\Web\v1\Model\Portfolio\HireFreelancerModel;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Routing\Annotation\Route;
use Undabot\JsonApi\Definition\Model\Request\CreateResourceRequestInterface;
use Undabot\SymfonyJsonApi\Http\Model\Response\ResourceCreatedResponse;
use Undabot\SymfonyJsonApi\Http\Service\SimpleResourceHandler;

class HireFreelancerController
{
    #[Route('/api/v1/portfolios/{id}/hire-now', name: 'api_v1_hire_freelancer', methods: ['POST'])]
    public function create(
        CreateResourceRequestInterface $request,
        SimpleResourceHandler $resourceHandler,
        CommandBus $commandBus,
        PortfolioReadRepository $repository,
        ResourceResponder $responder,
    ): ResourceCreatedResponse {
        $createModel = $resourceHandler->getModelFromRequest($request, HireFreelancerModel::class);

        $command = new HireFreelancerCommand($createModel->id, $createModel->subject, $createModel->message,
            $createModel->portfolioId, $createModel->companyName);
        $commandBus->handleCommand($command);

        $portfolio = $repository->get(Uuid::fromString($command->portfolioId));

        return $responder->resourceCreated($portfolio);
    }
}