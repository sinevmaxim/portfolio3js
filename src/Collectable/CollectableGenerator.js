import * as THREE from "three";
import * as CANNON from "cannon";
import Collectable from "./Collectable";

export default class CollectableGenerator {
    constructor(args) {
        this.time = args.time;
        this.sound = args.sound;
        this.physics = args.physics;
        this.files = args.files;
        this.car = args.car;

        this.object = new THREE.Group();

        this.initShape();
        this.generate();
    }
    initShape() {
        this.shape = new CANNON.Box(new CANNON.Vec3(2, 2, 2));
    }

    generate() {
        this.collectable = new Collectable({
            time: this.time,
            physics: this.physics,
            files: this.files,
            position: { x: -20, y: 0, z: 3 },
            car:this.car
        });

        this.object.add(this.collectable.object);
    }
}
