<?php

// This file has been auto-generated by the Symfony Dependency Injection Component for internal use.

if (\class_exists(\ContainerSRhL0Yv\App_KernelDevDebugContainer::class, false)) {
    // no-op
} elseif (!include __DIR__.'/ContainerSRhL0Yv/App_KernelDevDebugContainer.php') {
    touch(__DIR__.'/ContainerSRhL0Yv.legacy');

    return;
}

if (!\class_exists(App_KernelDevDebugContainer::class, false)) {
    \class_alias(\ContainerSRhL0Yv\App_KernelDevDebugContainer::class, App_KernelDevDebugContainer::class, false);
}

return new \ContainerSRhL0Yv\App_KernelDevDebugContainer([
    'container.build_hash' => 'SRhL0Yv',
    'container.build_id' => 'a3a6f0a7',
    'container.build_time' => 1615990023,
], __DIR__.\DIRECTORY_SEPARATOR.'ContainerSRhL0Yv');
