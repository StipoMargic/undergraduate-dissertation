<?php /** @noinspection PhpDocSignatureInspection */

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\Portfolio;


use App\Application\Command\Web\Portfolio\DeletePortfolioCommand;
use App\Application\Service\Bus\CommandBus;
use Ramsey\Uuid\UuidInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\Routing\Annotation\Route;
use Undabot\SymfonyJsonApi\Http\Model\Response\ResourceDeletedResponse;

final class DeletePortfolioController
{
    /**
     * @Route("/api/v1/portfolios/{id}", name="api_v1_portfolios_delete", methods={"DELETE"})
     * @IsGranted("DELETE", subject="portfolio", message="You are not logged in as portfolio owner!")
     */
    public function delete(
        UuidInterface $id,
        CommandBus $commandBus,
    ): ResourceDeletedResponse
    {
        $command = new DeletePortfolioCommand((string) $id);
        $commandBus->handleCommand($command);

        return new ResourceDeletedResponse();
    }
}