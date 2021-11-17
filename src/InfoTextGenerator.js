import * as THREE from "three";
import InfoText from "./InfoText";

export default class InfoTextGenerator {
    constructor(args) {
        this.files = args.files;

        this.object = new THREE.Object3D();

        this.generate();
    }

    generate() {
        this.geometry = new THREE.PlaneBufferGeometry(10, 10, 1, 1);

        this.movementInfoText = new InfoText({
            text: this.files.items.movementInfoText,
            geometry: this.geometry,
            x: 0,
            y: -10,
            z: 1,
        });

        this.engineStartInfoText = new InfoText({
            text: this.files.items.engineStartInfoText,
            geometry: this.geometry,
            x: -5,
            y: -7,
            z: 1,
        });

        this.popUpLightsInfoText = new InfoText({
            text: this.files.items.popUpLightsInfoText,
            geometry: this.geometry,
            x: 10,
            y: -10,
            z: 1,
        });

        this.object.add(
            this.popUpLightsInfoText.object,
            this.engineStartInfoText.object,
            this.movementInfoText.object
        );
    }
}
