<?php

declare(strict_types = 1);

namespace App\Application\User;


class VerificationToken
{
    private const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    public static function getRandomToken(int $length = 30): string
    {
        $token = "";
        $alphabetLength = strlen(self::ALPHABET);

        for ($i = 0; $i < $length; $i++) {
            $token .= self::ALPHABET[random_int(0, $alphabetLength - 1)];
        }

        return $token;
    }
}