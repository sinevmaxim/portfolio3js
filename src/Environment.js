import * as THREE from "three";
import environmentFragmentShader from "./shaders/environment/fragment.glsl";
import environmentVertexShader from "./shaders/environment/vertex.glsl";
import sunFragmentShader from "./shaders/sun/fragment.glsl";
import sunVertexShader from "./shaders/sun/vertex.glsl";

export default class Environment {
    constructor(args) {
        // this.car = args.car;
        this.physics = args.physics;
        this.time = args.time;

        this.object = new THREE.Object3D();
        this.object.matrixAutoUpdate = false;

        this.initEnvironment();
        // this.updatePosition();
    }

    initEnvironment() {
        this.geometry = new THREE.PlaneBufferGeometry(2, 2, 10, 10);
        this.material = new THREE.ShaderMaterial({
            vertexShader: environmentVertexShader,
            fragmentShader: environmentFragmentShader,
            depthTest: false,
        });
        this.environment = new THREE.Mesh(this.geometry, this.material);
        this.environment.frustumCulled = false;

        this.sunGeometry = new THREE.SphereBufferGeometry(10, 256, 256);
        this.sunMaterial = new THREE.ShaderMaterial({
            vertexShader: sunVertexShader,
            fragmentShader: sunFragmentShader,
        });

        this.sun = new THREE.Mesh(this.sunGeometry, this.sunMaterial);
        this.sun.position.set(0, 212, 60);

        this.object.add(this.environment);
        this.object.add(this.sun);
    }

    // updatePosition() {
    //     this.time.on("tick", () => {
    //         this.cubeEnvironment.position.copy(
    //             this.physics.floor.model.position
    //         );
    //     });
    // }
}
