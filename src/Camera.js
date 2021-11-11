import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

export default class Camera {
    constructor(args) {
        this.time = args.time;
        this.files = args.files;
        this.renderer = args.renderer;
        this.sizes = args.sizes;
        this.physics = args.physics;

        this.object = new THREE.Object3D();

        this.initCamera();
        this.initEvents();
        this.startingScreen();
    }

    startingScreen() {
        this.cameraOnTweenUpdate = (params) => {
            this.cameraInstance.lookAt(
                new THREE.Vector3(params.x, params.y, params.z)
            );
        };

        this.onFilesReady = () => {
            const onTweenFinish = () => {
                this.startUpdatingCamera();
            };

            this.targetTween = new TWEEN.Tween(this.target)
                .to(
                    {
                        x: 0,
                        y: 180,
                        z: 0,
                    },
                    3000
                )
                .easing(TWEEN.Easing.Exponential.In)
                .onUpdate((params) => this.cameraOnTweenUpdate(params))
                .start()
                .onComplete(() => {
                    this.positionTween = new TWEEN.Tween(
                        this.cameraInstance.position
                    )
                        .to(
                            {
                                x: -this.offsetX,
                                y: -this.offsetY,
                                z: this.offsetZ,
                            },
                            3000
                        )
                        .easing(TWEEN.Easing.Exponential.Out)
                        .start();

                    this.target.y = -30;

                    this.secondTargetTween = new TWEEN.Tween(this.target)
                        .delay(2000)
                        .to(
                            {
                                x: this.physics.floor.model.position.x,
                                y: this.physics.floor.model.position.y,
                                z: this.physics.floor.model.position.z,
                            },
                            2000
                        )
                        .easing(TWEEN.Easing.Exponential.In)
                        .start()
                        .onUpdate((params) => {
                            this.cameraOnTweenUpdate(params);
                        })
                        .onComplete(onTweenFinish);
                });
        };
        this.files.on("ready", this.onFilesReady);
    }
    initEvents() {
        this.updateCamera = () => {
            this.cameraInstance.position.set(
                this.physics.floor.model.position.x - this.offsetX,
                this.physics.floor.model.position.y - this.offsetY,
                this.physics.floor.model.position.z + this.offsetZ
            );
            this.cameraInstance.lookAt(this.physics.floor.model.position);
        };

        this.observeCar = () => {
            this.cameraInstance.lookAt(this.physics.floor.model.position);
        };
        // this.startUpdatingCamera();
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

        this.cameraInstance.position.set(0, 212, 50);

        this.target = { x: 0, y: 212, z: 60 };
        this.cameraInstance.lookAt(
            new THREE.Vector3(this.target.x, this.target.y, this.target.z)
        );

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
                    x: this.physics.floor.model.position.x - 5,
                    y: this.physics.floor.model.position.y - 5,
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
                    x: this.physics.floor.model.position.x - 7,
                    y: this.physics.floor.model.position.y + 10,
                    z: 1,
                },
                2000
            )
            .easing(TWEEN.Easing.Cubic.InOut);

        const onTweenFinish = () => {
            this.startUpdatingCamera();
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
            .onComplete(onTweenFinish);

        this.tweenRotation1.chain(this.tweenRotation2);
        this.tweenPosition1.chain(this.tweenPosition2);
    }
}
