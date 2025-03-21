import { BUTTON_UP, BUTTON_DOWN, BUTTON_HELD, buttonHeldDict } from "./button-manager.js";

export let keyIsPressed = {}

window.addEventListener("keydown", function(event) {
    keyIsPressed[event.key] = true;
});

window.addEventListener("keyup", function(event) {
    keyIsPressed[event.key] = false;
});

const BUTTON_DIR_LEFT = {keys:['a', 'A'], icon:'left'}
const BUTTON_DIR_RIGHT = {keys:['d', 'D'], icon:'right'}
const BUTTON_DIR_DOWN = {keys:['s', 'S'], icon:'down'}
const BUTTON_DIR_UP = {keys:['w', 'W'], icon:'up'}
const BUTTON_SQUARE = {keys:['j', 'J', '4'], icon:'square'}
const BUTTON_CIRCLE = {keys:['l', 'L', '6'], icon:'circle'}
const BUTTON_CROSS = {keys:['k', 'K', '5'], icon:'cross'}
const BUTTON_TRIANGLE = {keys:['i', 'I', '8'], icon:'triangle'}
const BUTTON_START = {keys:['Escape', 'Enter'], icon:'start'}

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

export function keyHandler(){
    buttonList.forEach(button => {
        let keyPressed = false
        button.keys.forEach(key => {
            if (keyIsPressed[key]){
                keyPressed = true
                return
            }
        })
        if (keyPressed){
            if (buttonHeldDict[button.icon] != BUTTON_UP ){
                buttonHeldDict[button.icon] = BUTTON_HELD
            } else {
                buttonHeldDict[button.icon] = BUTTON_DOWN
            }
            return
        } else {
            buttonHeldDict[button.icon] = BUTTON_UP
        }
    });
}