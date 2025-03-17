import { BUTTON_DOWN, BUTTON_HELD, BUTTON_UP, buttonHeldDict, caseButtons } from "./button-manager.js";
import { canvasElement } from "./canvas-handler.js";

export const buttonTouched = {}

const BUTTON_DIR_LEFT = 'left'
const BUTTON_DIR_RIGHT = 'right'
const BUTTON_DIR_DOWN = 'down'
const BUTTON_DIR_UP = 'up'
const BUTTON_SQUARE = 'square'
const BUTTON_CIRCLE = 'circle'
const BUTTON_CROSS = 'cross'
const BUTTON_TRIANGLE = 'triangle'

const buttonList = [
    BUTTON_DIR_LEFT,
    BUTTON_DIR_RIGHT,
    BUTTON_DIR_DOWN,
    BUTTON_DIR_UP,
    BUTTON_SQUARE,
    BUTTON_CIRCLE,
    BUTTON_CROSS,
    BUTTON_TRIANGLE,
]

document.addEventListener("touchstart", (event) => {
    for (let i = 0; i < event.touches.length; i++){
        const xInCanv = event.touches[i].clientX - parseInt(canvasElement.style.left, 10)
        const yInCanv = event.touches[i].clientY - parseInt(canvasElement.style.top, 10)
        caseButtons.forEach(button => {
            if (
                xInCanv > button.posXMobl && xInCanv < button.posXMobl + button.widthMobl && 
                yInCanv > button.posYMobl && yInCanv < button.posYMobl + button.heightMobl
            ){
                buttonTouched[button.icon] = true
            }
        })
    }
})

document.addEventListener("touchend", (event) => {
    for (let i = 0; i < event.changedTouches.length; i++){
        const xInCanv = event.changedTouches[i].clientX - parseInt(canvasElement.style.left, 10)
        const yInCanv = event.changedTouches[i].clientY - parseInt(canvasElement.style.top, 10)
        caseButtons.forEach(button => {
            if (
                xInCanv > button.posXMobl && xInCanv < button.posXMobl + button.widthMobl && 
                yInCanv > button.posYMobl && yInCanv < button.posYMobl + button.heightMobl
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
        } else {
            buttonHeldDict[button] = BUTTON_UP
        }
    });
}