import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

export default class Camera {
    constructor(args) {
        this.time = args.time;
        this.files = args.files;
        this.renderer = args.renderer;
        this.sizes = args.sizes;
        this.car = args.car;

        this.object = new THREE.Object3D();

        this.initCamera();
        this.initEvents();
    }
    initEvents() {
        this.updateCamera = () => {
            this.cameraInstance.position.set(
                this.car.oldPosition.x - this.offsetX,
                this.car.oldPosition.y - this.offsetY,
                this.car.oldPosition.z + this.offsetZ
            );
            this.cameraInstance.lookAt(this.car.oldPosition);
        };

        this.observeCar = () => {
            this.cameraInstance.lookAt(this.car.oldPosition);
        };

        this.startUpdatingCamera();
    }

    initCamera() {
        this.cameraInstance = new THREE.PerspectiveCamera(
            40,
            this.sizes.width / this.sizes.height,
            1,
            1000
        );

        this.offsetX = 0;
        this.offsetY = 34;
        this.offsetZ = 21;

        this.cameraInstance.position.set(20, 20, 20);
        this.cameraInstance.lookAt(new THREE.Vector3());

        this.cameraInstance.add(this.files.audioListener);
        this.object.add(this.cameraInstance);

        window.addEventListener("resize", () => {
            this.cameraInstance.aspect = this.sizes.width / this.sizes.height;
            this.cameraInstance.updateProjectionMatrix();
        });
    }

    stopUpdatingCamera() {
        this.time.off("tick", this.updateCamera);
    }

    startUpdatingCamera() {
        this.time.on("tick", this.updateCamera);
    }

    startObservingCar() {
        this.time.on("tick", this.observeCar);
    }
    stopObservingCar() {
        this.time.off("tick", this.observeCar);
    }

    startPhotoshoot() {
        this.stopUpdatingCamera();

        this.tweenPosition1 = new TWEEN.Tween(this.cameraInstance.position)
            .to(
                {
                    x: this.car.chassis.body.position.x - 5,
                    y: this.car.chassis.body.position.y - 5,
                    z: 1,
                },
                2000
            )
            .easing(TWEEN.Easing.Cubic.InOut)
            .start()
            .delay(1000);
        this.tweenPosition2 = new TWEEN.Tween(this.cameraInstance.position)
            .to(
                {
                    x: this.car.chassis.body.position.x - 7,
                    y: this.car.chassis.body.position.y + 10,
                    z: 1,
                },
                2000
            )
            .easing(TWEEN.Easing.Cubic.InOut);

        // this.tweenPositionFinish = new TWEEN.Tween(this.cameraInstance.position)
        //     .to(
        //         {
        //             x: this.car.chassis.body.position.x - this.offsetX,
        //             y: this.car.chassis.body.position.y - this.offsetY,
        //             z: this.car.chassis.body.position.z + this.offsetZ,
        //         },
        //         1000
        //     )
        //     .easing(TWEEN.Easing.Cubic.InOut);

        this.onTweenFinish = () => {
            this.startUpdatingCamera();
            this.car.setControls();
            this.car.removeFromHandbrake();
        };

        this.tweenRotation1 = new TWEEN.Tween(this.cameraInstance.rotation)
            .to(
                {
                    x: Math.PI / 2,
                    y: -Math.PI * 0.3,
                    z: 0,
                },
                2000
            )
            .easing(TWEEN.Easing.Cubic.InOut)
            .start()
            .delay(1000);
        this.tweenRotation2 = new TWEEN.Tween(this.cameraInstance.rotation)
            .to(
                {
                    x: Math.PI / 2,
                    y: -Math.PI * 0.7,
                    z: 0,
                },
                2000
            )
            .easing(TWEEN.Easing.Cubic.InOut)
            .onComplete(this.onTweenFinish);

        // this.tweenRotationFinish = new TWEEN.Tween(this.cameraInstance.rotation)
        //     .to({ x: Math.PI / 2, y: 0, z: 0 }, 1000)
        //     .easing(TWEEN.Easing.Cubic.InOut)
        // .onComplete(this.onTweenFinish);

        this.tweenRotation1.chain(this.tweenRotation2);
        // this.tweenRotation2.chain(this.tweenPositionFinish);
        this.tweenPosition1.chain(this.tweenPosition2);
        // this.tweenPosition2.chain(this.tweenRotationFinish);
    }
}
