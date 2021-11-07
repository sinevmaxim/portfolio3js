import * as THREE from "three";
import * as CANNON from "cannon";
import * as TWEEN from "@tweenjs/tween.js";

export default class Car {
    constructor(args) {
        this.physics = args.physics;
        this.time = args.time;
        this.files = args.files;
        this.sound = args.sound;
        this.startingPosition = args.startingPosition;

        this.object = new THREE.Object3D();

        this.initPhysics();
    }

    initPhysics() {
        this.chassis = {};

        this.chassis.shape = new CANNON.Box(new CANNON.Vec3(3, 1.5, 1));
        this.chassis.body = new CANNON.Body({ mass: 465 });
        this.chassis.body.addShape(this.chassis.shape);
        this.chassis.body.position.set(
            this.startingPosition.x,
            this.startingPosition.y,
            this.startingPosition.z
        );

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

        this.wheels.options.chassisConnectionPointLocal.set(1.7, 1.06, -0.3);
        this.vehicle.addWheel(this.wheels.options);

        this.wheels.options.chassisConnectionPointLocal.set(1.7, -1.06, -0.3);
        this.vehicle.addWheel(this.wheels.options);

        this.wheels.options.chassisConnectionPointLocal.set(-1.6, 1.06, -0.3);
        this.vehicle.addWheel(this.wheels.options);

        this.wheels.options.chassisConnectionPointLocal.set(-1.6, -1.06, -0.3);
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

            wheelBody.addShape(cylinderShape, new CANNON.Vec3(), quaternion);
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
            }
        });
    }
}
