<?php


namespace App\Application\Portfolio\PortfolioRepository;


use App\Domain\Portfolio\Portfolio;

interface PortfolioWriteRepository
{
    public function save(Portfolio $portfolio): void;
}