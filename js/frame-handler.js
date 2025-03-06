import { render } from "./rendering.js";
import { updateCanvas } from "./canvas-handler.js";
import { keyHandler } from "./game/game-manager.js";


export function frame(){
    updateCanvas()
    keyHandler()
    render()
    requestAnimationFrame(frame);
}