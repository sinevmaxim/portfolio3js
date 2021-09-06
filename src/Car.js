import * as THREE from "three";

export default class Car {
    constructor(args) {
        this.physics = args.physics;
        this.time = args.time;
        this.files = args.files;

        this.object = new THREE.Object3D();

        this.initModels();
        this.initWheels();
        this.initPosition();
    }

    initModels() {
        console.info("Car - Initialazing Models");

        this.models = {};

        this.models.chassis = this.files.items.carChassis;
        this.models.wheel = this.files.items.carWheel;
    }

    initPosition() {
        console.info("Car - Initialazing Position");

        this.time.on("tick", () => {
            this.models.chassis.position.copy(
                this.physics.car.chassis.body.position
            );

            this.models.chassis.quaternion.copy(
                this.physics.car.chassis.body.quaternion
            );
        });
    }

    initWheels() {
        console.info("Car - Initialazing Wheels");

        this.wheels = {};
        this.wheels.items = [];

        for (let i = 0; i < 4; i++) {
            const object = this.models.wheel.clone();
            this.wheels.items.push(object);
            this.object.add(object);
        }

        this.time.on("tick", () => {
            for (let key = 0; key < 4; key++) {
                const wheelBody = this.physics.car.wheels.bodies[key];
                const wheelObject = this.wheels.items[key];

                wheelObject.position.copy(wheelBody.position);
                wheelObject.quaternion.copy(wheelBody.quaternion);
            }
        });
    }
}
