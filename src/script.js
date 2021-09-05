import "./style.css";
import Application from "./Application";

window.application = new Application({
    canvas: document.querySelector(".webgl"),
});
