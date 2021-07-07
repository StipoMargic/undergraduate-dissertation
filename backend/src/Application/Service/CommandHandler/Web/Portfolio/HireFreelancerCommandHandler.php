<?php


namespace App\Application\Service\CommandHandler\Web\Portfolio;


use App\Application\Command\Web\Portfolio\HireFreelancerCommand;
use App\Application\Portfolio\PortfolioRepository\PortfolioReadRepository;
use App\Application\Portfolio\PortfolioRepository\PortfolioWriteRepository;
use App\Domain\Portfolio\Portfolio;
use Ramsey\Uuid\Uuid;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Message;

final class HireFreelancerCommandHandler
{
    public function __construct(
        public PortfolioReadRepository $portfolioReadRepository,
        public PortfolioWriteRepository $portfolioWriteRepository,
        public MailerInterface $mailer
    ) {
    }

    public function __invoke(HireFreelancerCommand $command): void
    {
        $portfolio = $this->portfolioReadRepository->get(Uuid::fromString($command->portfolioId));

        $portfolio->addHired($command->companyName);

        $this->portfolioWriteRepository->save($portfolio);
        $this->sendMail($portfolio, $command->subject, $command->message, $command->companyName);
    }

    private function sendMail(?Portfolio $portfolio, string $subject, string $message, string $companyName): void
    {
        $email = (new TemplatedEmail())
            ->from("info@liberato.io")
            ->to(new Address($portfolio->getUser()->getEmail(), $portfolio->getUser()->getUsername()))
            ->subject('Someone wants to hire you!')
            ->htmlTemplate('emails/hire-freelancer.html.twig')
            ->context([
                'subject' => $subject,
                'message' => $message,
                'companyName' => $companyName,
            ]);

        $this->mailer->send($email);
    }
}