<?php


namespace App\Application\Command\Web\Comment;


use App\Application\Command\CommandInterface;

class CreateCommentCommand implements CommandInterface
{
    public function __construct(
        public string $id,
        public ?string $portfolio,
        public ?string $job,
        public string $user,
        public int $score,
        public string $message
    ) {
    }
}