import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

export default class File {
    constructor() {
        this.loaders = {};
        this.manager = new THREE.LoadingManager();

        this.load();
    }

    load() {
        this.models = {};
        this.models.car = {};
        this.loaders.gltfLoader = new GLTFLoader(this.manager);

        this.loaders.gltfLoader.load("/models/car/wheel.glb", (model) => {
            this.models.car.wheel =
                model.scene.children[0].children[0];
        });
        this.loaders.gltfLoader.load("/models/car/car.glb", (model) => {
            this.models.car.chassis = model.scene.children[0];
        });
    }
}
