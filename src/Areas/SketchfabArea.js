import Area from "./Area";

export default class SketchfabArea extends Area {
    constructor(args) {
        super(args);

        this.changeLogo();
    }

    changeLogo() {
        this.logo.material.alphaMap = this.files.items.sketchfabLogo;
        this.logo.material.color.setHex(0xff44cc);
        this.logo.material.needsUpdate = true;
    }

    customTriggerIn() {}

    customTriggerOut() {}

    customEnterEvent() {
        window.open("https://sketchfab.com/praymask", "_blank");
    }
}
