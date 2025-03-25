import { BUTTON_DOWN, buttonHeldDict } from "../button-manager.js";
import { ctx, layout, renderScale } from "../canvas-handler.js";
import { findSound } from "../sounds.js";
import { findSprite } from "../sprites.js";
import { gameHeightInTiles, gameState, gameWidthInTiles, roomModule, screenConfig } from "./game-manager.js";
import { resetSave, startedSections, updateSave } from "./game-save.js";
import { allRooms, sectionBRooms, sectionCRooms, sectionDRooms } from "./rooms/room-list.js";
import { secAStart } from "./rooms/section-a.js";
import { secBStart } from "./rooms/section-b.js";
import { secCStart } from "./rooms/section-c.js";
import { secDStart } from "./rooms/section-d.js";

class menuOption {
    constructor({onConfirm=()=>{null}, onCancel=()=>{null}, sprite=''}){
        this.onConfirm = onConfirm
        this.onCancel = onCancel
        this.sprite = sprite
    }
}

class Screen {
    constructor({options: optionList=[], render=null, 
        onConfirm=()=>{
            this.optionList[this.selectedOption].onConfirm()
        },
        onCancel=()=>{
            this.optionList[this.selectedOption].onCancel()
    },}){
        this.optionList = optionList;
        this.selectedOption = 0;
        this.render = render
        this.onConfirm = onConfirm
        this.onCancel = onCancel
    }
}

const controlsScreen = new Screen({
    render:()=>{
        const img = findSprite('controls-screen').img
        ctx.drawImage(img,
            screenConfig.posX * renderScale,
            screenConfig.posY * renderScale,
            256 * renderScale,
            192 * renderScale
        )
    },
    onConfirm: () => {
        currentScreen = mainScreen
    },
    onCancel: () => {
        currentScreen = mainScreen
    }
})

const levelsScreen = new Screen({
    options: [
        new menuOption({
            sprite:'section-a',
            onConfirm: () => {
                if (startedSections['section-a'] == 'yes'){
                    for (const room in allRooms){
                        allRooms[room].loaded = false
                    }
                    roomModule.currentRoom = secAStart
                    roomModule.currentRoom.loadRoom()
                    gameState.currentState = 'game'
                } else {
                    findSound('error').play()
                }
            }
        }),
        new menuOption({
            sprite:'section-b',
            onConfirm: () => {
                if (startedSections['section-b'] == 'yes'){
                    sectionBRooms.forEach(room =>{
                        room.loaded = false
                    })
                    sectionCRooms.forEach(room =>{
                        room.loaded = false
                    })
                    sectionDRooms.forEach(room =>{
                        room.loaded = false
                    })
                    roomModule.currentRoom = secBStart
                    roomModule.currentRoom.loadRoom()
                    gameState.currentState = 'game'
                } else {
                    findSound('error').play()
                }
            }
        }),
        new menuOption({
            sprite:'section-c',
            onConfirm: () => {
                if (startedSections['section-c'] == 'yes'){
                    sectionCRooms.forEach(room =>{
                        room.loaded = false
                    })
                    sectionDRooms.forEach(room =>{
                        room.loaded = false
                    })
                    roomModule.currentRoom = secCStart
                    roomModule.currentRoom.loadRoom()
                    gameState.currentState = 'game'
                } else {
                    findSound('error').play()
                }
            }
        }),
        new menuOption({
            sprite:'section-d',
            onConfirm: () => {
                sectionDRooms.forEach(room =>{
                    room.loaded = false
                })
                if (startedSections['section-d'] == 'yes'){
                    roomModule.currentRoom = secDStart
                    roomModule.currentRoom.loadRoom()
                    gameState.currentState = 'game'
                } else {
                    findSound('error').play()
                }
            }
        }),
    ],
    render: () => {
        let xShift = ((levelsScreen.optionList.length - 1)/2 * -32) -16
        const blockedImg = findSprite(`blocked-option`).img;
        const selectedImg = findSprite(`selected-option`).img;
        for (let i = 0; i < levelsScreen.optionList.length; i++){
            const option = levelsScreen.optionList[i];
            const optionImg = findSprite(`${option.sprite}-option`).img;
            ctx.drawImage(optionImg,
                (((gameWidthInTiles * 16 / 2)) + xShift + screenConfig.posX) * renderScale,
                (((gameHeightInTiles * 16 / 2)) - 16 + screenConfig.posY) * renderScale,
                32 * renderScale,
                32 * renderScale
            )
            if (startedSections[option.sprite] != 'yes'){
                ctx.drawImage(blockedImg,
                    (((gameWidthInTiles * 16 / 2)) + xShift + screenConfig.posX) * renderScale,
                    (((gameHeightInTiles * 16 / 2)) - 16 + screenConfig.posY) * renderScale,
                    32 * renderScale,
                    32 * renderScale
                )
            }
            if (i == levelsScreen.selectedOption){
                ctx.drawImage(selectedImg,
                    (((gameWidthInTiles * 16 / 2)) + xShift + screenConfig.posX) * renderScale,
                    (((gameHeightInTiles * 16 / 2)) - 16 + screenConfig.posY) * renderScale,
                    32 * renderScale,
                    32 * renderScale
                )
            }
            xShift += 32;
        }
    },
    onCancel: () => {
        currentScreen = mainScreen
    }
})

