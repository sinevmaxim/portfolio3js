import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

export default class File {
    constructor() {
        this.files = {};
        this.loaders = {};
        this.manager = new THREE.LoadingManager();

        this.load();
    }

    load() {
        this.files.models = {};
        this.files.models.car = {};
        this.loaders.gltfLoader = new GLTFLoader(this.manager);

        this.loaders.gltfLoader.load("/models/car/wheel.glb", (model) => {
            this.files.models.car.wheel = model.scene;
            console.info("WHEEL LOADED");
        });
        this.loaders.gltfLoader.load("/models/car/car.glb", (model) => {
            this.files.models.car.chassis = model.scene.children[0];
            console.info("CAR LOADED");
        });

        console.log(this.files.models);
    }
}
