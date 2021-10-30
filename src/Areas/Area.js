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

        // // field of view problem with this keyword
        // this.enterEvent = (event) => {
        //     if (event.keyCode == 13) {
        //         this.customEnterEvent();
        //     }
        // };

        this.initEvents();
        this.initFrame();
        this.initLogo();
        this.checkPosition();
    }

    initEvents() {
        this.enterEvent = (event) => {
            if (event.keyCode == 13) {
                this.customEnterEvent();
            }
        };
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
    customTriggerIn() {
        throw new Error(
            "Abstract function error: This function must be overriden"
        );
    }

    // Function to override
    customTriggerOut() {
        throw new Error(
            "Abstract function error: This function must be overriden"
        );
    }

    // Function to override
    customEnterEvent() {
        throw new Error(
            "Abstract function error: This function must be overriden"
        );
    }

    triggerIn() {
        window.addEventListener("keydown", this.enterEvent);
        this.frame.material.color.setHex(0xff44cc);
        this.logo.visible = false;
        this.enterKeyLogo.visible = true;

        this.customTriggerIn();
    }

    triggerOut() {
        window.removeEventListener("keydown", this.enterEvent);
        this.frame.material.color.setHex(0x661c52);
        this.logo.visible = true;
        this.enterKeyLogo.visible = false;

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

    initLogo() {
        this.plane = new THREE.PlaneBufferGeometry(1, 1, 1, 1);

        this.logo = new THREE.Mesh(
            this.plane,
            new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                transparent: true,
            })
        );

        this.enterKeyLogo = new THREE.Mesh(
            this.plane,
            new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: this.files.items.enterKeyLogo,
                transparent: true,
            })
        );
        this.enterKeyLogo.visible = false;

        this.logo.position.set(
            (this.position.xOne + this.position.xTwo) / 2,
            (this.position.yOne + this.position.yTwo) / 2,
            4
        );

        this.logo.rotation.x = Math.PI / 2;
        this.enterKeyLogo.rotation.x = Math.PI / 2;

        this.object.add(this.logo, this.enterKeyLogo);

        this.time.on("tick", () => {
            this.logo.rotation.y += this.time.delta / 1000;
            this.logo.position.z = 4 + Math.sin(this.time.elapsed * 0.001) / 3;
            this.enterKeyLogo.position.copy(this.logo.position);
        });
    }
}
