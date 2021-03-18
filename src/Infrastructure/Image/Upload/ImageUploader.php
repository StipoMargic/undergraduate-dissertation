<?php

declare(strict_types = 1);

namespace App\Infrastructure\Image\Upload;


use App\Application\Image\ImageConverter\ImageUploaderInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\String\Slugger\SluggerInterface;

class ImageUploader implements ImageUploaderInterface
{
    private string $targetDirectory;
    private SluggerInterface $slugger;

    public function __construct(string $targetDirectory, SluggerInterface $slugger)
    {
        $this->targetDirectory = $targetDirectory;
        $this->slugger = $slugger;
    }

    public function convert(string $base4Image): File
    {
        $base4ExplodedArray = explode(",", $base4Image);
        $image = $base4ExplodedArray[1];
        $extension = explode('/', explode(':', explode(';', $base4ExplodedArray[0])[0])[1])[1];

        $fileSystem = new Filesystem();
        $content = base64_decode($image);

        $fileSystem->dumpFile($this->targetDirectory . "file" . $extension, $content);

        return new File($this->targetDirectory . "file" . $extension);
    }

    public function upload(File $file, string $path): string
    {
        $originalFileName = pathinfo($file->getFilename(), PATHINFO_FILENAME);
        $safeFileName = $this->slugger->slug($originalFileName);

        $fileName = $safeFileName . '-' . uniqid() . '.' . $file->guessExtension();

        $file->move($this->targetDirectory . $path, $fileName);

        return $fileName;
    }
}