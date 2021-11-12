import * as THREE from "three";
import * as CANNON from "cannon";
import * as TWEEN from "@tweenjs/tween.js";
import Car from "./Car";
import { MeshBasicMaterial, PlaneBufferGeometry } from "three";

export default class ClientCar extends Car {
    constructor(args) {
        super(args);
        this.light = args.light;
        this.controls = args.controls;

        this.speed = 0;

        this.initOptions();
        this.initModels();
        this.initWheels();
        this.initSound();
        this.initShadow();
        this.initLights();
        // this.initAnimation();
        this.initControls();
        this.initCollision();
        this.updatePositionData();
        this.updateFloorPosition();
        this.startStopEngine();
    }
    initOptions() {
        this.options = {};
        this.options.maxSteerVal = 0.33;
        this.options.maxForce = 450;
        this.options.maxForceMultiplier = 1;
        this.options.brakeForce = 900;
        this.options.maxSpeed = 90;
        this.options.maxReverseSpeed = 30;
    }

    initModels() {
        this.models = {};

        this.models.chassis = this.files.items.carChassis;
        this.models.chassis.scale.set(2, 2, 2);
        // this.models.wheel = this.files.items.carWheel;

        this.object.add(this.models.chassis);

        this.models.stopLights = this.models.chassis.children[12];
        this.models.stopLights.material = new THREE.MeshBasicMaterial({
            color: 0x440000,
        });
        this.models.reverseLights = this.models.chassis.children[13];

        this.models.reverseLights.material = new THREE.MeshBasicMaterial({
            color: 0x444444,
        });

        this.time.on("tick", () => {
            this.models.chassis.position.set(
                this.chassis.body.position.x,
                this.chassis.body.position.y,
                this.chassis.body.position.z - 1.4
            );

            this.models.chassis.quaternion.copy(this.chassis.body.quaternion);
        });
    }

    updatePositionData() {
        this.physics.world.addEventListener("postStep", () => {
            this.speed = this.vehicle.currentVehicleSpeedKmHour;

            this.oldPosition = this.position || new THREE.Vector3(0, 0, 0);
            this.position = this.hitbox.chassis.position.clone();

            this.velocityVector = new THREE.Vector3(
                this.position.x - this.oldPosition.x,
                this.position.y - this.oldPosition.y,
                this.position.z - this.oldPosition.z
            );
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
            opacity: 0.5,
        });

        this.shadowObject = new THREE.Mesh(
            this.shadowPlane,
            this.shadowMaterial
        );

        this.shadowObject.position.set(1, 1, 0.5);
        this.shadowObject.scale.set(0.75, 0.5, 1);
        this.object.add(this.shadowObject);

        this.time.on("tick", () => {
            this.shadowObject.position.set(
                this.chassis.body.position.x,
                this.chassis.body.position.y - 1,
                0.02
            );

            this.shadowObject.quaternion.set(
                // this.chassis.body.quaternion.x,
                0,
                // this.chassis.body.quaternion.y,
                0,
                this.chassis.body.quaternion.z,
                this.chassis.body.quaternion.w
            );
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
        this.leftBakedLight = new THREE.Mesh(
            new PlaneBufferGeometry(5, 5, 10, 10),
            new MeshBasicMaterial({
                transparent: true,
                alphaMap: this.files.items.lightAlphaMap,
                color: 0xeeeeff,
                opacity: 0.5,

                // depthTest: false,
            })
        );
        this.leftBakedLight.position.set(3.5, 0.35, 0.04);
        this.leftBakedLight.rotation.z = Math.PI / 2;

        this.rightBakedLight = new THREE.Mesh(
            new PlaneBufferGeometry(5, 5, 10, 10),
            new MeshBasicMaterial({
                transparent: true,
                alphaMap: this.files.items.lightAlphaMap,
                color: 0xeeeeff,
                opacity: 0.5,
                // depthTest: false,
            })
        );
        this.rightBakedLight.position.set(3.5, -0.35, 0.06);
        this.rightBakedLight.rotation.z = Math.PI / 2;

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

        // this.models.chassis.add(this.leftBakedLight);
        // this.models.chassis.add(this.rightBakedLight);

        document.addEventListener("keydown", (event) => {
            if (event.keyCode == 32) {
                this.light.leftSpotLight.visible = this.animationReverse;
                this.light.rightSpotLight.visible = this.animationReverse;
            }
        });
    }

    updateFloorPosition() {
        this.physics.world.addEventListener("postStep", () => {
            this.physics.floor.model.position.set(
                this.oldPosition.x,
                this.oldPosition.y,
                0
            );
        });
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
            if (this.speed > 0) {
                this.options.maxForceMultiplier =
                    (this.options.maxSpeed - this.speed) /
                    this.options.maxSpeed;
                this.isReverse = false;
            } else {
                this.options.maxForceMultiplier =
                    (this.options.maxReverseSpeed + this.speed) /
                    this.options.maxReverseSpeed;
                this.isReverse = true;
            }

            if (this.controls.action.movementIdle) {
                this.models.stopLights.material.color.setHex(0x440000);
                this.models.reverseLights.material.color.setHex(0x444444);
                this.models.reverseLights.material.needsUpdate = true;
                this.models.stopLights.material.needsUpdate = true;
            }

            if (this.controls.action.forward) {
                forceValue =
                    -this.options.maxForce * this.options.maxForceMultiplier;
                this.models.stopLights.material.color.setHex(0x440000);
                this.models.reverseLights.material.color.setHex(0x444444);
                this.models.reverseLights.material.needsUpdate = true;
                this.models.stopLights.material.needsUpdate = true;
            }

            if (this.controls.action.back) {
                forceValue =
                    this.options.maxForce * this.options.maxForceMultiplier;
                if (!this.isReverse) {
                    this.models.stopLights.material.color.setHex(0xff0000);
                    this.models.reverseLights.material.color.setHex(0x444444);
                } else {
                    this.models.reverseLights.material.color.setHex(0xffffff);
                    this.models.stopLights.material.color.setHex(0x440000);
                }
                this.models.reverseLights.material.needsUpdate = true;
                this.models.stopLights.material.needsUpdate = true;
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

        this.onPhotoshootFinish = () => {
            this.removeFromHandbrake();
            this.setControls();
        };

        window.setTimeout(this.onPhotoshootFinish, 3000);
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
