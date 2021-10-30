import Area from "./Area";

export default class PhotoShootArea extends Area {
    constructor(args) {
        super(args);
        this.camera = args.camera;

        this.changeLogo();
    }

    changeLogo() {
        this.logo.material.alphaMap = this.files.items.photoshootLogo;
        this.logo.material.color.setHex(0xff44cc);
        this.logo.material.needsUpdate = true;
    }

    customTriggerIn() {}

    customTriggerOut() {}

    customEnterEvent() {
        this.car.photoshoot();
        this.camera.startPhotoshoot();
    }
}
