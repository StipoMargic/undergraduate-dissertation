<?php


namespace App\Application\Service\CommandHandler\Web\Comment;


use App\Application\Command\Web\Comment\CreateCommentCommand;
use App\Application\Comment\CommentRepository\CommentWriteRepository;
use App\Application\Job\JobRepository\JobReadRepository;
use App\Application\Job\JobRepository\JobWriteRepository;
use App\Application\Portfolio\PortfolioRepository\PortfolioReadRepository;
use App\Application\Portfolio\PortfolioRepository\PortfolioWriteRepository;
use App\Application\User\UserRepository\UserReadRepository;
use App\Domain\Comment\Comment;
use Ramsey\Uuid\Uuid;

final class CreateCommentCommandHandler
{
    public function __construct(
        public PortfolioReadRepository $portfolioReadRepository,
        public PortfolioWriteRepository $portfolioWriteRepository,
        public JobReadRepository $jobReadRepository,
        public JobWriteRepository $jobWriteRepository,
        public UserReadRepository $userReadRepository,
        public CommentWriteRepository $commentWriteRepository
    ) {
    }

    public function __invoke(CreateCommentCommand $command): void
    {
        $user = $this->userReadRepository->getByUsername($command->user);

        if ($command->portfolio !== null) {
            $portfolio = $this->portfolioReadRepository->get(Uuid::fromString($command->portfolio));

            $comment = new Comment(
                Uuid::fromString($command->id),
                $portfolio,
                null,
                $user,
                $command->score,
                $command->message
            );

            $this->commentWriteRepository->save($comment);
            $portfolio->addComment($comment);
            $portfolio->setAverageScore();
        } else {

            $job = $this->jobReadRepository->get(Uuid::fromString($command->job));

            $comment = new Comment(
                Uuid::fromString($command->id),
                null,
                $job,
                $user,
                $command->score,
                $command->message
            );

            $job->addComment($comment);
            $this->commentWriteRepository->save($comment);
        }
    }
}