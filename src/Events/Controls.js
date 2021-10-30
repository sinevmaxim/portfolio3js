export default class Controls {
    constructor() {
        this.action = {};
        this.keyDownEvent = (event) => {
            switch (event.keyCode) {
                case 38:
                    this.action.forward = true;
                    break;

                case 40:
                    this.action.back = true;
                    break;

                case 39:
                    this.action.right = true;
                    break;

                case 37:
                    this.action.left = true;
                    break;

                case 78:
                    this.action.engine = true;
                    break;
            }
        };

        this.keyUpEvent = (event) => {
            switch (event.keyCode) {
                case 38:
                    this.action.forward = false;
                    break;

                case 40:
                    this.action.back = false;
                    break;

                case 39:
                    this.action.right = false;
                    break;

                case 37:
                    this.action.left = false;
                    break;
                case 78:
                    this.action.engine = false;
                    break;
            }
        };

        document.addEventListener("keydown", this.keyDownEvent);
        document.addEventListener("keyup", this.keyUpEvent);
    }
}
