import * as THREE from 'three';

import Config from '../../data/config';

// Sets up and places all lights in scene
export default class Light {
    constructor(scene) {
        this.scene = scene;

        this.init();
    }

    init() {
        this.lights = {};
        Config.lights.forEach(light => {
            if (light.type === "ambient") {
                this.lights[light.name] = new THREE.AmbientLight(light.color);
                this.lights[light.name].visible = light.enabled;
            } else if (light.type === "point") {
                this.lights[light.name] = new THREE.PointLight(light.color, light.intensity, light.distance);
                this.lights[light.name].position.set(light.x, light.y, light.z);
                this.lights[light.name].visible = light.enabled;
            } else if (light.type === "directional") {
                this.lights[light.name] = new THREE.DirectionalLight(light.color, light.intensity);
                this.lights[light.name].position.set(light.x, light.y, light.z);
                this.lights[light.name].visible = light.enabled;
            } else if (light.type === "hemi") {
                this.lights[light.name] = new THREE.HemisphereLight(light.color, light.groundColor, light.intensity);
                this.lights[light.name].position.set(light.x, light.y, light.z);
                this.lights[light.name].visible = light.enabled;
            }
        });
    }

    placeAll() {
        for (let key in this.lights) {
            this.scene.add(this.lights[key]);
        }
    }
}
