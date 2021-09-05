import * as THREE from "three";
import TimeEventEmmiter from "./Events/TimeEventEmmiter";
import Car from "./Car";
import Physics from "./Physics";
import Camera from "./Camera";
import Light from "./Light";
import File from "./File";

export default class Application {
    constructor(args) {
        this.canvas = args.canvas;

        this.time = new TimeEventEmmiter();
        this.sizes = {
            width: window.innerWidth,
            height: window.innerHeight,
        };

        this.initFiles();
        this.initRenderer();
        this.initCamera();
        this.initPhysics();
        this.initCar();
        this.initLight();
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
        // this.renderer.gammaFactor = 2.2;
        // this.renderer.gammaOutPut = true;
        // this.renderer.autoClear = false;

        // Resize event
        window.addEventListener("resize", () => {
            this.renderer.setSize(this.sizes.width, this.sizes.height);
        });
    }

    initFiles() {
        this.files = new File();
    }

    initPhysics() {
        console.info("Application - Initializing Physics");

        this.physics = new Physics({
            time: this.time,
        });
        this.scene.add(this.physics.object);
    }

    initCar() {
        console.info("Application - Initializing Car");

        this.car = new Car({
            time: this.time,
            physics: this.physics,
            files: this.files,
        });
        this.scene.add(this.car.object);
    }

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
            this.renderer.render(this.scene, this.camera);
        });
    }
}
