import * as THREE from 'three';

import Config from '../../data/config';

// Class that creates and updates the main camera
export default class Camera {
    constructor(renderer) {
        const width = renderer.domElement.width;
        const height = renderer.domElement.height;

        // Create and position a Perspective Camera
        const aspectRatio = width / height;
        this.threeCamera = new THREE.PerspectiveCamera(Config.camera.fov, aspectRatio, Config.camera.near, Config.camera.far);
        this.threeCamera.position.set(Config.camera.posX, Config.camera.posY, Config.camera.posZ);

        // Initial sizing
        this.updateSize();

        // Listeners
        window.addEventListener('resize', () => this.updateSize(), false);
    }

    updateSize() {
        // Always call updateProjectionMatrix on camera change
        this.threeCamera.updateProjectionMatrix();
    }
}
