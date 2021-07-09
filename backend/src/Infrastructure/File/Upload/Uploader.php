<?php
declare(strict_types=1);

namespace App\Infrastructure\File\Upload;


use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\String\Slugger\SluggerInterface;

class Uploader
{
    public function __construct(public string $dir, public SluggerInterface $slugger)
    {
    }

    public function convert(string  $base64string): File
    {
        $base4ExplodedArray = explode(",",  $base64string);
        $file = $base4ExplodedArray[1];
        $extension = explode('/', explode(':', explode(';', $base4ExplodedArray[0])[0])[1])[1];

        $fileSystem = new Filesystem();
        $content = base64_decode($file);

        $fileSystem->dumpFile($this->dir . "file" . $extension, $content);

        return new File($this->dir . "file" . $extension);
    }

    public function upload(File $file, string $path): string
    {
        $originalFileName = pathinfo($file->getFilename(), PATHINFO_FILENAME);
        $safeFileName = $this->slugger->slug($originalFileName);

        $fileName = $safeFileName . '-' . uniqid() . '.' . $file->guessExtension();

        $file->move($this->dir . $path, $fileName);

        return $fileName;
    }
}