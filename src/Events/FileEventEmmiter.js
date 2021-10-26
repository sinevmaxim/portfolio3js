import EventEmmiter from "./EventEmmiter";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

export default class FileEventEmmiter extends EventEmmiter {
    constructor() {
        super();
        this.loaders = {};
        this.items = {};
        this.animations = {};
        this.audioListener = new THREE.AudioListener();

        this.manager = new THREE.LoadingManager();
        this.manager.onLoad = () => this.ready();
        this.manager.onProgress = (url, loaded, total) =>
            this.progress(url, loaded, total);

        this.loaders.gltfLoader = new GLTFLoader(this.manager);
        this.loaders.textureLoader = new THREE.TextureLoader(this.manager);
        this.loaders.audioLoader = new THREE.AudioLoader(this.manager);

        this.load();
    }

    load() {
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
            areaFrame: {
                url: "/textures/areaFrame.png",
                type: "texture",
            },
            clubMusic: {
                url: "/audio/music/music.mp3",
                type: "audio",
            },
            enterKeyLogo: {
                url: "/textures/logos/enter_key.png",
                type: "texture",
            },
            photoshootLogo: {
                url: "/textures/logos/photoshoot_logo.png",
                type: "texture",
            },
        };

        Object.entries(this.toLoad).forEach(([name, data]) => {
            if (data.type == "model") {
                this.loaders.gltfLoader.load(data.url, (gltf) => {
                    this.items[name] = gltf.scene;
                    if (gltf.animations.length != 0) {
                        this.animations[name] = gltf.animations;
                    }
                    return;
                });
            }

            if (data.type == "texture") {
                this.items[name] = this.loaders.textureLoader.load(data.url);
                return;
            }

            if (data.type == "audio") {
                this.loaders.audioLoader.load(data.url, (buffer) => {
                    this.items[name] = new THREE.PositionalAudio(
                        this.audioListener
                    );
                    this.items[name].setBuffer(buffer);
                    this.emit(`${name}_ready`);
                    // this.items[name].setRefDistance(20);
                    // this.items[name].setVolume(0.5);
                    // this.items[name].play();
                    return;
                });
            }
        });
    }

    ready() {
        this.emit("ready");
    }

    progress(url, loaded, total) {
        console.info(`Files - ${(loaded / total) * 100} % items loaded`);
    }
}
