import { ctx, renderScale } from "./canvas-handler.js";
import { keyIsPressed } from "./key-handler.js";
import sprites, { findSprite } from "./sprites.js";

const consoleCase = {
    originalWidth: 446,
    originalHeight: 269,
}

export const buttons = [
    {
        name: 'up',
        width: 25,
        height: 34,
        posX: 35,
        posY: 77,
        keys: ['w'],
    },
    {
        name: 'down',
        width: 25,
        height: 34,
        posX: 35,
        posY: 116,
        keys: ['s'],
    },
    {
        name: 'left',
        width: 31,
        height: 28,
        posX: 13,
        posY: 99,
        keys: ['a'],
    },
    {
        name: 'right',
        width: 31,
        height: 28,
        posX: 51,
        posY: 100,
        keys: ['d'],
    },    
    {
        name: 'triangle',
        width: 29,
        height: 32,
        posX: 384,
        posY: 77,
        keys: ['8', 'i'],
    },
    {
        name: 'cross',
        width: 29,
        height: 32,
        posX: 384,
        posY: 121,
        keys: ['5', 'k'],
    },
    {
        name: 'square',
        width: 29,
        height: 32,
        posX: 362,
        posY: 99,
        keys: ['4', 'j'],
    },
    {
        name: 'circle',
        width: 29,
        height: 32,
        posX: 406,
        posY: 99,
        keys: ['6', 'l'],
    },
]

function renderButtons(){
    buttons.forEach(button => {
        let state = 'off'
        for (let i = 0; i < button.keys.length; i++){
            if (keyIsPressed[button.keys[i]]){
                state = 'on'
            }
        }
        const img = findSprite(button.name + '-button-' + state).img
        ctx.drawImage(
            img,
            button.posX * renderScale,
            button.posY * renderScale,
            button.width * renderScale,
            button.height * renderScale,
        )
    });
}

export function renderCase () {
    const img = sprites.case_pc.img
    ctx.drawImage(img, 0, 0, consoleCase.originalWidth*renderScale, consoleCase.originalHeight * renderScale);
    renderButtons()
}