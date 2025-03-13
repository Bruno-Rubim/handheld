import { render } from "./rendering.js";
import { updateCanvas } from "./canvas-handler.js";


export function frame(){
    updateCanvas()
    render()
    requestAnimationFrame(frame);
}