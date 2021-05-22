<?php
declare(strict_types = 1);

namespace App\Application\Command\Web\Contact;


use App\Application\Command\CommandInterface;

class SendContactMailCommand implements CommandInterface
{
    public function __construct(
        public string $id,
        public string $name,
        public string $email,
        public ?string $company,
        public ?string $phone,
        public string $message
    ) {
    }
}