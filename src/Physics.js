import * as THREE from "three";
import * as CANNON from "cannon";

export default class Physics {
    constructor(args) {
        this.time = args.time;
        this.camera = args.camera;
        this.debug = args.debug;

        this.object = new THREE.Object3D();

        this.initWorld();
        this.initMaterial();
        this.initFloor();
        this.initCar();

        this.time.on("tick", () => {
            this.world.step(1 / 60, this.time.delta, 3);
        });
    }

    initWorld() {
        console.info("Physics - Initialazing World");

        this.world = new CANNON.World();
        this.world.broadphase = new CANNON.SAPBroadphase(this.world);
        this.world.gravity.set(0, 0, -10);
        this.world.defaultContactMaterial.friction = 0;
    }

    initMaterial() {
        console.info("Physics - Initialazing Material");

        this.materials = {};
        this.materials.defaultMaterial = new CANNON.Material("default");

        this.materials.contact = {};
        this.materials.contact.defaultContactMaterial =
            new CANNON.ContactMaterial(
                this.materials.defaultMaterial,
                this.materials.defaultMaterial,
                {
                    friction: 0.3,
                    restitution: 0.0,
                    contactEquationStiffness: 1000,
                }
            );

        this.world.addContactMaterial(
            this.materials.contact.defaultContactMaterial
        );
        this.world.defaultContactMaterial =
            this.materials.contact.defaultContactMaterial;
    }

    initFloor() {
        console.info("Physics - Initialazing Floor");

        this.floor = {};
        this.floor.body = new CANNON.Body({
            shape: new CANNON.Plane(),
            mass: 0,
        });

        this.floor.model = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(1000, 1000, 128, 128),
            new THREE.MeshBasicMaterial({
                wireframe: true,
                color: 0xffffff,
            })
        );

        this.floor.model.position.copy(this.floor.body.position);
        this.floor.model.quaternion.copy(this.floor.body.quaternion);
        this.object.add(this.floor.model);

