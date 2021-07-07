<?php


namespace App\Infrastructure\Persistence\Doctrine\Repository;


use App\Application\Comment\CommentRepository\CommentWriteRepository;
use App\Domain\Comment\Comment;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class DoctrineCommentWriteRepository extends ServiceEntityRepository implements CommentWriteRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Comment::class);
    }

    public function save(Comment $comment): void
    {
        $this->_em->persist($comment);
        $this->_em->flush();
    }
}