import EventEmmiter from "./EventEmmiter";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

export default class FileEventEmmiter extends EventEmmiter {
    constructor() {
        super();
        this.loaders = {};
        this.items = {};
        this.animations = {};

        this.manager = new THREE.LoadingManager();
        this.manager.onLoad = () => this.ready();
        this.manager.onProgress = (url, loaded, total) =>
            this.progress(url, loaded, total);

        this.load();
    }

    load() {
        console.info("Files - Loading");

        this.toLoad = {
            carChassis: {
                url: "/models/car/countach.glb",
                type: "model",
            },
            // carWheel: { url: "/models/car/wheel.glb", type: "model" },
            floorTexture: { url: "/textures/floor/floor.png", type: "texture" },
            githubLogo: {
                url: "/textures/logos/github_logo.png",
                type: "texture",
            },
            linkedInLogo: {
                url: "/textures/logos/linkedin_logo.png",
                type: "texture",
            },
            carShadowTexture: {
                url: "/textures/car/carShadowTexture.jpg",
                type: "texture",
            },
        };

        this.loaders.gltfLoader = new GLTFLoader(this.manager);
        this.loaders.textureLoader = new THREE.TextureLoader(this.manager);

        Object.entries(this.toLoad).forEach(([name, data]) => {
            if (data.type == "model") {
                this.loaders.gltfLoader.load(data.url, (gltf) => {
                    this.items[name] = gltf.scene;
                    if (gltf.animations.length != 0) {
                        this.animations[name] = gltf.animations;
                    }
                });
            }

            if (data.type == "texture") {
                this.items[name] = this.loaders.textureLoader.load(data.url);
            }
        });
    }

    ready() {
        this.emit("ready");
        console.info("Files - Every item loaded");
    }

    progress(url, loaded, total) {
        console.info(`Files - ${(loaded / total) * 100} % items loaded`);
    }
}
