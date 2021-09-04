export default class EventEmmiter {
    constructor() {
        this._event = {};
    }

    on(_name, callback) {
        console.info(`Assigned ${_name} event`);
        this._event[_name] = this._event[_name] || [];
        this._event[_name].push(callback);
    }

    off(_name, listener) {
        console.info(`Deleted ${listener} from ${_name} event`);
        this._event[_name] = this._event[_name].filter((l) => l !== listener);
    }

    emit(_name, data) {
        console.info(`Emmited ${_name} event`);
        for (const event of _event[_name]) {
            event(data);
        }
    }
}
