<?php


namespace App\Application\Service\CommandHandler\Web\Contact;


use App\Application\Command\Web\Contact\SendContactMailCommand;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;

final class SendContactMailCommandHandler
{
    public function __construct(public MailerInterface $mailer)
    {
    }

    public function __invoke(SendContactMailCommand $command): void
    {
        $email = (new Email())
            ->to(new Address('stipo@liberato.io', $command->name))
            ->from($command->email)
            ->text($command->message . $command->company . $command->phone);

        $this->mailer->send($email);
    }
}