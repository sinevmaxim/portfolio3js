import * as THREE from "three";
import * as CANNON from "cannon";

export default class PalmTree {
    constructor(args) {
        this.physics = args.physics;
        this.files = args.files;
        this.positionX = args.positionX;
        this.positionY = args.positionY;
        this.geometry = args.geometry;
        this.material = args.material;
        this.shape = args.shape;

        this.object = new THREE.Object3D();

        this.initModel();
        this.initPhysicsObject();
    }

    initModel() {}
    initPhysicsObject() {
        this.body = new CANNON.Body({ mass: 0, shape: this.shape });
        this.hitbox = new THREE.Mesh(this.geometry, this.material);

        this.body.position.set(this.positionX, this.positionY, 0);
        this.hitbox.position.copy(this.body.position);

        this.physics.world.add(this.body);
        this.object.add(this.hitbox);
    }
}
