import * as THREE from 'three';

import Helpers from '../../utils/helpers';
import Config from '../../data/config';

// Loads in a single object from the config file
export default class Model {
    constructor(scene, manager) {
        this.scene = scene;

        // Manager is passed in to loader to determine when loading done in main
        this.loader = new THREE.ObjectLoader(manager);
        this.obj = null;
    }

    load() {
        // Load model with OBJLoader
        this.loader.load(Config.model.path, (obj) => {
            let box = new THREE.Box3();
            box.setFromObject(obj);
            let counter = 0;
            console.log("Model has ", obj.children.length, " children");
            obj.traverse(child => {
                //console.log(child.name);
                if (child instanceof THREE.Mesh) {
                    child.material.side = THREE.DoubleSide;
                    if (counter === 0) {
                        child.material.color.setHex(0xFF0000);
                        counter = 1;
                    } else if (counter === 1) {
                        child.material.color.setHex(0x00FF00);
                        counter = 2;
                    } else if (counter === 2) {
                        child.material.color.setHex(0x0000FF);
                        counter = 0;
                    }
                }
            });

            // Set prop to obj so it can be accessed from outside the class
            this.obj = obj;
            this.current = 0;

            obj.translateX(Config.model.offsetX);
            obj.translateY(Config.model.offsetY);
            obj.translateZ(Config.model.offsetZ);
            obj.scale.multiplyScalar(Config.model.scale);
            this.scene.add(obj);
        }, Helpers.logProgress(), Helpers.logError());
    }

    changeColors() {
        let counter = 0;
        if (this.obj === null) {
            return;
        }
        this.obj.traverse(child => {
            if (child instanceof THREE.Mesh) {
                if (counter === this.current) {
                    child.material.color.setHex(0xFF0000);
                    //console.log(child.name);
                } else {
                    child.material.color.setHex(0x00FF00);
                }
                counter++;
                if (counter === this.obj.children.length) {
                    this.current++;
                }
            }
        });
    }
}
