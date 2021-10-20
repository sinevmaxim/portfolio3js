import * as THREE from "three";

export default class Light {
    constructor() {
        this.object = new THREE.Object3D();
        this.light = {};
        this.helper = {};

        this.initLights();
    }

    initLights() {
        this.light.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.light.directionalLight = new THREE.DirectionalLight(0xfd00e1, 1);
        this.light.directionalLight.position.set(16, 106, 30);

        this.light.rightSpotLight = new THREE.SpotLight(
            0xfdfadd,
            30,
            17,
            Math.PI * 0.1,
            0.1,
            2
        );
        this.light.leftSpotLight = new THREE.SpotLight(
            0xfdfadd,
            30,
            17,
            Math.PI * 0.1,
            0.1,
            2
        );

        this.helper.spotLightHelper = new THREE.SpotLightHelper(
            this.light.leftSpotLight,
            0.2
        );
        this.object.add(
            this.light.leftSpotLight,
            this.light.rightSpotLight,
            this.light.ambientLight,
            this.light.directionalLight
        );
    }
}
