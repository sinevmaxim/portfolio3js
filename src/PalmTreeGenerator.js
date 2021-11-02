import PalmTree from "./PalmTree";
import * as THREE from "three";
import * as CANNON from "cannon";

export default class PalmTreeGenerator {
    constructor(args) {
        this.physics = args.physics;
        this.files = args.files;
        this.sound = args.sound;
        this.ammount = args.ammount;

        this.object = new THREE.Group();
        this.generate();
    }

    generate() {
        this.trees = [];
        this.geometry = new THREE.BoxBufferGeometry(2, 2, 20);
        this.material = new THREE.MeshStandardMaterial();
        this.shape = new CANNON.Box(new CANNON.Vec3(1, 1, 10));

        for (let i = 0; i < this.ammount; i++) {
            let positionY = 10 + i * 10;

            let tree = new PalmTree({
                physics: this.physics,
                files: this.files,
                positionX: -20,
                positionY: positionY,
                geometry: this.geometry,
                material: this.material,
                shape: this.shape,
                sound: this.sound,
            });

            this.trees.push(tree.object);
            this.object.add(tree.object);
        }
    }
}
