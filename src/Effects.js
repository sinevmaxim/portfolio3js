import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import abberationFragmentShader from "./shaders/chromaticAbberation/fragment.glsl";
import abberationVertexShader from "./shaders/chromaticAbberation/vertex.glsl";

export default class Effects {
    constructor(args) {
        this.renderer = args.renderer;
        this.camera = args.camera;
        this.sizes = args.sizes;
        this.time = args.time;
        this.scene = args.scene;

        this.renderTarget = null;

        if (
            this.renderer.getPixelRatio() === 1 &&
            this.renderer.capabilities.isWebGL2
        ) {
            this.renderTarget = new THREE.WebGLMultisampleRenderTarget(
                this.sizes.width,
                this.sizes.height,
                {
                    minFilter: THREE.LinearFilter,
                    magFilter: THREE.LinearFilter,
                    format: THREE.RGBAFormat,
                    encoding: THREE.sRGBEncoding,
                }
            );
        } else {
            this.renderTarget = new THREE.WebGLRenderTarget(
                this.sizes.width,
                this.sizes.height,
                {
                    minFilter: THREE.LinearFilter,
                    magFilter: THREE.LinearFilter,
                    format: THREE.RGBAFormat,
                    // encoding: THREE.sRGBEncoding,
                }
            );
        }
        //Composer
        this.effectComposer = new EffectComposer(
            this.renderer,
            this.renderTarget
        );

        this.effectComposer.setSize(this.sizes.width, this.sizes.height);
        this.effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        //Passes
        this.renderPass = new RenderPass(
            this.scene,
            this.camera.cameraInstance
        );
        this.effectComposer.addPass(this.renderPass);

        this.rgbShiftPass = new ShaderPass({
            vertexShader: abberationVertexShader,
            fragmentShader: abberationFragmentShader,
            uniforms: {
                uResolution: {
                    value: new THREE.Vector3(
                        this.sizes.width,
                        this.sizes.height,
                        1
                    ),
                },
                uChannel0: { value: this.renderTarget },
            },
        });
        this.effectComposer.addPass(this.rgbShiftPass);

        this.time.on("tick", () => {
            this.rgbShiftPass.material.uniforms.uResolution.value.set(
                this.sizes.width,
                this.sizes.height,
                1
            );
            // this.rgbShiftPass.material.uniforms.uChannel0.value.set(
            //     this.renderTarget
            // );
            this.effectComposer.render();
            TWEEN.update();
        });

        window.addEventListener("resize", () => {
            this.effectComposer.setSize(this.sizes.width, this.sizes.height);
            this.effectComposer.setPixelRatio(
                Math.min(window.devicePixelRatio, 2)
            );
        });
    }
}
