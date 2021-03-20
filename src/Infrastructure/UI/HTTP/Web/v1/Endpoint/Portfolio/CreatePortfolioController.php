<?php /** @noinspection PhpDocSignatureInspection */

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\Portfolio;


use App\Application\Command\Web\Portfolio\CreatePortfolioCommand;
use App\Application\Portfolio\PortfolioRepository\PortfolioReadRepository;
use App\Application\Service\Bus\CommandBus;
use App\Infrastructure\UI\HTTP\Web\v1\ApiResponder\ResourceResponder;
use App\Infrastructure\UI\HTTP\Web\v1\Model\Portfolio\PortfolioWriteModel;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\User\UserInterface;
use Undabot\JsonApi\Definition\Model\Request\CreateResourceRequestInterface;
use Undabot\SymfonyJsonApi\Http\Model\Response\ResourceCreatedResponse;
use Undabot\SymfonyJsonApi\Http\Service\SimpleResourceHandler;

final class CreatePortfolioController
{
    /** @Route("/api/v1/portfolios", name="api_v1_portfolios_create", methods={"POST"}) */
    public function create(
        CreateResourceRequestInterface $request,
        SimpleResourceHandler $resourceHandler,
        CommandBus $commandBus,
        PortfolioReadRepository $repository,
        ResourceResponder $responder,
        UserInterface $user
    ): ResourceCreatedResponse {
        $createModel = $resourceHandler->getModelFromRequest($request, PortfolioWriteModel::class);

        $command = new CreatePortfolioCommand($createModel->id, $user->getUsername(), $createModel->images,
            $createModel->companyName, $createModel->address, $createModel->city, $createModel->phone,
            $createModel->disabilityPercent, $createModel->paycheck, $createModel->aboutCompany, $createModel->aboutJob,
            $createModel->jobPosition);
        $commandBus->handleCommand($command);

        $portfolio = $repository->get(Uuid::fromString($command->id));

        return $responder->resourceCreated($portfolio);
    }
}