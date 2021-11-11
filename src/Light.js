import * as THREE from "three";

export default class Light {
    constructor() {
        this.object = new THREE.Object3D();
        this.helper = {};

        this.initLights();
    }

    initLights() {
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
        this.directionalLight = new THREE.DirectionalLight(0xfd00e1, 1);
        this.directionalLight.position.set(0, 106, 30);

        this.directionalLight.shadow.mapSize.width = 256;
        this.directionalLight.shadow.mapSize.height = 256;
        this.directionalLight.shadow.camera.near = 15;
        this.directionalLight.shadow.camera.far = 200;
        this.directionalLight.shadow.camera.left = -150;
        this.directionalLight.shadow.camera.right = 150;
        this.directionalLight.shadow.camera.top = 150;
        this.directionalLight.shadow.camera.bottom = -150;

        this.rightSpotLight = new THREE.SpotLight(
            0xfdfadd,
            10,
            17,
            Math.PI * 0.17,
            0.1,
            2
        );

        this.leftSpotLight = new THREE.SpotLight(
            0xfdfadd,
            10,
            17,
            Math.PI * 0.17,
            0.1,
            2
        );

        // this.leftSpotLight.castShadow = true;
        // this.rightSpotLight.castShadow = true;
        this.directionalLight.castShadow = true;

        this.leftStopLight = new THREE.PointLight(0xff0000, 0, 1, 1);
        this.rightStopLight = new THREE.PointLight(0xff0000, 0, 1, 1);

        // this.helper.leftSpotLightHelper = new THREE.SpotLightHelper(
        //     this.leftSpotLight,
        //     0.2
        // );

        // this.helper.rightSpotLightHelper = new THREE.SpotLightHelper(
        //     this.rightSpotLight,
        //     0.2
        // );

        // this.helper.leftStopLightHelper = new THREE.PointLightHelper(
        //     this.leftStopLight,
        //     0.2
        // );

        // this.helper.rightStopLightHelper = new THREE.PointLightHelper(
        //     this.rightStopLight,
        //     0.2
        // );
        this.object.add(
            this.leftSpotLight,
            this.rightSpotLight,
            this.ambientLight,
            this.directionalLight
            // this.helper.leftSpotLightHelper,
            // this.helper.rightSpotLightHelper
            // this.helper.rightStopLightHelper,
            // this.helper.leftStopLightHelper
        );
    }
}
