import * as THREE from "three";
import * as CANNON from "cannon";

export default class PalmTree {
    constructor(args) {
        this.physics = args.physics;
        this.files = args.files;
        this.positionX = args.positionX;
        this.positionY = args.positionY;
        this.geometry = args.geometry;
        this.material = args.material;
        this.shape = args.shape;
        this.sound = args.sound;

        this.object = new THREE.Object3D();

        this.initPhysicsObject();
        this.initModel();
    }

    initModel() {
        this.model =
            0.5 < Math.random()
                ? this.files.items.secondPalmTree.clone()
                : this.files.items.firstPalmTree.clone();
        this.model.scale.set(3, 3, 4);
        this.model.castShadow = true;
        this.model.receiveShadow = true;
        this.model.position.set(this.positionX, this.positionY, 0);

        this.object.add(this.model);
    }
    initPhysicsObject() {
        this.body = new CANNON.Body({ mass: 0 });
        this.body.addShape(this.shape);
        this.body.allowSleep = true;

        this.hitbox = new THREE.Mesh(this.geometry, this.material);

        // this.hitbox.receiveShadow = true;
        // this.hitbox.castShadow = true;

        this.body.position.set(this.positionX, this.positionY, 0);
        this.hitbox.position.copy(this.body.position);

        this.physics.world.add(this.body);
        // this.object.add(this.hitbox);

        this.body.addEventListener("collide", () => {
            this.sound.tree.collision.play();
        });

        // this.physics.world.addEventListener("postStep", () => {
        //     this.hitbox.position.copy(this.body.position);
        //     this.hitbox.quaternion.copy(this.body.quaternion);
        // });
    }
}
