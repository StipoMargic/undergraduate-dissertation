<?php


namespace App\Application\Job\JobRepository;


use App\Domain\Job\Job;

interface JobWriteRepository
{
    public function save(Job $job): void;
}