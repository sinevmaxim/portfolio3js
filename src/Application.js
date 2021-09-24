import * as THREE from "three";
import TimeEventEmmiter from "./Events/TimeEventEmmiter";
import Car from "./Car";
import Physics from "./Physics";
import Camera from "./Camera";
import Light from "./Light";
import Sound from "./Sound";
// import File from "./File";
import FileEventEmmiter from "./Events/FileEventEmmiter";
import * as dat from "dat.gui";

export default class Application {
    constructor(args) {
        this.canvas = args.canvas;

        this.time = new TimeEventEmmiter();
        this.files = new FileEventEmmiter();
        this.sizes = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
        this.debug = new dat.GUI();
        this.sound = new Sound();

        this.files.on("ready", () => {
            // this.initFiles();
            this.initRenderer();
            this.initLight();
            this.initCamera();
            this.initPhysics();
            this.initCar();
            // this.initEffects();
            this.initRender();
        });
    }

    initRenderer() {
        console.info("Application - Initialazing Renderer");

        // Scene
        this.scene = new THREE.Scene();

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
        });
        // this.renderer.setClearColor(0x414141, 1)
        this.renderer.setClearColor(0x000000, 1);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setPixelRatio(2);
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.physicallyCorrectLights = true;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        // this.renderer.gammaFactor = 2.2;
        // this.renderer.gammaOutPut = true;
        // this.renderer.autoClear = false;

        // Resize event
        window.addEventListener("resize", () => {
            this.sizes.height = window.innerHeight;
            this.sizes.width = window.innerWidth;
            this.renderer.setSize(this.sizes.width, this.sizes.height);
        });
    }

    // initFiles() {
    //     console.info("Application - Initializing Files");

    //     this.files = new File();
    // }

    initPhysics() {
        console.info("Application - Initializing Physics");

        this.physics = new Physics({
            time: this.time,
            camera: this.camera,
            debug: this.debug,
            files: this.files,
            light: this.light,
        });
        this.scene.add(this.physics.object);
    }

    initCar() {
        console.info("Application - Initializing Car");

        this.car = new Car({
            time: this.time,
            physics: this.physics,
            files: this.files,
            sound: this.sound,
        });
        this.scene.add(this.car.object);
    }

    // initEffects() {
    //     let renderTarget = null;

    //     if (renderer.getPixelRatio() === 1 && renderer.capabilities.isWebGL2) {
    //         renderTarget = new THREE.WebGLMultisampleRenderTarget(800, 600, {
    //             minFilter: THREE.LinearFilter,
    //             magFilter: THREE.LinearFilter,
    //             format: THREE.RGBAFormat,
    //             encoding: THREE.sRGBEncoding,
    //         });
    //     } else {
    //         renderTarget = new THREE.WebGLRenderTarget(800, 600, {
    //             minFilter: THREE.LinearFilter,
    //             magFilter: THREE.LinearFilter,
    //             format: THREE.RGBAFormat,
    //             encoding: THREE.sRGBEncoding,
    //         });
    //     }
    //     //Composer
    //     this.effectComposer = new EffectComposer(this.renderer, renderTarget);

    //     this.effectComposer.setSize(sizes.width, sizes.height);
    //     this.effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    //     //Passes
    //     const renderPass = new RenderPass(this.scene, this.camera);
    //     this.effectComposer.addPass(renderPass);
    // }

    initCamera() {
        console.info("Application - Initializing Camera");

        this.camera = new Camera({
            time: this.time,
            renderer: this.renderer,
            sizes: this.sizes,
        });
        this.scene.add(this.camera.object);
    }

    initLight() {
        this.light = new Light();
        this.scene.add(this.light.object);
    }

    initRender() {
        console.info("Application - Initialazing Render");

        this.time.on("tick", () => {
            this.renderer.render(this.scene, this.camera.cameraInstance);
        });
    }
}
