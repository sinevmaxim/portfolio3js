import Area from "./Area";
import * as THREE from "three";

export default class PhotoShootArea extends Area {
    constructor(args) {
        super(args);
    }

    // Light up parking lot
    customTriggerIn() {}

    // Off the parking lot light
    customTriggerOut() {}

    customEnterEvent() {}
}
