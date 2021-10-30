import GithubArea from "./GithubArea";
import LinkedInArea from "./LinkedInArea";
import PhotoShootArea from "./PhotoShootArea";
import * as THREE from "three";

export default class AreaGenerator {
    constructor(args) {
        this.time = args.time;
        this.files = args.files;
        this.car = args.car;
        this.camera = args.camera;

        this.object = new THREE.Object3D();
        this.areas = {};

        this.generate();
    }

    generate() {
        this.areas.photoShoot = new PhotoShootArea({
            time: this.time,
            files: this.files,
            car: this.car,
            camera: this.camera,
            position: { xOne: 3, yOne: 3, xTwo: 7, yTwo: 7 },
        });
        this.object.add(this.areas.photoShoot.object);

        this.areas.githubArea = new GithubArea({
            time: this.time,
            files: this.files,
            car: this.car,
            position: { xOne: -7, yOne: -7, xTwo: -3, yTwo: -3 },
        });
        this.object.add(this.areas.githubArea.object);

        this.areas.linkedInArea = new LinkedInArea({
            time: this.time,
            files: this.files,
            car: this.car,
            position: { xOne: -3, yOne: -3, xTwo: 3, yTwo: 3 },
        });
        this.object.add(this.areas.linkedInArea.object);
    }
}
