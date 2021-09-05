import * as THREE from "three";
import CANNON from "cannon";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default class Car {
    constructor(args) {
        this.physics = args.physics;
        this.time = args.time;

        this.initModels();
        this.initPosition();
    }

    initModels() {
        this.models = {};
        this.models.chassis = null;
        this.models.wheel = null;
        gltfLoader = new GLTFLoader();

        gltfLoader.load("/models/car/car.glb", (model) => {
            this.models.chassis = model.scene;
        });

        gltfLoader.load("/models/car/wheel.glb", (model) => {
            this.models.wheel = model.scene;
        });
    }

    initPosition() {
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
        this.wheels = {};
        this.wheels.items = [];

        for (let i = 0; i < 4; i++) {
            const object = this.model.wheel.clone();
            this.wheels.items.push(object);
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
