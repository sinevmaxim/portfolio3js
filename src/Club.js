import * as THREE from "three";
import * as CANNON from "cannon";

export default class Club {
    constructor(args) {
        // this.time = args.time;
        this.files = args.files;
        this.car = args.car;
        this.physics = args.physics;
        this.sound = args.sound;
        this.positionX = args.positionX;
        this.positionY = args.positionY;
        this.geometry = args.geometry;
        this.material = args.material;
        this.shape = args.shape;

        this.object = new THREE.Object3D();

        this.initModel();
        this.initPhysicsObject();
    }

    initModel() {}
    initPhysicsObject() {
        this.body = new CANNON.Body({
            mass: 0,
            shape: this.shape,
            type: CANNON.Body.KINEMATIC,
        });
        this.body.allowSleep = true;
        this.hitbox = new THREE.Mesh(this.geometry, this.material);

        this.hitbox.receiveShadow = true;
        this.hitbox.castShadow = true;

        this.body.position.set(this.positionX, this.positionY, 5);
        this.hitbox.position.copy(this.body.position);

        this.physics.world.add(this.body);
        this.object.add(this.hitbox);
        this.files.on("clubMusic_ready", () => {
            this.hitbox.add(this.files.items.clubMusic);
            this.files.items.clubMusic.setRefDistance(60);
            this.files.items.clubMusic.setVolume(0.3);
            this.files.items.clubMusic.play();
            this.files.items.clubMusic.setLoop(true);
        });

        this.position = new THREE.Vector3(this.positionX, this.positionY, 0);
        // this.sound.music.play();

        // this.physics.world.addEventListener("postStep", () => {
        //     this.hitbox.position.copy(this.body.position);
        //     this.hitbox.quaternion.copy(this.body.quaternion);

        //     this.sound.music.volume(
        //         Math.min(
        //             Math.max(
        //                 0.07,
        //                 14 /
        //                     this.position.distanceTo(
        //                         this.car.models.chassis.position
        //                     )
        //             ),
        //             0.25
        //         )
        //     );
        // });
    }
}
