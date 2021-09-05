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

        this.camera = new THREE.PerspectiveCamera(
            40,
            this.sizes.width / this.sizes.height,
            1,
            80
        );
        this.camera.position.set(2, 2, 2);
        this.camera.lookAt(new THREE.Vector3());
        this.object.add(this.camera);

        window.addEventListener("resize", () => {
            this.camera.aspect = this.sizes.width / this.sizes.height;
            this.camera.updateProjectionMatrix();
        });
    }

    initControls() {
        console.info("Camera - Initializing Controls");

        this.controls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );
        this.controls.enabled = false;
        this.controls.enableKeys = false;
        this.controls.zoomSpeed = 0.5;

        this.time.on("tick", () => {
            this.controls.update();
        });
    }
}
