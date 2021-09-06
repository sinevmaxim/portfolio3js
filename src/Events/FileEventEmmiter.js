import EventEmmiter from "./EventEmmiter";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

export default class FileEventEmmiter extends EventEmmiter {
    constructor() {
        super();
        this.loaders = {};
        this.items = {};

        this.manager = new THREE.LoadingManager();
        this.manager.onLoad = () => this.ready();
        this.manager.onProgress = (url, loaded, total) =>
            this.progress(url, loaded, total);

        this.load();
    }

    load() {
        console.info("Files - Loading");

        this.toLoad = {
            carChassis: "/models/car/chassis.glb",
            carWheel: "/models/car/wheel.glb",
        };

        this.loaders.gltfLoader = new GLTFLoader(this.manager);

        Object.entries(this.toLoad).forEach(([name, url]) => {
            this.loaders.gltfLoader.load(url, (gltf) => {
                this.items[name] = gltf.scene.children[0];
            });
        });
        console.log(this.items);
        console.info("Files - Loaded");
    }

    ready() {
        this.emit("ready");
        console.info("Files - Every item loaded");
    }

    progress(url, loaded, total) {
        console.info(`Files - ${(loaded / total) * 100} % items loaded`);
    }
}
