export default class EventEmmiter {
    constructor() {
        this._event = {};
    }

    on(_name, callback) {
        this._event[_name] = this._event[_name] || [];
        this._event[_name].push(callback);
    }

    off(_name, listener) {
        this._event[_name] = this._event[_name].filter((l) => l !== listener);
    }

    emit(_name, data) {
        this._event[_name] = this._event[_name] || [];

        const trigger = (callback) => {
            callback(data);
        };
        this._event[_name].forEach(trigger);
    }
}
