// Global imports -
import * as THREE from 'three';

// Local imports -
// Components
import Renderer from './components/renderer';
import Camera from './components/camera';
import Light from './components/light';
import Controls from './components/controls';

// Model
import Model from './model/model';

// Managers
import Interaction from './managers/interaction';

// data
import Config from './../data/config';
// -- End of imports

// This class instantiates and ties all of the components together, starts the loading process and renders the main loop
export default class Main {
    constructor(container) {
        // Set container property to container element
        this.container = container;

        // Start Three clock
        this.clock = new THREE.Clock();

        // Main scene creation
        this.scene = new THREE.Scene();

        // Get Device Pixel Ratio first for retina
        if (window.devicePixelRatio) {
            Config.dpr = window.devicePixelRatio;
            console.log("Device Pixel Ratio = ", Config.dpr);
        }

        // Main renderer constructor
        this.renderer = new Renderer(this.scene, container);

        // Components instantiations
        this.camera = new Camera(this.renderer.threeRenderer);
        this.controls = new Controls(this.camera.threeCamera, container);
        this.light = new Light(this.scene);

        // Create and place lights in scene
        this.light.placeAll();

        // Add the grid as a virtual floor
        this.gridHelper = new THREE.GridHelper(Config.grid.size, Config.grid.divisions,
            Config.grid.colorCenterLine, Config.grid.colorGrid);
        this.scene.add(this.gridHelper);

        this.manager = new THREE.LoadingManager();

        // Load the model
        this.model = new Model(this.scene, this.manager);
        this.model.load();

        // onProgress callback
        this.manager.onProgress = (item, loaded, total) => {
            console.log(`${item}: ${loaded} ${total}`);
        };

        // All loaders done now
        this.manager.onLoad = () => {
            // Set up interaction manager with the app now that the model is finished loading
            new Interaction(this.renderer.threeRenderer, this.scene, this.camera.threeCamera, this.controls.threeControls);

            // Everything is now fully loaded
            Config.isLoaded = true;
            this.container.querySelector('#loading').style.display = 'none';
        };

        this.delay = 0;
        // Start render which does not wait for model fully loaded
        this.render();
    }

    render() {
        // Call render function and pass in created scene and camera
        this.renderer.render(this.scene, this.camera.threeCamera);

        // Delta time is sometimes needed for certain updates
        const delta = this.clock.getDelta();
        this.delay += delta;
        if(this.delay > 0.2) {
            this.delay = 0;
            this.model.changeColors();
        }

        // Call any vendor or module frame updates here
        this.controls.threeControls.update();

        // RAF
        requestAnimationFrame(this.render.bind(this)); // Bind the main class instead of window object
    }
}
