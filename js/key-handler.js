import { BUTTON_UP, BUTTON_DOWN, BUTTON_HELD, buttonHeldDict } from "./button-manager.js";

export let keyIsPressed = {}

window.addEventListener("keydown", function(event) {
    keyIsPressed[event.key] = true;
});

window.addEventListener("keyup", function(event) {
    keyIsPressed[event.key] = false;
});

const BUTTON_DIR_LEFT = {key:'a', icon:'left'}
const BUTTON_DIR_RIGHT = {key:'d', icon:'right'}
const BUTTON_DIR_DOWN = {key:'s', icon:'down'}
const BUTTON_DIR_UP = {key:'w', icon:'up'}
const BUTTON_SQUARE = {key:'j', icon:'square'}
const BUTTON_CIRCLE = {key:'l', icon:'circle'}
const BUTTON_CROSS = {key:'k', icon:'cross'}
const BUTTON_TRIANGLE = {key:'i', icon:'triangle'}
const BUTTON_SQUARE_ALT = {key:'4', icon:'square'}
const BUTTON_CIRCLE_ALT = {key:'6', icon:'circle'}
const BUTTON_CROSS_ALT = {key:'5', icon:'cross'}
const BUTTON_TRIANGLE_ALT = {key:'8', icon:'triangle'}

const buttonList = [
    BUTTON_DIR_LEFT,
    BUTTON_DIR_RIGHT,
    BUTTON_DIR_DOWN,
    BUTTON_DIR_UP,
    BUTTON_SQUARE,
    BUTTON_CIRCLE,
    BUTTON_CROSS,
    BUTTON_TRIANGLE,
    BUTTON_SQUARE_ALT,
    BUTTON_CIRCLE_ALT,
    BUTTON_CROSS_ALT,
    BUTTON_TRIANGLE_ALT,
]

export function keyHandler(){
    buttonList.forEach(button => {
        if (keyIsPressed[button.key]){
            if (buttonHeldDict[button.key] != BUTTON_UP ){
                buttonHeldDict[button.icon] = BUTTON_HELD
            } else {
                buttonHeldDict[button.icon] = BUTTON_DOWN
            }
        } else {
            buttonHeldDict[button.icon] = BUTTON_UP
        }
    });
}