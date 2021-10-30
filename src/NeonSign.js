import SceneNeonObject from "./SceneNeonObject";
import * as THREE from "three";

export default class NeonSign extends SceneNeonObject {
    constructor(args) {
        this.material = THREE.MeshBasicMaterial();
        this.geometry = THREE.SphereBufferGeometry(5, 32, 32);

        this.mesh = THREE.Mesh(this.geometry, this.material);
        this.object.add(this.mesh);
    }
}
