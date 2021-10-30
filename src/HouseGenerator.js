import House from "./House";
import * as THREE from "three";
import * as CANNON from "cannon";
import Club from "./Club";

export default class HouseGenerator {
    constructor(args) {
        // this.time = args.time;
        this.sound = args.sound;
        this.physics = args.physics;
        this.files = args.files;
        this.ammount = args.ammount;
        this.car = args.car;

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
        this.material = new THREE.MeshStandardMaterial();
        this.shape = new CANNON.Box(
            new CANNON.Vec3(this.size / 2, this.size / 2, this.size / 2)
        );

        for (let i = 0; i < this.ammount; i++) {
            let positionY = 10 + i * this.size;

            let house = new House({
                physics: this.physics,
                files: this.files,
                positionX: 20,
                positionY: positionY,
                geometry: this.geometry,
                material: this.material,
                shape: this.shape,
                sound: this.sound,
            });

            this.houses.push(house.object);
            this.object.add(house.object);
        }

        this.club = new Club({
            sound: this.sound,
            // time:this.time,
            car: this.car,
            physics: this.physics,
            files: this.files,
            positionX: 20,
            positionY: -20,
            geometry: this.geometry,
            material: this.material,
            shape: this.shape,
        });

        this.houses.push(this.club.object);
        this.object.add(this.club.object);
    }
}
