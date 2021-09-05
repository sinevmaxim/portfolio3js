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

        // alert(this.files.models);
        // console.log(this.files.models);

        // console.log(this.files.models.car);
        // console.log(this.files.models.car.chassis);
        // console.log(this.files.models.car.wheel);

        // this.models.chassis = this.files.models.car.chassis;
        // this.models.wheel = this.files.models.car.wheel;
        this.models = this.files.models.car;
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
            console.log(this.models);
            console.log(this.models.chassis);
            console.log(this.models.wheel);
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
