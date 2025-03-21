import { BUTTON_DOWN, BUTTON_HELD, BUTTON_UP, buttonHeldDict, caseButtons } from "./button-manager.js";
import { canvasElement, renderScale, scaleMultiplyer } from "./canvas-handler.js";

export const buttonTouched = {}

const BUTTON_DIR_LEFT = 'left'
const BUTTON_DIR_RIGHT = 'right'
const BUTTON_DIR_DOWN = 'down'
const BUTTON_DIR_UP = 'up'
const BUTTON_SQUARE = 'square'
const BUTTON_CIRCLE = 'circle'
const BUTTON_CROSS = 'cross'
const BUTTON_TRIANGLE = 'triangle'
const BUTTON_START = 'start'

const buttonList = [
    BUTTON_DIR_LEFT,
    BUTTON_DIR_RIGHT,
    BUTTON_DIR_DOWN,
    BUTTON_DIR_UP,
    BUTTON_SQUARE,
    BUTTON_CIRCLE,
    BUTTON_CROSS,
    BUTTON_TRIANGLE,
    BUTTON_START,
]

document.addEventListener("touchstart", (event) => {
    for (let i = 0; i < event.touches.length; i++){
        const xInCanv = event.touches[i].clientX;
        const yInCanv = event.touches[i].clientY;
        const multiplyer = innerWidth / (320 * renderScale)
        caseButtons.forEach(button => {
            if (
                xInCanv > (button.posXMobl) * multiplyer && xInCanv < (button.posXMobl + button.widthMobl) * multiplyer && 
                yInCanv > (button.posYMobl) * multiplyer && yInCanv < (button.posYMobl + button.heightMobl) * multiplyer
            ){
                buttonTouched[button.icon] = true
            }
        })
    }
})

document.addEventListener("touchend", (event) => {
    for (let i = 0; i < event.changedTouches.length; i++){
        const xInCanv = event.changedTouches[i].clientX;
        const yInCanv = event.changedTouches[i].clientY;
        const multiplyer = innerWidth / (320 * renderScale)
        caseButtons.forEach(button => {
            if (
                xInCanv > (button.posXMobl) * multiplyer && xInCanv < (button.posXMobl + button.widthMobl) * multiplyer && 
                yInCanv > (button.posYMobl) * multiplyer && yInCanv < (button.posYMobl + button.heightMobl) * multiplyer
            ){
                buttonTouched[button.icon] = false
            }
        })
    }
})

export function touchHandler(){
    buttonList.forEach(button => {
        if (buttonTouched[button]){
            if (buttonHeldDict[button] != BUTTON_UP ){
                buttonHeldDict[button] = BUTTON_HELD
            } else {
                buttonHeldDict[button] = BUTTON_DOWN
            }
            return
        } else {
            buttonHeldDict[button] = BUTTON_UP
        }
    });
}