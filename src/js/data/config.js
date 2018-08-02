// This object contains the state of the app
export default {
    isDev: false,
    isLoaded: false,
    isTweening: false,
    isRotating: false,
    isMouseMoving: false,
    isMouseOver: false,
    maxAnisotropy: 1,
    dpr: 1,
    duration: 500,
    backend:{
        url: "ws://localhost:9999/ws"
    },
    model: {
        path: './assets/models/sheep.json',
        scale: 0.6,
        offsetX: 20,
        offsetY: 0,
        offsetZ: -270,
    },
    grid: {
        size: 1200,
        divisions: 60,
        colorCenterLine: 0xFF4444,
        colorGrid: 0x404040
    },
    camera: {
        near: 0.1,
        far: 10000,
        fov: 45,
        aspect: 1,
        posX: 0,
        posY: 175.0,
        posZ: 500.0
    },
    controls: {
        autoRotate: false,
        autoRotateSpeed: -0.5,
        rotateSpeed: 0.5,
        zoomSpeed: 0.8,
        minDistance: 200,
        maxDistance: 1000,
        minPolarAngle: Math.PI / 5,
        maxPolarAngle: Math.PI / 2,
        minAzimuthAngle: -Infinity,
        maxAzimuthAngle: Infinity,
        enableDamping: true,
        dampingFactor: 0.5,
        enableZoom: true,
        target: {
            x: 0,
            y: 0,
            z: 0
        }
    },
    lights: [
        {
            name: "ambient",
            type: "ambient",
            enabled: true,
            color: 0x404040
        }, {
            name: "directional1",
            type: "directional",
            enabled: true,
            color: 0xC0C090,
            intensity: 0.5,
            x: -100,
            y: -50,
            z: 100
        }, {
            name: "directional2",
            type: "directional",
            enabled: true,
            color: 0xC0C090,
            intensity: 0.5,
            x: 100,
            y: 50,
            z: -100
        }, {
            name: "point",
            type: "point",
            enabled: false,
            color: 0xffffff,
            intensity: 0.34,
            distance: 115,
            x: 0,
            y: 0,
            z: 0
        }, {
            name: "hemi",
            type: "hemi",
            enabled: false,
            color: 0xc8c8c8,
            groundColor: 0xffffff,
            intensity: 0.55,
            x: 0,
            y: 0,
            z: 0
        }
    ]
};
