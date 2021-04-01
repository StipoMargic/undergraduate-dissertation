<?php


namespace App\Application\Image\ImageConverter;


use Symfony\Component\HttpFoundation\File\File;

interface ImageUploaderInterface
{
    public function convert(string $base4Image): File;

    public function upload(File $file, string $path): string;
}