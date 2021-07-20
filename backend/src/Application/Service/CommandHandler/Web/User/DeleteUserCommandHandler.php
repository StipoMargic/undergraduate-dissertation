<?php

declare(strict_types = 1);

namespace App\Application\Service\CommandHandler\Web\User;


use App\Application\Command\Web\User\DeleteUserCommand;
use App\Application\Job\JobRepository\JobWriteRepository;
use App\Application\Portfolio\PortfolioRepository\PortfolioWriteRepository;
use App\Application\User\UserRepository\UserReadRepository;
use App\Application\User\UserRepository\UserWriteRepository;
use App\Domain\User\User;
use Ramsey\Uuid\Uuid;

final class DeleteUserCommandHandler
{
    public function __construct(
        public UserReadRepository $userReadRepository,
        public UserWriteRepository $userWriteRepository,
        private JobWriteRepository $jobWriteRepository,
        private PortfolioWriteRepository $portfolioWriteRepository
    ) {
    }

    public function __invoke(DeleteUserCommand $command): void
    {
        $user = $this->userReadRepository->get(Uuid::fromString($command->id));
        $role = $user->getRoles()[0];

        if ($role === User::ROLE_EMPLOYER) {
            foreach ($user->getJobs()->getValues() as $job) {
                $job->delete();
                $this->jobWriteRepository->save($job);
            }
        } else {
            if ($role === User::ROLE_USER) {
                foreach ($user->getPortfolios()->getValues() as $portfolio) {
                    $portfolio->deletet();
                    $this->portfolioWriteRepository->save($portfolio);
                }
            }
        }

        $user->delete();

        $this->userWriteRepository->save($user);
    }
}
