<?php


namespace App\Infrastructure\UI\HTTP\Web\v1\Model\Contact;

use Undabot\SymfonyJsonApi\Model\ApiModel;
use Undabot\SymfonyJsonApi\Model\Resource\Annotation\Attribute;
use Undabot\SymfonyJsonApi\Service\Resource\Validation\Constraint\ResourceType;

/** @ResourceType(type="contact") */
class ContactWriteModel implements ApiModel
{
    public string $id;

    /** @Attribute */
    public string $name;

    /** @Attribute */
    public string $email;

    /** @Attribute */
    public ?string $company;

    /** @Attribute */
    public ?string $phone;

    /** @Attribute */
    public string $message;

    public function __construct(
        string $id,
        string $name,
        string $email,
        ?string $company,
        ?string $phone,
        string $message
    ) {
        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
        $this->company = $company;
        $this->phone = $phone;
        $this->message = $message;
    }


}
