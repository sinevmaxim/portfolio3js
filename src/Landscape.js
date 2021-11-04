import * as THREE from "three";
import InfoTextGenerator from "./InfoTextGenerator";
import PalmTreeGenerator from "./PalmTreeGenerator";
import HouseGenerator from "./HouseGenerator";
import CollectableGenerator from "./Collectable/CollectableGenerator";

export default class Landscape {
    constructor(args) {
        this.time = args.time;
        this.sound = args.sound;
        this.physics = args.physics;
        this.files = args.files;
        this.car = args.car;

        this.object = new THREE.Object3D();

        this.generate();
    }

    generate() {
        this.initInfo();
        this.initPalmTrees();
        this.initHouses();
        this.initCollectables();
    }

    initInfo() {
        this.infoTextGenerator = new InfoTextGenerator({
            files: this.files,
        });

        this.object.add(this.infoTextGenerator.object);
    }

    initPalmTrees() {
        this.palmTreeGenerator = new PalmTreeGenerator({
            physics: this.physics,
            files: this.files,
            sound: this.sound,
            ammount: 10,
        });

        this.object.add(this.palmTreeGenerator.object);
    }

    initHouses() {
        this.houseGenerator = new HouseGenerator({
            physics: this.physics,
            files: this.files,
            sound: this.sound,
            car: this.car,
            // time: this.time,
            ammount: 5,
        });

        this.object.add(this.houseGenerator.object);
    }

    initCollectables() {
        this.collectableGenerator = new CollectableGenerator({
            files: this.files,
            physics: this.physics,
            sound: this.sound,
            car: this.car,
            time: this.time,
        });

        this.object.add(this.collectableGenerator.object);
    }
}
