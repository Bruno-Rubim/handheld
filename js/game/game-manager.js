import { BUTTON_DOWN, buttonHandler, buttonHeldDict } from "../button-manager.js";
import { ctx, layout, renderScale } from "../canvas-handler.js";
import sprites, { findSprite } from "../sprites.js";
import { menuInputHandler, renderMenu, startMenu } from "./menu-manager.js";
import { player } from "./game-objects.js";
import { allRooms, debugRoom } from "./rooms/room-list.js";

export const gameState = {
    currentState: 'game',
}

const tileSize = 16
export const gameWidthInTiles = 16
export const gameHeightInTiles = 12

export const screenConfig = {
    screenWidth: tileSize * gameWidthInTiles,
    screenHeight: tileSize * gameHeightInTiles,
    posX: 0,
    posY: 0,
}

if (layout == 'pc') {
    screenConfig.posX = 95
    screenConfig.posY = 13
} else {
    screenConfig.posX = 32
    screenConfig.posY = 32
}

export const debug = false

if (!debug) {
    gameState.currentState = 'menu'
}

let lastRoom = allRooms[localStorage.getItem('lastRoom')]
let version = localStorage.getItem('version')
if (!lastRoom || version != 26) {
    lastRoom = allRooms.firstRoom
}

localStorage.setItem('version', 26)

export const roomModule = {
    currentRoom: lastRoom,
}

if (debug) {
    roomModule.currentRoom = debugRoom
}

roomModule.currentRoom.loadRoom()

//rendering

function renderBackGround(){
    let backgroundImg = (debug ? sprites.background_debug : sprites.background).img
    ctx.drawImage(backgroundImg,
        (screenConfig.posX) * renderScale,
        (screenConfig.posY) * renderScale,
        gameWidthInTiles * tileSize * renderScale,
        (gameHeightInTiles * tileSize - (2 * tileSize)) * renderScale
    )
}

const renderLayers = [
    'wall', 'conveyor', 'sensor', 'disc', 'block', 'player',
]

function renderObjectList(){
    if (roomModule.currentRoom == null) {
        localStorage.setItem('lastRoom', 'firstRoom')
    }
    for(let i = 0; i < renderLayers.length; i++) {
        const renderLayer = renderLayers[i];
        roomModule.currentRoom.forEachGameObject((object)=>{
            if (object == null){
                console.warn('null object')
                return
            }
            if (object.renderLayer == undefined) {
                object.renderLayer = 'wall'
            } else if (object.renderLayer != renderLayer){
                return
            }
            const img = findSprite(object.sprite).img
            let posYOffscale = 0
            if (object.posYOffset){
                posYOffscale = object.posYOffset
            }
            ctx.drawImage(img,
                (screenConfig.posX + object.posX * tileSize) * renderScale,
                (screenConfig.posY - posYOffscale + object.posY * tileSize) * renderScale,
                tileSize * renderScale,
                tileSize * renderScale
            )
            if (object.pointer) {
                let pointerXShift = 0
                let pointerYShift = 0
                switch (object.pointer) {
                    case 'left':
                        pointerXShift = -1
                        break
                    case 'right':
                        pointerXShift = 1
                        break
                    case 'up':
                        pointerYShift = -1
                        break
                    case 'down':
                        pointerYShift = 1
                        break
                }
                ctx.drawImage(findSprite(`pointer-${object.pointer}`).img,
                    (screenConfig.posX + (object.posX + pointerXShift) * tileSize) * renderScale,
                    (screenConfig.posY - posYOffscale + (object.posY + pointerYShift) * tileSize) * renderScale,
                    tileSize * renderScale,
                    tileSize * renderScale
                )
            }
        }, 'reversed')
    }
}

export const controlsDict = {
    'white': ['eject-disc'],
    'green': ['eject-disc', 'push-box', 'pull-box'],
    'purple': ['eject-disc', 'teleport'],
    'yellow': ['eject-disc', 'move-remote-bot'],
    'red': ['eject-disc', 'pointer'],
}

