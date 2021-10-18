import House from "./House";
import * as THREE from "three";
import * as CANNON from "cannon";

export default class HouseGenerator {
    constructor(args) {
        this.physics = args.physics;
        this.files = args.files;
        this.ammount = args.ammount;

        this.size = 10;

        this.object = new THREE.Group();
        this.generate();
    }

    generate() {
        this.houses = [];
        this.geometry = new THREE.BoxBufferGeometry(
            this.size,
            this.size,
            this.size
        );
        this.material = new THREE.MeshStandardMaterial({ wireframe: true });
        this.shape = new CANNON.Box(
            new CANNON.Vec3(this.size, this.size, this.size)
        );

        for (let i = 0; i < this.ammount; i++) {
            let positionY = 10 + i * 5;

            let house = new House({
                physics: this.physics,
                files: this.files,
                positionX: 20,
                positionY: positionY,
                geometry: this.geometry,
                material: this.material,
                shape: this.shape,
            });

            this.houses.push(house.object);
            this.object.add(house.object);
        }
    }
}