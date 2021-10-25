import * as THREE from "three";

export default class Camera {
    constructor(args) {
        this.time = args.time;
        this.files = args.files;
        this.renderer = args.renderer;
        this.sizes = args.sizes;
        this.car = args.car;

        this.object = new THREE.Object3D();

        this.initCamera();
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

        this.cameraInstance.add(this.files.audioListener);
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
}
