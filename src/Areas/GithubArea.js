import Area from "./Area";
import * as THREE from "three";

export default class GithubArea extends Area {
    constructor(args) {
        super(args);
        this.plane = new THREE.PlaneBufferGeometry(1, 1, 1, 1);
        this.mesh = new THREE.Mesh(
            this.plane,
            new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                alphaMap: this.files.items.githubLogo,
            })
        );
        this.object.add(this.mesh);
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
