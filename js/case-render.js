import { caseButtons } from "./button-manager.js";
import { ctx, layout, renderScale } from "./canvas-handler.js";
import sprites, { findSprite } from "./sprites.js";
import { buttonHeldDict } from "./button-manager.js";

const pcCase = {
    originalWidth: 446,
    originalHeight: 269,
}

const mobileCase = {
    originalWidth: 320,
    originalHeight: 513,
}

function renderButtons(){
        caseButtons.forEach(button => {
            let state = 'off'
            for (let i = 0; i < button.keys.length; i++){
                if (buttonHeldDict[button.icon]){
                    state = 'on'
                }
            }
            const img = findSprite(button.sprite + '-button-' + state + '-' + layout).img
            if (layout == 'pc') {
                ctx.drawImage(
                    img,
                    button.posXPC * renderScale,
                    button.posYPC * renderScale,
                    button.widthPC * renderScale,
                    button.heightPC * renderScale,
                )
            } else {
                ctx.drawImage(
                    img,
                    button.posXMobl * renderScale,
                    button.posYMobl * renderScale,
                    button.widthMobl * renderScale,
                    button.heightMobl * renderScale,
                )
            }
        });

}

export function renderCase () {
    let img;
    let consoleCase;
    if (layout == 'pc'){
        img = sprites.case_pc.img
        consoleCase = pcCase
    } else {
        img = sprites.case_mobile.img
        consoleCase = mobileCase
    }
    ctx.drawImage(img, 0, 0, consoleCase.originalWidth*renderScale, consoleCase.originalHeight * renderScale);
    renderButtons()
}