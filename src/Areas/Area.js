import * as THREE from "three";

export default class Area {
    constructor(args) {
        this.time = args.time;
        this.files = args.files;
        this.car = args.car;
        this.position = args.position;

        this.width = this.position.xTwo - this.position.xOne;
        this.height = this.position.yTwo - this.position.yOne;

        this.object = new THREE.Object3D();
        this.in = false;

        this.enterEvent = (event) => {
            if (event.keyCode == 13) {
                this.customEnterEvent();
            }
        };

        this.initFrame();
        this.checkPosition();
    }

    initFrame() {
        this.frame = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(this.width, this.height, 1, 1),
            new THREE.MeshBasicMaterial({
                transparent: true,
                alphaMap: this.files.items.areaFrame,
                color: 0x661c52,
            })
        );

        this.frame.position.set(
            this.position.xOne + this.width / 2,
            this.position.yOne + this.height / 2,
            0.08
        );

        this.object.add(this.frame);
    }

    // Function to override
    customTriggerIn() {}

    // Function to override
    customTriggerOut() {}

    // Function to override
    customEnterEvent() {}

    triggerIn() {
        window.addEventListener("keydown", this.enterEvent);
        this.frame.material.color.setHex(0xff44cc);
        this.customTriggerIn();
    }

    triggerOut() {
        window.removeEventListener("keydown", this.enterEvent);
        this.frame.material.color.setHex(0x661c52);
        this.customTriggerOut();
    }

    checkPosition() {
        this.time.on("tick", () => {
            if (
                this.car.models.chassis.position.x >= this.position.xOne &&
                this.car.models.chassis.position.x <= this.position.xTwo &&
                this.car.models.chassis.position.y >= this.position.yOne &&
                this.car.models.chassis.position.y <= this.position.yTwo
            ) {
                if (!this.in) {
                    this.triggerIn();
                }
                this.in = true;
            } else {
                if (this.in) {
                    this.triggerOut();
                }
                this.in = false;
            }
        });
    }
}
