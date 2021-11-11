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

        this.loadingBar = document.querySelector(".loading-bar");
        this.startButton = document.querySelector(".start-button");

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
                url: "/models/car/countach3lowpoly.glb",
                type: "model",
            },
            // carWheel: { url: "/models/car/wheel.glb", type: "model" },
            floorTexture: {
                url: "/textures/floor/floor.png",
                type: "texture",
            },
            githubLogo: {
                url: "/textures/logos/github_logo.png",
                type: "texture",
            },
            linkedInLogo: {
                url: "/textures/logos/linkedin_logo.png",
                type: "texture",
            },
            twitterLogo: {
                url: "/textures/logos/twitter_logo.png",
                type: "texture",
            },
            sketchfabLogo: {
                url: "/textures/logos/sketchfab_logo.png",
                type: "texture",
            },
            carShadowTexture: {
                url: "/textures/car/carShadowTexture.jpg",
                type: "texture",
            },
            lightAlphaMap: {
                url: "/textures/car/lightAlphaMap2.png",
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
            clubLogo: {
                url: "/textures/logos/club_logo.png",
                type: "texture",
            },
            engineStartInfoText: {
                url: "/textures/info/engine_start_info.png",
                type: "texture",
            },
            popUpLightsInfoText: {
                url: "/textures/info/popup_lights_info.png",
                type: "texture",
            },
            movementInfoText: {
                url: "/textures/info/movement_info.png",
                type: "texture",
            },
            firstPalmTree: {
                url: "/models/PalmTreeLowPoly.glb",
                type: "model",
            },
            secondPalmTree: {
                url: "/models/PalmTreeLowPoly2.glb",
                type: "model",
            },
            star: {
                url: "/models/Star.glb",
                type: "model",
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
        this.loadingBar.style.visibility = `hidden`;
        this.startButton.style.visibility = `visible`;
        this.onStartButtonClick = () => {
            $(".neon-text").fadeOut();
            this.startButton.style.visibility = `hidden`;
            this.emit("ready");
        };
        this.startButton.addEventListener("click", this.onStartButtonClick);
    }

    progress(url, loaded, total) {
        // console.info(`Files - ${(loaded / total) * 100} % items loaded`);
        this.loadingBar.style.transform = `scaleX(${loaded / total})`;
    }
}
