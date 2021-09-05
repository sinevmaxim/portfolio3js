import * as THREE from "three";
import CANNON from "cannon";
import TimeEventEmmiter from "./Events/TimeEventEmmiter";

export default class Application {
    constructor() {
        this.time = new TimeEventEmmiter();
        this.sizes = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }

    initRenderer() {
        console.info("Application - Initialazing Renderer");

        // Scene
        this.scene = new THREE.Scene();

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.$canvas,
            alpha: true,
        });
        // this.renderer.setClearColor(0x414141, 1)
        this.renderer.setClearColor(0x000000, 1);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setPixelRatio(2);
        this.renderer.setSize(
            this.sizes.viewport.width,
            this.sizes.viewport.height
        );
        this.renderer.physicallyCorrectLights = true;
        // this.renderer.gammaFactor = 2.2;
        // this.renderer.gammaOutPut = true;
        // this.renderer.autoClear = false;

        // Resize event
        window.addEventListener("resize", () => {
            this.renderer.setSize(this.sizes.width, this.sizes.height);
        });
    }
}
