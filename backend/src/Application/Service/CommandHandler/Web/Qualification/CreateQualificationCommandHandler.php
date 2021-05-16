<?php
declare(strict_types = 1);

namespace App\Application\Service\CommandHandler\Web\Qualification;


use App\Application\Command\Web\Qualification\CreateQualificationCommand;
use App\Application\Qualification\QualificationRepository\QualificationWriteRepository;
use App\Domain\Qualification\Qualification;
use Ramsey\Uuid\Uuid;

final class CreateQualificationCommandHandler
{
    public function __construct(
        public QualificationWriteRepository $qualificationWriteRepository
    ) {
    }

    public function __invoke(CreateQualificationCommand $command): void
    {
        $qualification = new Qualification(
            Uuid::fromString($command->id),
            $command->nameOfQualification,
            $command->yearStart,
            $command->yearEnd,
            $command->description
        );

        $this->qualificationWriteRepository->save($qualification);
    }
}