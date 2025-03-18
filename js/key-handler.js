import { BUTTON_UP, BUTTON_DOWN, BUTTON_HELD, buttonHeldDict } from "./button-manager.js";

export let keyIsPressed = {}

window.addEventListener("keydown", function(event) {
    keyIsPressed[event.key] = true;
});

window.addEventListener("keyup", function(event) {
    keyIsPressed[event.key] = false;
});

const BUTTON_DIR_LEFT = {keys:['a'], icon:'left'}
const BUTTON_DIR_RIGHT = {keys:['d'], icon:'right'}
const BUTTON_DIR_DOWN = {keys:['s'], icon:'down'}
const BUTTON_DIR_UP = {keys:['w'], icon:'up'}
const BUTTON_SQUARE = {keys:['j', '4'], icon:'square'}
const BUTTON_CIRCLE = {keys:['l', '6'], icon:'circle'}
const BUTTON_CROSS = {keys:['k', '5'], icon:'cross'}
const BUTTON_TRIANGLE = {keys:['i', '8'], icon:'triangle'}

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

export function keyHandler(){
    if (keyIsPressed['y']) {
        localStorage.setItem('lastRoom', 'firstRoom')
    }
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