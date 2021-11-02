import * as THREE from "three";
import * as CANNON from "cannon";
import * as TWEEN from "@tweenjs/tween.js";

export default class Car {
    constructor(args) {
        this.physics = args.physics;
        this.time = args.time;
        this.files = args.files;
        this.sound = args.sound;
        this.light = args.light;
        this.controls = args.controls;

        this.object = new THREE.Object3D();
        this.speed = 0;

        this.initPhysics();
        this.initModels();
        this.initWheels();
        this.initSound();
        this.initShadow();
        this.initLights();
        this.initAnimation();
        this.initControls();
        this.initCollision();
        this.updateAcceleration();
        this.startStopEngine();
    }

    initModels() {
        this.models = {};

        this.models.chassis = this.files.items.carChassis;
        this.models.chassis.scale.set(2, 2, 2);
        // this.models.wheel = this.files.items.carWheel;

        this.object.add(this.models.chassis);

        this.time.on("tick", () => {
            this.models.chassis.position.set(
                this.chassis.body.position.x,
                this.chassis.body.position.y,
                this.chassis.body.position.z - 1.4
            );

            this.models.chassis.quaternion.copy(this.chassis.body.quaternion);
        });
    }

    updateAcceleration() {
        this.physics.world.addEventListener("postStep", () => {
            this.speed = this.vehicle.currentVehicleSpeedKmHour;
        });
    }

    initWheels() {
        // this.wheels = {};
        // this.wheels.items = [];
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

    enableEngineSound() {
        this.sound.car.engineHigh.play();
        this.sound.car.engine.play();
    }

    disableEngineSound() {
        this.sound.car.engineHigh.stop();
        this.sound.car.engine.stop();
    }

    initSound() {
        this.time.on("tick", () => {
            this.sound.car.engine.volume(
                Math.max(0, 0.02 * ((40 - Math.abs(this.speed)) / 40))
            );
            this.sound.car.engine.rate(2);
            this.sound.car.engineHigh.rate(
                Math.min(
                    1.6,
                    Math.max(0.18, Math.abs(this.speed) / this.options.maxSpeed)
                )
            );
            this.sound.car.engineHigh.volume(0.2);
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
                this.chassis.body.position.x,
                this.chassis.body.position.y + 0.2,
                0.02
            );

            this.shadowObject.quaternion.copy(this.chassis.body.quaternion);
        });
    }

