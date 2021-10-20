import * as THREE from "three";
import * as CANNON from "cannon";
import TimeEventEmmiter from "./Events/TimeEventEmmiter";
import Car from "./Car";
import Physics from "./Physics";
import Camera from "./Camera";
import Light from "./Light";
import Sound from "./Sound";
import AreaGenerator from "./Areas/AreaGenerator";
import FileEventEmmiter from "./Events/FileEventEmmiter";
import Effects from "./Effects";
import HouseGenerator from "./HouseGenerator";
import PalmTreeGenerator from "./PalmTreeGenerator";
import PalmTree from "./PalmTree";

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

        this.files.on("ready", () => {
            this.initRenderer();
            this.initLight();
            this.initPhysics();
            this.initCar();
            this.initCamera();
            this.initAreas();
            // this.initEffects();
            this.initRender();
            this.initHouses();
            this.initPalmTrees();
            // this.initDebug();
        });
    }

    initRenderer() {
        // Scene
        this.scene = new THREE.Scene();

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
        });
        // this.renderer.setClearColor(0x414141, 1)
        // this.renderer.setClearColor(0x000000, 1);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        // this.renderer.setPixelRatio(2);
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        // this.renderer.physicallyCorrectLights = true;
        // this.renderer.shadowMap.enabled = true;
        // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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

    initPhysics() {
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
        this.car = new Car({
            time: this.time,
            physics: this.physics,
            files: this.files,
            sound: this.sound,
            light: this.light,
        });
        this.scene.add(this.car.object);
    }

    initCamera() {
        this.camera = new Camera({
            time: this.time,
            renderer: this.renderer,
            sizes: this.sizes,
            car: this.car,
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
        });
    }

    initEffects() {
        // this.effects = new Effects({
        //     time: this.time,
        //     camera: this.camera,
        //     sizes: this.sizes,
        //     renderer: this.renderer,
        //     scene: this.scene,
        // });
    }

    initAreas() {
        this.areaGenerator = new AreaGenerator({
            time: this.time,
            files: this.files,
            car: this.car,
        });

        this.scene.add(this.areaGenerator.object);
    }

    initHouses() {
        this.houseGenerator = new HouseGenerator({
            physics: this.physics,
            files: this.files,
            sound: this.sound,
            car: this.car,
            // time: this.time,
            ammount: 5,
        });

        this.scene.add(this.houseGenerator.object);
    }

    initPalmTrees() {
        this.palmTreeGenerator = new PalmTreeGenerator({
            physics: this.physics,
            files: this.files,
            ammount: 10,
        });

        this.scene.add(this.palmTreeGenerator.object);
    }

    // initDebug() {
    //     this.cannonDebugRenderer = new THREE.CannonDebugRenderer(
    //         this.scene,
    //         this.physics.world
    //     );

    //     this.time.on("tick", () => {
    //         this.cannonDebugRenderer.update();
    //     });
    // }
}
