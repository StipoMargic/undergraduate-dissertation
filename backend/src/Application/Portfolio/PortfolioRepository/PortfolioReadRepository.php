<?php


namespace App\Application\Portfolio\PortfolioRepository;


use App\Domain\Portfolio\Portfolio;
use Ramsey\Uuid\UuidInterface;

interface PortfolioReadRepository
{
    public function get(UuidInterface $id): ?Portfolio;
}