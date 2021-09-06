import EventEmmiter from "./EventEmmiter";

export default class TimeEventEmmiter extends EventEmmiter {
    constructor() {
        super();

        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        this.delta = 0;

        this.tick = this.tick.bind(this);
        this.tick();
    }

    tick() {
        window.requestAnimationFrame(this.tick);

        const current = Date.now();
        this.delta = current - this.current;
        this.elapsed = current - this.start;
        this.current = current;

        this.emit("tick");
    }
}
