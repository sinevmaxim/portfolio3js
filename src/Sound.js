import { Howler, Howl } from "howler";

export default class Sound {
    constructor() {
        Howler.volume(0.65);
        this.car = {};
        this.music = new Howl({
            src: ["/audio/music/music.mp3"],
            volume: 0.4,
            loop: true,
        });

        this.car.engine = new Howl({
            src: ["/audio/car/car_engine.mp3"],
            volume: 0.1,
        });

        this.car.engineHigh = new Howl({
            src: ["/audio/car/car_engine_high.mp3"],
            volume: 0.3,
        });

        this.car.engine.on("end", () => {
            this.car.engine.seek(0.25);
            this.car.engine.play();
        });

        this.car.engineHigh.on("end", () => {
            this.car.engineHigh.seek(0.2);
            this.car.engineHigh.play();
        });
    }
}