    initAnimation() {
        this.models.animation = {};
        this.animationReverse = false;

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
                if (this.animationReverse) {
                    this.models.animation.popUpLights.play();
                    this.models.animation.popUpLights.timeScale = -1;
                    this.models.animation.popUpLights.paused = false;
                } else {
                    this.models.animation.popUpLights.reset();
                    this.models.animation.popUpLights.timeScale = 1;
                    this.models.animation.popUpLights.play();
                }

                this.animationReverse = !this.animationReverse;
            }
        });

        this.time.on("tick", () => {
            this.animationMixer.update(this.time.delta / 1000);
        });
    }

    initLights() {
        this.light.leftSpotLight.position.set(1.2, 0.4, 0.383);
        this.light.leftSpotLight.target.position.set(4, 0.4, -0.1);
        this.light.rightSpotLight.position.set(1.2, -0.4, 0.383);
        this.light.rightSpotLight.target.position.set(4, -0.4, -0.1);

        this.light.leftStopLight.position.set(-1.35, 0.4, 0.5);
        this.light.rightStopLight.position.set(-1.35, -0.4, 0.5);

        this.models.chassis.add(this.light.leftSpotLight);
        this.models.chassis.add(this.light.leftSpotLight.target);
        this.models.chassis.add(this.light.rightSpotLight);
        this.models.chassis.add(this.light.rightSpotLight.target);

        document.addEventListener("keydown", (event) => {
            if (event.keyCode == 32) {
                this.light.leftSpotLight.visible = this.animationReverse;
                this.light.rightSpotLight.visible = this.animationReverse;
            }
        });
    }

    initPhysics() {
        this.chassis = {};

        this.chassis.shape = new CANNON.Box(new CANNON.Vec3(3, 1.5, 1));
        this.chassis.body = new CANNON.Body({ mass: 465 });
        this.chassis.body.addShape(this.chassis.shape);
        this.chassis.body.position.set(0, 0, 1.6);

        this.wheels = {};
        this.wheels.options = {
            radius: 0.32,
            directionLocal: new CANNON.Vec3(0, 0, -1),
            suspensionStiffness: 45,
            suspensionResgth: 0.4,
            frictionSlip: 5,
            dampingRelaxation: 2.8,
            dampingCompression: 4.5,
            maxSuspensionForce: 100000,
            rollInfluence: 0.01,
            axleLocal: new CANNON.Vec3(0, 1, 0),
            chassisConnectionPointLocal: new CANNON.Vec3(1, 1, 0),
            maxSuspensionTravel: 0.1,
            customSlidingRotationalSpeed: -30,
            useCustomSlidingRotationalSpeed: true,
        };

        this.vehicle = new CANNON.RaycastVehicle({
            chassisBody: this.chassis.body,
        });

        this.wheels.options.chassisConnectionPointLocal.set(1.7, 1, -0.3);
        this.vehicle.addWheel(this.wheels.options);

        this.wheels.options.chassisConnectionPointLocal.set(1.7, -1, -0.3);
        this.vehicle.addWheel(this.wheels.options);

        this.wheels.options.chassisConnectionPointLocal.set(-1.6, 1, -0.3);
        this.vehicle.addWheel(this.wheels.options);

        this.wheels.options.chassisConnectionPointLocal.set(-1.6, -1, -0.3);
        this.vehicle.addWheel(this.wheels.options);

        this.vehicle.addToWorld(this.physics.world);

        this.wheels.bodies = [];

        for (const wheelInfo of this.vehicle.wheelInfos) {
            const cylinderShape = new CANNON.Cylinder(
                wheelInfo.radius,
                wheelInfo.radius,
                wheelInfo.radius,
                20
            );

            const wheelBody = new CANNON.Body({
                mass: 0,
                type: CANNON.Body.KINEMATIC,
                collisionFilterGroup: 0, // turn off collisions
            });

            const quaternion = new CANNON.Quaternion();
            quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);

            wheelBody.addShape(cylinderShape, new CANNON.Vec3()), quaternion;
            this.wheels.bodies.push(wheelBody);
            this.physics.world.addBody(wheelBody);
        }

        this.hitbox = {};

        this.hitbox.material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
        });

        this.hitbox.chassis = new THREE.Mesh(
            new THREE.BoxBufferGeometry(3 * 2, 1.5 * 2, 1 * 2),
            this.hitbox.material
        );

        this.object.add(this.hitbox.chassis);

        this.hitbox.wheels = [];

        const wheelGeometry = new THREE.CylinderBufferGeometry(
            this.wheels.options.radius,
            this.wheels.options.radius,
            this.wheels.options.radius,
            8,
            1
        );

        for (let i = 0; i < 4; i++) {
            const wheel = new THREE.Mesh(wheelGeometry, this.hitbox.material);

            this.hitbox.wheels.push(wheel);
            this.object.add(wheel);
        }

        this.physics.world.addEventListener("postStep", () => {
            for (let i = 0; i < this.vehicle.wheelInfos.length; i++) {
                this.vehicle.updateWheelTransform(i);

                const transform = this.vehicle.wheelInfos[i].worldTransform;
                this.wheels.bodies[i].position.copy(transform.position);
                this.wheels.bodies[i].quaternion.copy(transform.quaternion);
                this.hitbox.wheels[i].quaternion.copy(transform.quaternion);
                this.hitbox.wheels[i].position.copy(transform.position);

                // Rotate the wheels on the right
                if (i === 1 || i === 3) {
                    const rotationQuaternion = new CANNON.Quaternion(
                        0,
                        0,
                        0,
                        1
                    );
                    rotationQuaternion.setFromAxisAngle(
                        new CANNON.Vec3(0, 0, 1),
                        Math.PI
                    );
                    this.wheels.bodies[i].quaternion =
                        this.wheels.bodies[i].quaternion.mult(
                            rotationQuaternion
                        );
                }

                this.hitbox.chassis.position.copy(this.chassis.body.position);

                this.hitbox.chassis.quaternion.copy(
                    this.chassis.body.quaternion
                );

                this.physics.floor.model.position.set(
                    this.chassis.body.position.x,
                    this.chassis.body.position.y,
                    0
                );
            }
        });

        this.options = {};
        this.options.maxSteerVal = 0.33;
        this.options.maxForce = 450;
        this.options.maxForceMultiplier = 1;
        this.options.brakeForce = 900;
        this.options.maxSpeed = 90;
        this.options.maxReverseSpeed = 30;
    }

    initCollision() {
        this.chassis.body.addEventListener("collide", () => {
            console.log("collided with this speed - ", this.speed);
        });
    }

    setControls() {
        this.time.on("tick", this.controlCar);
    }

    unsetControls() {
        this.time.off("tick", this.controlCar);
    }

    initControls() {
        this.controlCar = () => {
            let forceValue = 0;
            let steerValue = 0;
            this.options.maxForceMultiplier =
                this.speed > 0
                    ? (this.options.maxSpeed - this.speed) /
                      this.options.maxSpeed
                    : (this.options.maxReverseSpeed + this.speed) /
                      this.options.maxReverseSpeed;

            if (this.controls.action.forward) {
                forceValue =
                    -this.options.maxForce * this.options.maxForceMultiplier;
            }

            if (this.controls.action.back) {
                forceValue =
                    this.options.maxForce * this.options.maxForceMultiplier;
            }

            if (this.controls.action.right) {
                steerValue = -this.options.maxSteerVal;
            }

            if (this.controls.action.left) {
                steerValue = this.options.maxSteerVal;
            }

            this.vehicle.applyEngineForce(forceValue, 2);
            this.vehicle.applyEngineForce(forceValue, 3);
            this.vehicle.setSteeringValue(steerValue, 0);
            this.vehicle.setSteeringValue(steerValue, 1);
        };
    }

    startStopEngine() {
        this.engineTurnOn = () => {
            if (this.controls.action.engine) {
                this.sound.car.engineStart.play();
                this.startEngine();
                this.time.off("tick", this.engineTurnOn);
            }
        };

        this.time.on("tick", this.engineTurnOn);
    }

    startEngine() {
        this.enableEngineSound();
        this.setControls();
    }

    stopEngine() {
        this.disableEngineSound();
        this.unsetControls();
    }

    photoshoot() {
        this.chassis.body.position.set(
            this.chassis.body.position.x,
            this.chassis.body.position.y,
            1.6
        );

        this.unsetControls();
        this.putOnHandbrake();
    }

    putOnHandbrake() {
        this.vehicle.setBrake(this.options.brakeForce, 2);
        this.vehicle.setBrake(this.options.brakeForce, 3);
    }
    removeFromHandbrake() {
        this.vehicle.setBrake(0, 2);
        this.vehicle.setBrake(0, 3);
    }
}
