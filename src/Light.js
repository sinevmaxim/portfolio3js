import * as THREE from "three";

export default class Light {
    constructor() {
        this.object = new THREE.Object3D();
        this.light = {};

        this.initLights();
    }

    initLights() {
        console.info("Light - Initializing");
        this.light.ambientLight = new THREE.AmbientLight(0xffffff, 1);
        this.object.add(this.light.ambientLight);
    }
}
