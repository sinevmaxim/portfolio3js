import Area from "./Area";

export default class GithubArea extends Area {
    constructor(args) {
        super(args);
    }

    // Light up parking lot
    customTriggerIn() {
        console.log("You are in the area of Github");
    }

    // Off the parking lot light
    customTriggerOut() {
        console.log("You are out of the area of Github");
    }

    customEnterEvent() {
        window.open("https://www.github.com/sinevmaxim", "_blank");
    }
}
