import * as THREE from "three";

export default class Collectable {
    constructor(args) {
        this.physics = args.physics;
        this.files = args.files;
        this.position = args.position;

        this.object = new THREE.Object3D();

        initPhysicalObject();
        initModel();
        initPosition();
        initCollision();
        update();
    }
    initPhysicalObject() {}

    initModel() {}

    initPosition() {}

    initCollision() {}

    update() {}

    collect() {}
}
