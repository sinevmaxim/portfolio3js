import * as THREE from "three";

export default class InfoText {
    constructor(args) {
        this.position = { x: args.x, y: args.y, z: args.z };
        this.geometry = args.geometry;
        this.text = args.text;

        this.object = new THREE.Object3D();

        this.initText();
    }

    initText() {
        this.text = new THREE.Mesh(
            this.geometry,
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                map: this.text,
            })
        );

        this.text.position.set(
            this.position.x,
            this.position.y,
            this.position.z
        );

        this.object.add(this.text);
    }
}
