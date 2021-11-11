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
        this.updateSun();
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

        this.sunGeometry = new THREE.PlaneBufferGeometry(10, 10, 10, 10);
        this.sunMaterial = new THREE.ShaderMaterial({
            vertexShader: sunVertexShader,
            fragmentShader: sunFragmentShader,
            side: THREE.DoubleSide,
            uniforms: {
                uTime: { value: 0 },
            },
            transparent: true,
        });

        this.sun = new THREE.Mesh(this.sunGeometry, this.sunMaterial);
        this.sun.position.set(0, 212, 60);

        this.object.add(this.environment);
        this.object.add(this.sun);
    }

    updateSun() {
        this.time.on("tick", () => {
            this.sunMaterial.uniforms.uTime.value = this.time.elapsed;
        });
    }
}
