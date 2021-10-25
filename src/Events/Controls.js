export default class Controls {
    constructor() {
        this.action = {};
        this.keyDownEvent = (event) => {
            switch (event.keyCode) {
                case 38: // forward
                    this.action.forward = true;
                    break;

                case 40: // backward
                    this.action.back = true;
                    break;

                case 39: // right
                    this.action.right = true;
                    break;

                case 37: // left
                    this.action.left = true;
                    break;
            }
        };

        this.keyUpEvent = (event) => {
            switch (event.keyCode) {
                case 38: // forward
                    this.action.forward = false;
                    break;

                case 40: // backward
                    this.action.back = false;
                    break;

                case 39: // right
                    this.action.right = false;
                    break;

                case 37: // left
                    this.action.left = false;
                    break;
            }
        };

        document.addEventListener("keydown", this.keyDownEvent);
        document.addEventListener("keyup", this.keyUpEvent);
    }
}
