export default class Area {
    constructor(args) {
        this.time = args.time;
        this.files = args.files;
        this.car = args.car;
        this.position = args.position;
        this.in = false;

        this.enterEvent = (event) => {
            if (event.keyCode == 13) {
                this.customEnterEvent();
            }
        };

        this.checkPosition();
    }

    // Function to override
    customTriggerIn() {}

    // Function to override
    customTriggerOut() {}

    // Function to override
    customEnterEvent() {}

    triggerIn() {
        window.addEventListener("keydown", this.enterEvent);
        this.customTriggerIn();
    }

    triggerOut() {
        window.removeEventListener("keydown", this.enterEvent);
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
