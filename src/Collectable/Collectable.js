import * as THREE from "three";
import * as CANNON from "cannon";

export default class Collectable {
    constructor(args) {
        this.time = args.time;
        this.physics = args.physics;
        this.files = args.files;
        this.position = args.position;
        this.car = args.car;

        this.object = new THREE.Object3D();

        this.initModel();
        this.initPosition();
        this.initCollision();
        this.update();
    }

    initModel() {
        this.model = new THREE.Mesh(
            new THREE.SphereBufferGeometry(1, 32, 32),
            new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        );

        this.object.add(this.model);
    }

    initPosition() {
        this.model.position.set(
            this.position.x,
            this.position.y,
            this.position.z
        );
    }

    initCollision() {
        const collision = () => {
            if (
                this.car.position.x > this.model.position.x - 2 &&
                this.car.position.x < this.model.position.x + 2 &&
                this.car.position.y > this.model.position.y - 2 &&
                this.car.position.y < this.model.position.y + 2
            ) {
                this.object.remove(this.model);
                this.collect();
            }
        };
        this.time.on("tick", collision);
    }

    update() {
        this.time.on("tick", () => {
            this.model.rotation.y += this.time.delta / 1000;
            this.model.position.z = 4 + Math.sin(this.time.elapsed * 0.001) / 3;
        });
    }

    collect() {}
}