const resetSaveScreen = new Screen({
    render:()=>{
        const img = findSprite('reset-save-screen').img
        ctx.drawImage(img,
            screenConfig.posX * renderScale,
            screenConfig.posY * renderScale,
            256 * renderScale,
            192 * renderScale
        )
    },
    onConfirm: () => {
        resetSave()
        roomModule.currentRoom = secAStart
        roomModule.currentRoom.loadRoom()
        gameState.currentState = 'game'
    },
    onCancel: () => {
        currentScreen = mainScreen
    }
})

let mainScreenOptions = []
if (layout == 'pc') {
    mainScreenOptions = [
        new menuOption({
            sprite:'restart',
            onConfirm: () => {
                roomModule.currentRoom.loadRoom()
                gameState.currentState = 'game'
            }
        }),
        new menuOption({
            sprite:'controls',
            onConfirm: () => {
                currentScreen = controlsScreen
            }
        }),
        new menuOption({
            sprite:'levels',
            onConfirm: () => {
                updateSave()
                currentScreen = levelsScreen
            }
        }),
        new menuOption({
            sprite:'reset-save',
            onConfirm: () => {
                currentScreen = resetSaveScreen
            }
        }),
    ]
} else {
    mainScreenOptions = [
        new menuOption({
            sprite:'restart',
            onConfirm: () => {
                roomModule.currentRoom.loadRoom()
                gameState.currentState = 'game'
            }
        }),
        new menuOption({
            sprite:'levels',
            onConfirm: () => {
                updateSave()
                currentScreen = levelsScreen
            }
        }),
        new menuOption({
            sprite:'reset-save',
            onConfirm: () => {
                currentScreen = resetSaveScreen
            }
        }),
    ]
}

const mainScreen = new Screen({
    options: mainScreenOptions,
    render: () => {
        let xShift = ((mainScreen.optionList.length - 1)/2 * -32) -16
        for (let i = 0; i < mainScreen.optionList.length; i++){
            const option = mainScreen.optionList[i];
            const optionImg = findSprite(`${option.sprite}-option`).img;
            ctx.drawImage(optionImg,
                (((gameWidthInTiles * 16 / 2)) + xShift + screenConfig.posX) * renderScale,
                (((gameHeightInTiles * 16 / 2)) - 16 + screenConfig.posY) * renderScale,
                32 * renderScale,
                32 * renderScale
            )
            if (i == mainScreen.selectedOption){
                const selectedImg = findSprite(`selected-option`).img;
                ctx.drawImage(selectedImg,
                    (((gameWidthInTiles * 16 / 2)) + xShift + screenConfig.posX) * renderScale,
                    (((gameHeightInTiles * 16 / 2)) - 16 + screenConfig.posY) * renderScale,
                    32 * renderScale,
                    32 * renderScale
                )
                const selectedTextImg = findSprite(`${option.sprite}-option-text`).img;
                ctx.drawImage(selectedTextImg,
                    (screenConfig.posX) * renderScale,
                    (144 + screenConfig.posY) * renderScale,
                    256 * renderScale,
                    32 * renderScale
                )
            }
            xShift += 32;
        }
    },
    onCancel: () => {
        gameState.currentState = 'game'
    }
})

let currentScreen = controlsScreen
if (layout == 'mobile') {
    currentScreen = mainScreen
}

export function startMenu(){
    currentScreen = mainScreen
}

export function menuInputHandler(){
    if (buttonHeldDict['left'] == BUTTON_DOWN){
        currentScreen.selectedOption --
        if (currentScreen.selectedOption < 0){
            currentScreen.selectedOption = 0
        }
    }
    if (buttonHeldDict['right'] == BUTTON_DOWN){
        currentScreen.selectedOption ++
        if (currentScreen.selectedOption >= currentScreen.optionList.length){
            currentScreen.selectedOption = currentScreen.optionList.length - 1
        }
    }
    if (buttonHeldDict['cross'] == BUTTON_DOWN){
        currentScreen.onConfirm()
    }
    if (buttonHeldDict['circle'] == BUTTON_DOWN){
        currentScreen.onCancel()
    }
    if (buttonHeldDict['start'] == BUTTON_DOWN){
        gameState.currentState = 'game'
    }
}

export function renderMenu(){
    currentScreen.render()
}