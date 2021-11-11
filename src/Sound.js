import { Howler, Howl } from "howler";
import * as THREE from "three";

export default class Sound {
    constructor() {
        Howler.volume(0.7);
        this.car = {};
        this.tree = {};
        this.house = {};

        this.music = new Howl({
            src: ["/audio/music/music.mp3"],
            volume: 0.1,
        });

        this.tree.collision = new Howl({
            src: ["/audio/tree/tree_collision.wav"],
            volume: 0.1,
        });

        this.house.collision = new Howl({
            src: ["/audio/house/house_collision.mp3"],
            volume: 0.1,
        });

        this.car.engineStart = new Howl({
            src: ["/audio/car/car_engine_start.mp3"],
            volume: 0.25,
            loop: false,
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
