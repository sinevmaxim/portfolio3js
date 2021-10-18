import * as THREE from "three";

export default class Car {
    constructor(args) {
        this.physics = args.physics;
        this.time = args.time;
        this.files = args.files;
        this.sound = args.sound;
        this.light = args.light;

        this.object = new THREE.Object3D();
        this.speed = 0;

        this.initModels();
        this.initWheels();
        this.initPosition();
        this.initSound();
        this.initShadow();
        this.initLights();
        this.initAnimation();
    }

    initModels() {
        console.info("Car - Initialazing Models");

        this.models = {};

        this.models.chassis = this.files.items.carChassis;
        this.models.chassis.scale.set(2, 2, 2);
        // this.models.wheel = this.files.items.carWheel;
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

            if (this.speed >= 40) {
                this.physics.car.options.maxForceMultiplier = Math.max(
                    0,
                    ((110 - this.speed) * 2.2) / 110
                );
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

        // for (let i = 0; i < 4; i++) {
        //     const object = this.models.wheel.clone();
        //     object.scale.set(3, 3, 3);
        //     this.wheels.items.push(object);
        //     this.object.add(object);
        // }

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
            this.sound.car.engine.rate(2);
            this.sound.car.engineHigh.rate(
                Math.min(1.6, Math.max(0.18, Math.abs(this.speed) / 90))
            );
            this.sound.car.engineHigh.volume(
                0.2
                // Math.min(0.2, 0.1 * ((Math.abs(this.speed) - 10) / 20))
            );
        });
    }

    initShadow() {
        this.shadow = this.files.items.carShadowTexture;
        this.shadowPlane = new THREE.PlaneBufferGeometry(10, 10, 1, 1);
        this.shadowMaterial = new THREE.MeshBasicMaterial({
            alphaMap: this.shadow,
            transparent: true,
            color: 0x000000,
        });
        this.shadowObject = new THREE.Mesh(
            this.shadowPlane,
            this.shadowMaterial
        );

        this.shadowObject.position.set(1, 1, 1);
        this.shadowObject.scale.set(0.75, 0.5, 1);
        this.object.add(this.shadowObject);

        this.time.on("tick", () => {
            this.shadowObject.position.set(
                this.physics.car.chassis.body.position.x,
                this.physics.car.chassis.body.position.y + 0.2,
                0.04
            );

            this.shadowObject.quaternion.copy(
                this.physics.car.chassis.body.quaternion
            );
        });
    }

    initAnimation() {
        this.models.animation = {};

        this.animationMixer = new THREE.AnimationMixer(
            this.files.items.carChassis
        );
        this.models.animation.popUpLights = this.animationMixer.clipAction(
            this.files.animations.carChassis[0]
        );
        this.models.animation.popUpLights.clampWhenFinished = true;
        this.models.animation.popUpLights.enabled = true;
        this.models.animation.popUpLights.loop = THREE.LoopOnce;

        document.addEventListener("keydown", (event) => {
            if (event.keyCode == 32) {
                this.models.animation.popUpLights.play();
            }
        });

        this.time.on("tick", () => {
            this.animationMixer.update(this.time.delta / 1000);
        });
    }

    initLights() {
        this.light.light.leftSpotLight.position.set(0.5, 0.3, 0);
        this.light.light.leftSpotLight.target.position.set(2, 0.4, 0);
        this.light.light.rightSpotLight.position.set(0.5, -0.3, 0);
        this.light.light.rightSpotLight.target.position.set(2, -0.4, 0);
        this.models.chassis.add(this.light.light.leftSpotLight);
        this.models.chassis.add(this.light.light.leftSpotLight.target);
        this.models.chassis.add(this.light.light.rightSpotLight);
        this.models.chassis.add(this.light.light.rightSpotLight.target);

        document.addEventListener("keydown", (event) => {
            if (event.keyCode == 32) {
                this.light.light.leftSpotLight.visible = false;
                this.light.light.rightSpotLight.visible = false;
            }
        });
    }
}
