import * as THREE from "three";
import * as CANNON from "cannon";

export default class Physics {
    constructor(args) {
        this.time = args.time;
        this.camera = args.camera;
        this.debug = args.debug;
        this.files = args.files;
        this.controls = args.controls;

        this.object = new THREE.Object3D();

        this.initWorld();
        this.initMaterial();
        this.initFloor();

        this.time.on("tick", () => {
            this.world.step(1 / 60, this.time.delta, 3);
        });
    }

    initWorld() {
        this.world = new CANNON.World();
        // this.world.broadphase = new CANNON.SAPBroadphase(this.world);
        // this.world.broadphase = new CANNON.NaiveBroadphase();
        // this.world.broadphase.useBoundingBoxes = true;
        this.world.gravity.set(0, 0, -9.3);
        this.world.defaultContactMaterial.friction = 0.01;
    }

    initMaterial() {
        this.materials = {};
        this.materials.defaultMaterial = new CANNON.Material("default");

        this.materials.contact = {};
        this.materials.contact.defaultContactMaterial =
            new CANNON.ContactMaterial(
                this.materials.defaultMaterial,
                this.materials.defaultMaterial,
                {
                    friction: 0.3,
                    restitution: 0.5,
                    contactEquationStiffness: 1000,
                    contactEquationRelaxation: 4000,
                }
            );

        this.world.addContactMaterial(
            this.materials.contact.defaultContactMaterial
        );
        this.world.defaultContactMaterial =
            this.materials.contact.defaultContactMaterial;
    }

    initFloor() {
        this.floor = {};
        this.floor.body = new CANNON.Body({
            shape: new CANNON.Plane(),
            mass: 0,
        });

        this.floor.model = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(170, 170, 32, 32),
            new THREE.MeshStandardMaterial({
                map: this.files.items.floorTexture,
            })
        );

        this.floor.model.receiveShadow = true;

        this.floor.model.position.copy(this.floor.body.position);
        this.floor.model.quaternion.copy(this.floor.body.quaternion);

        this.object.add(this.floor.model);
        this.world.add(this.floor.body);
    }
}
