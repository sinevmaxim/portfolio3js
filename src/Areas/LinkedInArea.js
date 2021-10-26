import Area from "./Area";
import * as THREE from "three";

export default class LinkedInArea extends Area {
    constructor(args) {
        super(args);

        this.changeLogo();
    }

    changeLogo() {
        this.logo.material.alphaMap = this.files.items.linkedInLogo;
        this.logo.material.color.setHex(0xff44cc);
        this.logo.material.needsUpdate = true;
    }

    // Light up parking lot
    customTriggerIn() {}

    // Off the parking lot light
    customTriggerOut() {}

    customEnterEvent() {
        window.open("https://www.linkedin.com/in/maxim-sinev/", "_blank");
    }
}
