<?php

declare(strict_types = 1);


namespace App\Infrastructure\UI\HTTP\Web\v1\Endpoint\Qualifications;

use App\Application\Qualification\QualificationRepository\QualificationReadRepository;
use App\Infrastructure\UI\HTTP\Web\v1\ApiResponder\ResourceResponder;
use Ramsey\Uuid\UuidInterface;
use Symfony\Component\Routing\Annotation\Route;
use Undabot\SymfonyJsonApi\Http\Model\Response\ResourceResponse;

final class GetQualificationController
{

    #[Route('/api/v1/qualifications/{id}', name: 'api_v1_qualifications_get', methods: ['GET'])]
    public function get(
        UuidInterface $id,
        QualificationReadRepository $repository,
        ResourceResponder $responder
    ): ResourceResponse {
        $qualifications = $repository->get($id);

        return $responder->resource($qualifications);
    }
}