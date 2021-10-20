import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "three";

export default class Camera {
    constructor(args) {
        this.time = args.time;
        this.renderer = args.renderer;
        this.sizes = args.sizes;
        this.car = args.car;

        this.object = new THREE.Object3D();
        // this.orbit = true;

        this.initCamera();
        // this.initControls();
    }

    initCamera() {
        this.cameraInstance = new THREE.PerspectiveCamera(
            40,
            this.sizes.width / this.sizes.height,
            1,
            1000
        );

        this.offsetX = 0;
        this.offsetY = 34;
        this.offsetZ = 21;

        this.cameraInstance.position.set(20, 20, 20);
        this.cameraInstance.lookAt(new THREE.Vector3());

        this.object.add(this.cameraInstance);

        window.addEventListener("resize", () => {
            this.cameraInstance.aspect = this.sizes.width / this.sizes.height;
            this.cameraInstance.updateProjectionMatrix();
        });

        this.time.on("tick", () => {
            this.cameraInstance.position.set(
                this.car.chassis.body.position.x - this.offsetX,
                this.car.chassis.body.position.y - this.offsetY,
                this.car.chassis.body.position.z + this.offsetZ
            );
            this.cameraInstance.lookAt(this.car.hitbox.chassis.position);
        });
    }

    // initControls() {
    //     this.controls = new OrbitControls(
    //         this.cameraInstance,
    //         this.renderer.domElement
    //     );
    //     this.controls.enableDamping = true;

    //     this.time.on("tick", () => {
    //         this.controls.update();
    //     });
    // }
}
