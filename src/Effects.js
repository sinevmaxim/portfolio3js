import * as THREE from "three";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";

export default class Effects {
    constructor(args) {
        this.renderer = args.renderer;
        this.camera = args.camera;
        this.sizes = args.sizes;
        this.time = args.time;
        this.scene = args.scene;

        let renderTarget = null;

        if (
            this.renderer.getPixelRatio() === 1 &&
            this.renderer.capabilities.isWebGL2
        ) {
            renderTarget = new THREE.WebGLMultisampleRenderTarget(800, 600, {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                format: THREE.RGBAFormat,
                encoding: THREE.sRGBEncoding,
            });
        } else {
            renderTarget = new THREE.WebGLRenderTarget(800, 600, {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                format: THREE.RGBAFormat,
                encoding: THREE.sRGBEncoding,
            });
        }
        //Composer
        this.effectComposer = new EffectComposer(this.renderer, renderTarget);

        this.effectComposer.setSize(this.sizes.width, this.sizes.height);
        this.effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        //Passes
        this.renderPass = new RenderPass(
            this.scene,
            this.camera.cameraInstance
        );
        this.effectComposer.addPass(this.renderPass);

        this.rgbShiftPass = new ShaderPass(RGBShiftShader);
        this.effectComposer.addPass(this.rgbShiftPass);

        this.time.on("tick", () => {
            this.effectComposer.render();
        });
    }
}
