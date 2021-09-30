import GithubArea from "./GithubArea";
import LinkedInArea from "./LinkedInArea";
import PhotoShootArea from "./PhotoShootArea";

export default class AreasInitializer {
    constructor(args) {
        this.time = args.time;
        this.files = args.files;
        this.car = args.car;

        this.areas = {};

        this.createAreas();
    }

    createAreas() {
        this.areas.photoShoot = new PhotoShootArea({
            time: this.time,
            files: this.files,
            car: this.car,
            position: { xOne: 10, yOne: 10, xTwo: 30, yTwo: 30 },
        });
        this.areas.githubArea = new GithubArea({
            time: this.time,
            files: this.files,
            car: this.car,
            position: { xOne: -30, yOne: -30, xTwo: -10, yTwo: -10 },
        });
        this.areas.linkedInArea = new LinkedInArea({
            time: this.time,
            files: this.files,
            car: this.car,
            position: { xOne: -10, yOne: -10, xTwo: 10, yTwo: 10 },
        });
    }
}
