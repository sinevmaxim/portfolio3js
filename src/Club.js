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
        this.initLogo();
        this.initPhysicsObject();
        this.initMusic();
    }

    initModel() {}
    initPhysicsObject() {
        this.body = new CANNON.Body({
            mass: 0,
            shape: this.shape,
            type: CANNON.Body.KINEMATIC,
        });
        this.hitbox = new THREE.Mesh(this.geometry, this.material);
        // this.hitbox.receiveShadow = true;
        // this.hitbox.castShadow = true;

        this.body.allowSleep = true;

        this.body.position.set(this.positionX, this.positionY, 5);
        this.hitbox.position.copy(this.body.position);

        this.physics.world.add(this.body);
        this.object.add(this.hitbox);

        this.body.addEventListener("collide", () => {
            this.sound.house.collision.play();
        });

        this.position = new THREE.Vector3(this.positionX, this.positionY, 0);
    }

    initLogo() {
        this.plane = new THREE.PlaneBufferGeometry(10, 10, 1, 1);

        this.logo = new THREE.Mesh(
            this.plane,
            new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                transparent: true,
                alphaMap: this.files.items.clubLogo,
                color: 0xff0000,
            })
        );

        this.logo.rotation.x = Math.PI / 2;
        this.logo.rotation.y = -Math.PI / 2;
        this.logo.position.set(this.positionX, this.positionY, 13);

        this.object.add(this.logo);
    }

    initMusic() {
        const addMusic = () => {
            this.hitbox.add(this.files.items.clubMusic);
            this.files.items.clubMusic.setRefDistance(60);
            this.files.items.clubMusic.setVolume(0.1);
            this.files.items.clubMusic.play();
            this.files.items.clubMusic.setLoop(true);
        };
        if (this.files.items.clubMusic) {
            addMusic();
        } else {
            this.files.on("clubMusic_ready", () => {
                addMusic();
            });
        }
    }
}
