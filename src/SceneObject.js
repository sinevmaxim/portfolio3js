import * as THREE from 'three' 

export default class SceneObject {
    constructor(){
        this.position = new THREE.Vector3()
        this.object = new THREE.Object3D()
    }
}
