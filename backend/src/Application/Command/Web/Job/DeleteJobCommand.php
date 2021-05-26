<?php
declare(strict_types = 1);

namespace App\Application\Command\Web\Job;


use App\Application\Command\CommandInterface;

class DeleteJobCommand implements CommandInterface
{
    public function __construct(public string $id)
    {
    }
}