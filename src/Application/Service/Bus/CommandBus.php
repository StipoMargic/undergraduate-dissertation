<?php

declare(strict_types=1);

namespace App\Application\Service\Bus;

use App\Application\Command\CommandInterface;

interface CommandBus
{
    public function handleCommand(CommandInterface $command): void;
}
