import EventEmmiter from "./EventEmmiter";

export default class TimeEventEmmiter extends EventEmmiter {
    constructor() {
        super();

        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        this.delta = 16;

        this.tick = this.tick.bind(this);
        this.tick();
    }

    tick() {
        window.requestAnimationFrame(this.tick);

        const current = Date.now();
        this.delta = current - this.current;
        this.elapsed = current - this.start;
        this.current = current;

        if (this.delta > 60) {
            this.delta = 60;
        }
        this.emit("tick");
    }
}
