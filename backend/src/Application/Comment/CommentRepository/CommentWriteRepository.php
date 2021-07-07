<?php


namespace App\Application\Comment\CommentRepository;


use App\Domain\Comment\Comment;

interface CommentWriteRepository
{
    public function save(Comment $comment): void;
}