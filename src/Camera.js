import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "three";

export default class Camera {
    constructor(args) {
        this.time = args.time;
        this.renderer = args.renderer;
        this.sizes = args.sizes;

        this.object = new THREE.Object3D();

        this.initCamera();
        this.initControls();
    }

    initCamera() {
        console.info("Camera - Initializing Camera");

        this.cameraInstance = new THREE.PerspectiveCamera(
            40,
            this.sizes.width / this.sizes.height,
            1,
            80
        );
        this.cameraInstance.position.set(2, 2, 2);
        this.cameraInstance.lookAt(new THREE.Vector3());
        this.object.add(this.cameraInstance);

        window.addEventListener("resize", () => {
            this.cameraInstance.aspect = this.sizes.width / this.sizes.height;
            this.cameraInstance.updateProjectionMatrix();
        });
    }

    initControls() {
        console.info("Camera - Initializing Controls");

        this.controls = new OrbitControls(
            this.cameraInstance,
            this.renderer.domElement
        );
        this.controls.enableDamping = true;

        this.time.on("tick", () => {
            this.controls.update();
        });
    }
}
