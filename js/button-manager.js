import { layout } from "./canvas-handler.js"
import { keyHandler } from "./key-handler.js"
import { touchHandler } from "./touch-handler.js"

export const buttonHeldDict = {}

export const BUTTON_UP = 0
export const BUTTON_DOWN = 1
export const BUTTON_HELD = 2

export const caseButtons = [
    {
        sprite: 'up',
        icon: 'up',
        widthPC: 25,
        heightPC: 34,
        posXPC: 35,
        posYPC: 77,
        keys: ['w'],
        widthMobl: 50,
        heightMobl: 68,
        posXMobl: 51,
        posYMobl: 284,
    },
    {
        sprite: 'down',
        icon: 'down',
        widthPC: 25,
        heightPC: 34,
        posXPC: 35,
        posYPC: 116,
        keys: ['s'],
        widthMobl: 50,
        heightMobl: 68,
        posXMobl: 51,
        posYMobl: 361,
    },
    {
        sprite: 'left',
        icon: 'left',
        widthPC: 31,
        heightPC: 28,
        posXPC: 13,
        posYPC: 99,
        keys: ['a'],
        widthMobl: 62,
        heightMobl: 56,
        posXMobl: 7,
        posYMobl: 328,
    },
    {
        sprite: 'right',
        icon: 'right',
        widthPC: 31,
        heightPC: 28,
        posXPC: 51,
        posYPC: 100,
        keys: ['d'],
        widthMobl: 62,
        heightMobl: 56,
        posXMobl: 83,
        posYMobl: 328,
    },    
    {
        sprite: 'triangle',
        icon: 'triangle',
        widthPC: 29,
        heightPC: 32,
        posXPC: 384,
        posYPC: 77,
        keys: ['8', 'i'],
        widthMobl: 58,
        heightMobl: 64,
        posXMobl: 210,
        posYMobl: 282,
    },
    {
        sprite: 'cross',
        icon: 'cross',
        widthPC: 29,
        heightPC: 32,
        posXPC: 384,
        posYPC: 121,
        keys: ['5', 'k'],
        widthMobl: 58,
        heightMobl: 64,
        posXMobl: 210,
        posYMobl: 370,
    },
    {
        sprite: 'square',
        icon: 'square',
        widthPC: 29,
        heightPC: 32,
        posXPC: 362,
        posYPC: 99,
        keys: ['4', 'j'],
        widthMobl: 58,
        heightMobl: 64,
        posXMobl: 166,
        posYMobl: 326,
    },
    {
        sprite: 'circle',
        icon: 'circle',
        widthPC: 29,
        heightPC: 32,
        posXPC: 406,
        posYPC: 99,
        keys: ['6', 'l'],
        widthMobl: 58,
        heightMobl: 64,
        posXMobl: 254,
        posYMobl: 326,
    },
    {
        sprite: 'start',
        icon: 'start',
        widthPC: 23,
        heightPC: 14,
        posXPC: 61,
        posYPC: 37,
        keys: ['Escape', 'Enter'],
        widthMobl: 46,
        heightMobl: 28,
        posXMobl: 102,
        posYMobl: 230,
    },
]

export function buttonHandler(){
    if (layout == 'pc') {
        keyHandler()
    } else {
        touchHandler()
    }
}