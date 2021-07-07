<?php


namespace App\Application\Comment\CommentRepository;


use App\Domain\Comment\Comment;
use Ramsey\Uuid\UuidInterface;

interface CommentReadRepository
{
    public function get(UuidInterface $id): ?Comment;
}