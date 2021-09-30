import Area from "./Area";

export default class PhotoShootArea extends Area {
    constructor(args) {
        super(args);
    }

    // Light up parking lot
    customTriggerIn() {
        console.log("You are in the area of PhotoShoot");
    }

    // Off the parking lot light
    customTriggerOut() {
        console.log("You are out of the area of PhotoShoot");
    }

    customEnterEvent() {
        console.log("PHOTO SHOOT");
    }
}
