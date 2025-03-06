import { ctx, renderScale } from "./canvas-handler.js";
import { getImg } from "./image-store.js";
import { keyIsPressed } from "./key-handler.js";
import * as timeManager from "./time-manager.js"

const consoleCase = {
    imgSrc: '/handheld/images/case-pc/case-pc.png',
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
        key: 'w',
    },
    {
        name: 'down',
        width: 25,
        height: 34,
        posX: 35,
        posY: 116,
        key: 's',
    },
    {
        name: 'left',
        width: 31,
        height: 28,
        posX: 13,
        posY: 99,
        key: 'a',
    },
    {
        name: 'right',
        width: 31,
        height: 28,
        posX: 51,
        posY: 100,
        key: 'd',
    },    
    {
        name: 'triangle',
        width: 29,
        height: 32,
        posX: 384,
        posY: 77,
        key: '8',
    },
    {
        name: 'cross',
        width: 29,
        height: 32,
        posX: 384,
        posY: 121,
        key: '5',
    },
    {
        name: 'square',
        width: 29,
        height: 32,
        posX: 362,
        posY: 99,
        key: '4',
    },
    {
        name: 'circle',
        width: 29,
        height: 32,
        posX: 406,
        posY: 99,
        key: '6',
    },
]

function renderButtons(){
    buttons.forEach(button => {
        let state = 'off'
        if (keyIsPressed[button.key]){
            state = 'on'
        }
        const img = getImg('/handheld/images/case-pc/' + button.name + '-button-' +  state + '.png')
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
    const img = getImg(consoleCase.imgSrc)
    ctx.drawImage(img, 0, 0, consoleCase.originalWidth*renderScale, consoleCase.originalHeight * renderScale);
    renderButtons()
}