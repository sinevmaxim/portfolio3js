import Area from "./Area";

export default class TwitterArea extends Area {
    constructor(args) {
        super(args);

        this.changeLogo();
    }

    changeLogo() {
        this.logo.material.alphaMap = this.files.items.twitterLogo;
        this.logo.material.color.setHex(0xff44cc);
        this.logo.material.needsUpdate = true;
    }

    customTriggerIn() {}

    customTriggerOut() {}

    customEnterEvent() {
        window.open("https://www.twitter.com/max_sinev", "_blank");
    }
}
