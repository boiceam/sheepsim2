import * as THREE from 'three';

import Keyboard from '../../utils/keyboard';
import Helpers from '../../utils/helpers';
import Config from '../../data/config';

// Manages all input interactions
export default class Interaction {
    constructor(renderer, scene, model, camera, controls) {
    // Properties
        this.renderer = renderer;
        this.scene = scene;
        this.model = model;
        this.camera = camera;
        this.controls = controls;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.timeout = null;

        // Instantiate keyboard helper
        this.keyboard = new Keyboard();

        // Listeners
        // Mouse events
        this.renderer.domElement.addEventListener('mousemove', (event) => Helpers.throttle(this.onMouseMove(event), 250), false);
        this.renderer.domElement.addEventListener('mouseleave', (event) => this.onMouseLeave(event), false);
        this.renderer.domElement.addEventListener('mouseover', (event) => this.onMouseOver(event), false);

        // Keyboard events
        this.keyboard.domElement.addEventListener('keydown', (event) => {
            // Only once
            if(event.repeat) {
                return;
            }

            if(this.keyboard.eventMatches(event, 'escape')) {
                console.log('Escape pressed');
            }
        });
    }

    onMouseOver(event) {
        event.preventDefault();

        Config.isMouseOver = true;
    }

    onMouseLeave(event) {
        event.preventDefault();

        Config.isMouseOver = false;
    }

    onMouseMove(event) {
        event.preventDefault();
        this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        clearTimeout(this.timeout);

        this.timeout = setTimeout(function() {
            Config.isMouseMoving = false;
        }, 200);

        Config.isMouseMoving = true;
    }

    checkRaycaster() {
        // update the picking ray with the camera and mouse position
        this.raycaster.setFromCamera( this.mouse, this.camera );

        // calculate objects intersecting the picking ray
        let intersects = this.raycaster.intersectObjects( this.model.obj.children );

        if(intersects.length > 0){
            return intersects[0];
        }
    }
}