        this.world.addBody(this.floor.body);
    }

    initCar() {
        console.info("Physics - Initialazing Car");
        this.car = {};
        this.car.chassis = {};

        this.offsetX = 0;
        this.offsetY = 34;
        this.offsetZ = 21;

        // this.debug.add(this, "offsetX", -100, 100, 0.1);
        // this.debug.add(this, "offsetY", -100, 100, 0.1);
        // this.debug.add(this, "offsetZ", -100, 100, 0.1);

        this.car.chassis.shape = new CANNON.Box(new CANNON.Vec3(2, 1, 0.75));
        this.car.chassis.body = new CANNON.Body({ mass: 200 });
        this.car.chassis.body.addShape(this.car.chassis.shape);
        this.car.chassis.body.position.set(0, 0, 4);
        // this.car.chassis.body.angularVelocity.set(-1.5, 0.0, 1.5);

        // Wheels options
        this.car.wheels = {};
        this.car.wheels.options = {
            radius: 0.5,
            directionLocal: new CANNON.Vec3(0, 0, -1),
            suspensionStiffness: 45,
            suspensionRestLength: 0.4,
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

        // Create the vehicle
        this.car.vehicle = new CANNON.RaycastVehicle({
            chassisBody: this.car.chassis.body,
        });

        this.car.wheels.options.chassisConnectionPointLocal.set(1.25, 1, 0);
        this.car.vehicle.addWheel(this.car.wheels.options);

        this.car.wheels.options.chassisConnectionPointLocal.set(1.25, -1, 0);
        this.car.vehicle.addWheel(this.car.wheels.options);

        this.car.wheels.options.chassisConnectionPointLocal.set(-1.25, 1, 0);
        this.car.vehicle.addWheel(this.car.wheels.options);

        this.car.wheels.options.chassisConnectionPointLocal.set(-1.25, -1, 0);
        this.car.vehicle.addWheel(this.car.wheels.options);

        this.car.vehicle.addToWorld(this.world);

        this.car.wheels.bodies = [];
        for (const wheelInfo of this.car.vehicle.wheelInfos) {
            const cylinderShape = new CANNON.Cylinder(
                wheelInfo.radius,
                wheelInfo.radius,
                wheelInfo.radius,
                20
            );

            const wheelBody = new CANNON.Body({
                mass: 0,
            });
            wheelBody.type = CANNON.Body.KINEMATIC;
            wheelBody.collisionFilterGroup = 0; // turn off collisions

            const quaternion = new CANNON.Quaternion();
            quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);

            wheelBody.addShape(cylinderShape, new CANNON.Vec3()), quaternion;
            this.car.wheels.bodies.push(wheelBody);
            this.world.addBody(wheelBody);
        }

        this.car.model = {};

        this.car.model.material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
        });

        this.car.model.chassis = new THREE.Mesh(
            new THREE.BoxBufferGeometry(2, 0.5, 0.5),
            this.car.model.material
        );

        this.object.add(this.car.model.chassis);

        this.car.model.wheels = [];

        const wheelGeometry = new THREE.CylinderBufferGeometry(
            this.car.wheels.options.radius,
            this.car.wheels.options.radius,
            this.car.wheels.options.radius,
            8,
            1
        );

        for (let i = 0; i < 4; i++) {
            const wheel = new THREE.Mesh(
                wheelGeometry,
                this.car.model.material
            );

            this.car.model.wheels.push(wheel);
            this.object.add(wheel);
        }

        this.world.addEventListener("postStep", () => {
            for (let i = 0; i < this.car.vehicle.wheelInfos.length; i++) {
                this.car.vehicle.updateWheelTransform(i);

                const transform = this.car.vehicle.wheelInfos[i].worldTransform;
                this.car.wheels.bodies[i].position.copy(transform.position);
                this.car.wheels.bodies[i].quaternion.copy(transform.quaternion);
                this.car.model.wheels[i].quaternion.copy(transform.quaternion);
                this.car.model.wheels[i].position.copy(transform.position);

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
                    this.car.wheels.bodies[i].quaternion =
                        this.car.wheels.bodies[i].quaternion.mult(
                            rotationQuaternion
                        );
                }
            }

            this.car.model.chassis.position.copy(
                this.car.chassis.body.position
            );

            if (this.camera.orbit) {
                this.camera.cameraInstance.position.set(
                    this.car.model.chassis.position.x - this.offsetX,
                    this.car.model.chassis.position.y - this.offsetY,
                    this.car.model.chassis.position.z + this.offsetZ
                );

                this.camera.cameraInstance.lookAt(
                    this.car.model.chassis.position
                );
            }
            this.car.model.chassis.quaternion.copy(
                this.car.chassis.body.quaternion
            );
        });

        this.car.options = {};
        this.car.options.maxSteerVal = 0.3;
        this.car.options.maxForce = 500;
        this.car.options.brakeForce = 100000;

        const controlsHandler = (event) => {
            const up = event.type == "keyup";

            if (!up && event.type !== "keydown") {
                return;
            }

            this.car.vehicle.setBrake(0, 0);
            this.car.vehicle.setBrake(0, 1);
            this.car.vehicle.setBrake(0, 2);
            this.car.vehicle.setBrake(0, 3);

            switch (event.keyCode) {
                case 38: // forward
                    this.car.vehicle.applyEngineForce(
                        up ? 0 : -this.car.options.maxForce,
                        2
                    );
                    this.car.vehicle.applyEngineForce(
                        up ? 0 : -this.car.options.maxForce,
                        3
                    );
                    break;

                case 40: // backward
                    this.car.vehicle.applyEngineForce(
                        up ? 0 : this.car.options.maxForce,
                        2
                    );
                    this.car.vehicle.applyEngineForce(
                        up ? 0 : this.car.options.maxForce,
                        3
                    );
                    break;

                case 66: // b
                    this.car.vehicle.setBrake(this.car.options.brakeForce, 0);
                    this.car.vehicle.setBrake(this.car.options.brakeForce, 1);
                    this.car.vehicle.setBrake(this.car.options.brakeForce, 2);
                    this.car.vehicle.setBrake(this.car.options.brakeForce, 3);
                    break;

                case 39: // right
                    this.car.vehicle.setSteeringValue(
                        up ? 0 : -this.car.options.maxSteerVal,
                        0
                    );
                    this.car.vehicle.setSteeringValue(
                        up ? 0 : -this.car.options.maxSteerVal,
                        1
                    );
                    break;

                case 37: // left
                    this.car.vehicle.setSteeringValue(
                        up ? 0 : this.car.options.maxSteerVal,
                        0
                    );
                    this.car.vehicle.setSteeringValue(
                        up ? 0 : this.car.options.maxSteerVal,
                        1
                    );
                    break;
            }
        };

        document.addEventListener("keydown", controlsHandler);
        document.addEventListener("keyup", controlsHandler);
    }
}
