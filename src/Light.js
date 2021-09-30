import * as THREE from "three";

export default class Light {
    constructor() {
        this.object = new THREE.Object3D();
        this.light = {};
        this.helper = {};

        this.initLights();
    }

    initLights() {
        console.info("Light - Initializing");
        this.light.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.light.directionalLight = new THREE.DirectionalLight(0xfd00e1, 4);
        this.light.pointLight = new THREE.PointLight(0xffffff, 10, 20);
        this.light.directionalLight.position.set(16, 106, 30);
        this.light.pointLight.position.set(1, 2, 3);
        this.object.add(
            this.light.ambientLight,
            this.light.directionalLight,
            this.light.pointLight
        );

        // this.light.directionalLight.shadow.mapSize.width = 512;
        // this.light.directionalLight.shadow.mapSize.height = 512;
        // this.light.directionalLight.shadow.camera.near = 23;
        // this.light.directionalLight.shadow.camera.far = 1500;
        // this.light.directionalLight.shadow.mapSize.height = 100;
        // this.light.directionalLight.castShadow = true;

        // this.helper.dlShadow = new THREE.CameraHelper(
        //     this.light.directionalLight.shadow.camera
        // );
        // this.object.add(this.helper.dlShadow);

        // console.log(this.light.directionalLight.shadow.camera.position);

        // this.helper.directionalLight = new THREE.DirectionalLightHelper(
        //     this.light.directionalLight,
        //     5
        // );

        // this.object.add(this.helper.directionalLight);
    }
}