function renderControls(){
    //Frame
    const frameImg = sprites.inventory_frame.img
    ctx.drawImage(frameImg,
        ((screenConfig.posX)) * renderScale,
        ((screenConfig.posY) + (screenConfig.screenHeight - 2 * tileSize)) * renderScale,
        tileSize * gameWidthInTiles * renderScale,
        tileSize * 2 * renderScale)
        
        let discName;
        if (player.disc != null){
            discName = player.disc.color
        } else {
            discName = 'null'
        }
        
    //Disc controls
    let playerDiscImg;
    if (!player.disc){
        playerDiscImg = sprites.floppy_null_selected.img
        ctx.drawImage(playerDiscImg,
            (screenConfig.posX + 8) * renderScale,
            ((screenConfig.posY + 8) + (screenConfig.screenHeight - 2*tileSize)) * renderScale,
            tileSize * renderScale,tileSize * renderScale)
            return
    } else {
        playerDiscImg = findSprite(`floppy-${player.disc.color}-selected`).img
    }

    ctx.drawImage(playerDiscImg,
        (screenConfig.posX + 8) * renderScale,
        ((screenConfig.posY + 8) + (screenConfig.screenHeight - 2*tileSize)) * renderScale,
        tileSize * renderScale,tileSize * renderScale)

    let controls = controlsDict[player.disc.color]
    for (let i = 0; i < controls.length; i++){
        const controlImg = findSprite(`controls-${controls[i]}`).img
        ctx.drawImage(controlImg,
            ((screenConfig.posX) + (2 * tileSize*(i + 1))) * renderScale,
            ((screenConfig.posY) + (screenConfig.screenHeight - 2*tileSize)) * renderScale,
            tileSize *2* renderScale, tileSize *2* renderScale)
    }

    if (player.disc?.color == 'yellow') {
        let rBot;
        roomModule.currentRoom.forEachGameObject((obj)=>{
            if (obj.tags.includes('bot')){
                rBot = obj
            }
        })
        if (!rBot){
            return
        }
        let rBotDiscImg;
        if (!rBot.disc){
            rBotDiscImg = sprites.floppy_null_selected.img
            ctx.drawImage(rBotDiscImg,
                (screenConfig.posX + screenConfig.screenWidth - 1.5*tileSize) * renderScale,
                ((screenConfig.posY + 8) + (screenConfig.screenHeight - 2*tileSize)) * renderScale,
                tileSize * renderScale,tileSize * renderScale)
                return
        } else {

            rBotDiscImg = findSprite(`floppy-${rBot.disc.color}-selected`).img
        }
        ctx.drawImage(rBotDiscImg,
            (screenConfig.posX + screenConfig.screenWidth - 1.5 * tileSize) * renderScale,
            ((screenConfig.posY + 8) + (screenConfig.screenHeight - 2*tileSize)) * renderScale,
            tileSize * renderScale,tileSize * renderScale)
        
        if (rBot.disc){
            let rControls = rBot.disc.controls
            for (let i = 0; i < rControls.length; i++){
                let controlImg;
                if (i == 0){
                    controlImg = findSprite(`${rControls[i]}-remote`).img
                } else {
                    controlImg = findSprite(rControls[i]).img
                }
                ctx.drawImage(
                    controlImg,
                    ((screenConfig.posX + screenConfig.screenWidth) - ((2 * tileSize) * (i + 2))) * renderScale,
                    ((screenConfig.posY) + (screenConfig.screenHeight - 2*tileSize)) * renderScale,
                    tileSize *2* renderScale,
                    tileSize *2* renderScale,
                )
            }
        }
    }
}

export function renderGame(){
    ctx.fillStyle = "#000";
    ctx.fillRect(
        screenConfig.posX * renderScale,
        screenConfig.posY * renderScale,
        screenConfig.screenWidth * renderScale,
        screenConfig.screenHeight * renderScale);
    if (gameState.currentState == 'game') {
        renderBackGround()
        renderObjectList()
        renderControls()
    } else {
        renderMenu()
    }
    const shineImg = sprites.screen_shine.img
    ctx.drawImage(shineImg, screenConfig.posX * renderScale, screenConfig.posY * renderScale, screenConfig.screenWidth * renderScale, screenConfig.screenHeight * renderScale)
}

// Input handler
function gameInputHandler(){
    if (buttonHeldDict['up']){
        player.move('up', 'input')
    } else if (buttonHeldDict['down']){
        player.move('down', 'input')
    } else if (buttonHeldDict['left']){
        player.move('left', 'input')
    } else if (buttonHeldDict['right']){
        player.move('right', 'input')
    } else {
        player.state = 'idle'
    }
    if (buttonHeldDict['cross'] == BUTTON_DOWN){
        player.discActionA()
    }
    if (buttonHeldDict['triangle'] == BUTTON_DOWN){
        player.discActionC()
    }
    if (buttonHeldDict['circle'] == BUTTON_DOWN){
        player.inventory()
    }
    if (buttonHeldDict['start'] == BUTTON_DOWN){
        gameState.currentState = 'menu'
        startMenu()
    }
}

// handling game tics
let ticInterval = 1000/24

function sensorCheck(){
    roomModule.currentRoom.forEachGameObject((obj)=>{
        if (obj.tags.includes('sensor')) {
            if (obj.validate){
                obj.validate()
            }
        }
    })
}

function dynamicCheck(){
    roomModule.currentRoom.forEachGameObject((obj)=>{
        if (obj.tags.includes('dynamic')) {
            if (obj.dynamics){
                obj.dynamics()
            }
        }
    })
}

function resets(){
    roomModule.currentRoom.forEachGameObject((object)=>{
        if (object.tags.includes('bot') && !object.tags.includes('player')){
            object.moved = false
        }
    })
}

function ticHandler() {
    buttonHandler()
    if (gameState.currentState == 'game') {
        gameInputHandler()
        sensorCheck()
        dynamicCheck()
        resets()
    } else {
        menuInputHandler()
    }
}

export function start() {
    setInterval(ticHandler, ticInterval);
}