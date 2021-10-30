import Area from "./Area";
import * as THREE from "three";

export default class GithubArea extends Area {
    constructor(args) {
        super(args);

        this.changeLogo();
    }

    changeLogo() {
        this.logo.material.alphaMap = this.files.items.githubLogo;
        this.logo.material.color.setHex(0xff44cc);
        this.logo.material.needsUpdate = true;
    }

    customTriggerIn() {}

    customTriggerOut() {}

    customEnterEvent() {
        window.open("https://www.github.com/sinevmaxim", "_blank");
    }
}
