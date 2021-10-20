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
                transparent: true,
                color: 0xff44cc,
            })
        );

        this.mesh.position.set(
            (this.position.xOne + this.position.xTwo) / 2,
            (this.position.yOne + this.position.yTwo) / 2,
            4
        );

        this.mesh.rotation.x = Math.PI / 2;
        this.object.add(this.mesh);
    }

    // Light up parking lot
    customTriggerIn() {}

    // Off the parking lot light
    customTriggerOut() {}

    customEnterEvent() {
        window.open("https://www.github.com/sinevmaxim", "_blank");
    }
}
