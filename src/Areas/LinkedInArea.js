import Area from "./Area";

export default class LinkedInArea extends Area {
    constructor(args) {
        super(args);
    }

    // Light up parking lot
    customTriggerIn() {
        console.log("You are in the area of LinkedIn");
    }

    // Off the parking lot light
    customTriggerOut() {
        console.log("You are out of the area of LinkedIn");
    }

    customEnterEvent() {
        window.open("https://www.linkedin.com/in/maxim-sinev/", "_blank");
    }
}
