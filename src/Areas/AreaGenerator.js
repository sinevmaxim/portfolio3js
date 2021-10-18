import GithubArea from "./GithubArea";
import LinkedInArea from "./LinkedInArea";
import PhotoShootArea from "./PhotoShootArea";
import * as THREE from "three";

export default class AreaGenerator {
    constructor(args) {
        this.time = args.time;
        this.files = args.files;
        this.car = args.car;

        this.object = new THREE.Object3D();
        this.areas = {};

        this.generate();
    }

    generate() {
        this.areas.photoShoot = new PhotoShootArea({
            time: this.time,
            files: this.files,
            car: this.car,
            position: { xOne: 10, yOne: 10, xTwo: 30, yTwo: 30 },
        });
        // this.object.add(this.areas.photoShoot.object);

        this.areas.githubArea = new GithubArea({
            time: this.time,
            files: this.files,
            car: this.car,
            position: { xOne: -30, yOne: -30, xTwo: -10, yTwo: -10 },
        });
        this.object.add(this.areas.githubArea.object);

        this.areas.linkedInArea = new LinkedInArea({
            time: this.time,
            files: this.files,
            car: this.car,
            position: { xOne: -10, yOne: -10, xTwo: 10, yTwo: 10 },
        });
        // this.object.add(this.areas.linkedInArea.object);
    }
}
