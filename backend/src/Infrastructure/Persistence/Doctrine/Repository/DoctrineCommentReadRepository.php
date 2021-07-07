<?php


namespace App\Infrastructure\Persistence\Doctrine\Repository;


use App\Application\Comment\CommentRepository\CommentReadRepository;
use App\Domain\Comment\Comment;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use PHPUnit\Exception;
use Ramsey\Uuid\UuidInterface;

class DoctrineCommentReadRepository extends ServiceEntityRepository implements CommentReadRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Comment::class);
    }

    public function get(UuidInterface $id): ?Comment
    {
        try {
            /** @var Comment $entity */
            $entity = $this->find($id);
        } catch (Exception $exception) {
            throw new \Exception($exception->getMessage());
        }

        return $entity;
    }
}