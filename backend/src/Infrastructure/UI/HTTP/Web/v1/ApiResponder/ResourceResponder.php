<?php

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\ApiResponder;

use App\Domain\Category\Category;
use App\Domain\Comment\Comment;
use App\Domain\Experience\Experience;
use App\Domain\Job\Job;
use App\Domain\Portfolio\Portfolio;
use App\Domain\Qualification\Qualification;
use App\Domain\User\User;
use App\Infrastructure\UI\HTTP\Web\v1\Model\Category\CategoryReadModel;
use App\Infrastructure\UI\HTTP\Web\v1\Model\Comment\CommentReadModel;
use App\Infrastructure\UI\HTTP\Web\v1\Model\Experience\ExperienceReadModel;
use App\Infrastructure\UI\HTTP\Web\v1\Model\Job\JobReadModel;
use App\Infrastructure\UI\HTTP\Web\v1\Model\Portfolio\PortfolioReadModel;
use App\Infrastructure\UI\HTTP\Web\v1\Model\Qualification\QualificationReadModel;
use App\Infrastructure\UI\HTTP\Web\v1\Model\User\UserReadModel;
use Undabot\SymfonyJsonApi\Http\Service\Responder\AbstractResponder;

class ResourceResponder extends AbstractResponder
{
    /**
     * {@inheritdoc}
     */
    protected function getMap(): array
    {
        return [
            User::class => [UserReadModel::class, 'fromEntity'],
            Portfolio::class => [PortfolioReadModel::class, 'fromEntity'],
            Category::class => [CategoryReadModel::class, 'fromEntity'],
            Qualification::class => [QualificationReadModel::class, 'fromEntity'],
            Experience::class => [ExperienceReadModel::class, 'fromEntity'],
            Job::class => [JobReadModel::class, 'fromEntity'],
            Comment::class => [CommentReadModel::class, 'fromEntity'],
        ];
    }
}
