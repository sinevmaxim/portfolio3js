import * as THREE from "three";

export default class Environment {
    constructor(args) {
        this.car = args.car;
        this.time = args.time;

        this.object = new THREE.Object3D();

        this.initCube();
        this.updatePosition();
    }

    initCube() {
        this.geometry = new THREE.BoxBufferGeometry(200, 200, 200, 1, 1, 1);
        this.material = new THREE.MeshBasicMaterial({
            color: 0x12011f,
            side: THREE.BackSide,
        });
        this.cubeEnvironment = new THREE.Mesh(this.geometry, this.material);

        this.object.add(this.cubeEnvironment);
    }

    updatePosition() {
        this.time.on("tick", () => {
            this.cubeEnvironment.position.copy(
                this.car.models.chassis.position
            );
        });
    }
}
