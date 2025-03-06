import { renderCase } from "./case-render.js";
import { renderGame } from "./game/game-manager.js";
import { canvasElement, clearCanvas, renderScale } from "./canvas-handler.js";
import { ctx } from "./canvas-handler.js";
import { timedCondition } from "./time-manager.js";

export function render(){
    timedCondition(()=>{})
    clearCanvas();
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
    renderGame()
    renderCase()
}
