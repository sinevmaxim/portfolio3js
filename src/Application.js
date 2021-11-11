import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import TimeEventEmmiter from "./Events/TimeEventEmmiter";
import ClientCar from "./ClientCar";
import Physics from "./Physics";
import Camera from "./Camera";
import Light from "./Light";
import Sound from "./Sound";
import AreaGenerator from "./Areas/AreaGenerator";
import FileEventEmmiter from "./Events/FileEventEmmiter";
import Controls from "./Events/Controls";
import Effects from "./Effects";
import Environment from "./Environment";
import Landscape from "./Landscape";
import OtherCar from "./Car";

export default class Application {
    constructor(args) {
        this.canvas = args.canvas;

        this.time = new TimeEventEmmiter();
        this.files = new FileEventEmmiter();
        this.sizes = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
        this.sound = new Sound();

        this.initRenderer();
        this.initPhysics();
        this.initCamera();
        this.initLight();
        this.initEnvironment();
        // this.initRender();
        this.initEffects();
        this.initControls();
        this.files.on("ready", () => {
            this.initCar();
            this.initAreas();
            this.initLandscape();
            this.initOtherCar();
        });
    }

    initRenderer() {
        // Scene
        this.scene = new THREE.Scene();

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            // antialias: true,
            // alpha: true,
        });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        // this.renderer.shadowMap.enabled = true;
        // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.autoClear = false;
        // this.renderer.setClearColor(0x414141, 1)
        // this.renderer.setClearColor(0x000000, 1);
        // this.renderer.physicallyCorrectLights = true;
        // this.renderer.gammaFactor = 2.2;
        // this.renderer.gammaOutPut = true;

        // Resize event
        window.addEventListener("resize", () => {
            this.sizes.height = window.innerHeight;
            this.sizes.width = window.innerWidth;
            this.renderer.setSize(this.sizes.width, this.sizes.height);
        });
    }

    initControls() {
        this.controls = new Controls();
    }

    initPhysics() {
        this.physics = new Physics({
            time: this.time,
            camera: this.camera,
            debug: this.debug,
            files: this.files,
        });
        this.scene.add(this.physics.object);
    }

    initCar() {
        this.car = new ClientCar({
            time: this.time,
            physics: this.physics,
            files: this.files,
            sound: this.sound,
            light: this.light,
            controls: this.controls,
            startingPosition: { x: 0, y: 0, z: 1.6 },
        });
        this.scene.add(this.car.object);
    }

    initCamera() {
        this.camera = new Camera({
            time: this.time,
            renderer: this.renderer,
            sizes: this.sizes,
            physics: this.physics,
            files: this.files,
        });
        this.scene.add(this.camera.object);
    }

    initLight() {
        this.light = new Light();
        this.scene.add(this.light.object);
    }

    initRender() {
        this.time.on("tick", () => {
            this.renderer.render(this.scene, this.camera.cameraInstance);
            TWEEN.update();
        });
    }

    initEffects() {
        this.effects = new Effects({
            time: this.time,
            camera: this.camera,
            sizes: this.sizes,
            renderer: this.renderer,
            scene: this.scene,
        });
    }

    initAreas() {
        this.areaGenerator = new AreaGenerator({
            time: this.time,
            files: this.files,
            car: this.car,
            camera: this.camera,
        });

        this.scene.add(this.areaGenerator.object);
    }

    initLandscape() {
        this.landscape = new Landscape({
            physics: this.physics,
            files: this.files,
            sound: this.sound,
            car: this.car,
            time: this.time,
        });

        this.scene.add(this.landscape.object);
    }

    initOtherCar() {
        this.otherCar = new OtherCar({
            time: this.time,
            physics: this.physics,
            files: this.files,
            sound: this.sound,
            startingPosition: { x: -50, y: -20, z: 1.6 },
        });

        this.scene.add(this.otherCar.object);
    }

    initEnvironment() {
        this.environment = new Environment({
            physics: this.physics,
            time: this.time,
        });

        this.scene.add(this.environment.object);
    }
}
