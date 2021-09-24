import * as THREE from "three";

export default class Car {
    constructor(args) {
        this.physics = args.physics;
        this.time = args.time;
        this.files = args.files;
        this.sound = args.sound;

        this.object = new THREE.Object3D();
        this.speed = 0;

        this.initModels();
        this.initWheels();
        this.initPosition();
        this.initSound();
    }

    initModels() {
        console.info("Car - Initialazing Models");

        this.models = {};

        this.models.chassis = this.files.items.carChassis;
        this.models.wheel = this.files.items.carWheel;
    }

    initPosition() {
        console.info("Car - Initialazing Position");

        this.object.add(this.models.chassis);
        this.time.on("tick", () => {
            this.models.chassis.position.copy(
                this.physics.car.chassis.body.position
            );

            this.models.chassis.quaternion.copy(
                this.physics.car.chassis.body.quaternion
            );

            this.speed = this.physics.car.vehicle.currentVehicleSpeedKmHour;

            if (this.speed >= 150) {
                this.physics.car.options.maxForceMultiplier =
                    ((200 - this.speed) * 2.2) / 200;
            }

            if (this.speed > 0) {
                this.physics.car.options.maxForceMultiplierBack = 3;
            } else {
                this.physics.car.options.maxForceMultiplierBack =
                    (30 - Math.abs(this.speed)) / 30;
            }
        });
    }

    initWheels() {
        console.info("Car - Initialazing Wheels");

        this.wheels = {};
        this.wheels.items = [];

        for (let i = 0; i < 4; i++) {
            const object = this.models.wheel.clone();
            object.scale.set(3, 3, 3);
            this.wheels.items.push(object);
            // this.object.add(object);
        }

        // this.time.on("tick", () => {
        //     for (let key = 0; key < 4; key++) {
        //         const wheelBody = this.physics.car.wheels.bodies[key];
        //         const wheelObject = this.wheels.items[key];

        //         wheelObject.position.copy(wheelBody.position);
        //         wheelObject.quaternion.copy(wheelBody.quaternion);
        //     }
        // });
    }

    initSound() {
        this.sound.car.engineHigh.play();
        this.sound.car.engine.play();

        this.time.on("tick", () => {
            this.sound.car.engine.volume(
                Math.max(0, 0.02 * ((40 - Math.abs(this.speed)) / 40))
            );
            this.sound.car.engineHigh.rate(
                Math.min(1.2, Math.max(0.2, Math.abs(this.speed) / 80))
            );
            this.sound.car.engineHigh.volume(
                0.2
                // Math.min(0.2, 0.1 * ((Math.abs(this.speed) - 10) / 20))
            );
        });
    }
}
