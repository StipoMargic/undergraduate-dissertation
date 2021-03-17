<?php

declare(strict_types = 1);

namespace App\Infrastructure\UI\HTTP\Web\v1\ApiResponder;

use App\Domain\Bar\Bar;
use App\Domain\Test\Test;
use App\Domain\User\User;
use App\Infrastructure\UI\HTTP\Web\v1\Model\Bar\BarReadModel;
use App\Infrastructure\UI\HTTP\Web\v1\Model\Test\TestReadModel;
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
        ];
    }
}
