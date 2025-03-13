import { ctx, renderScale } from "../canvas-handler.js";
import { keyIsPressed } from "../key-handler.js";
import sprites, { findSprite } from "../sprites.js";
import { player } from "./player.js";
import { startingRoom } from "./rooms.js";

const tileSize = 16
export const gameWidthInTiles = 16
export const gameHeightInTiles = 12

const screenWidth = tileSize * gameWidthInTiles
const screenHeight = tileSize * gameHeightInTiles
const screenPosX = 95
const screenPosY = 13

export const roomModule = {
    currentRoom: startingRoom,
}

roomModule.currentRoom.playerSpawn()

//rendering
const gameLayers = [
    'teleport', 'sensor', 'disc', 'wallOff', 'player',
]

export const debug = false

function renderBackGround(){
    let backgroundImg = (debug ? sprites.background_debug : sprites.background).img
    ctx.drawImage(backgroundImg,
        (screenPosX) * renderScale,
        (screenPosY) * renderScale,
        gameWidthInTiles * tileSize * renderScale,
        (gameHeightInTiles * tileSize - (2 * tileSize)) * renderScale
    )
}

function renderObjectList(){
    for(let i = 0; i < gameLayers.length; i++) {
        const layer = gameLayers[i];
        roomModule.currentRoom.forEachGameObject((object)=>{
            if (object == null){
                console.warn('null object')
                return
            }
            if (object.layer != layer){
                return
            }
            const img = findSprite(object.name).img
            ctx.drawImage(img,
                (screenPosX + object.posX * tileSize) * renderScale,
                (screenPosY + object.posY * tileSize) * renderScale,
                tileSize * renderScale,
                tileSize * renderScale
            )
        })
    }
}

const controlsDict = {
    'white': ['eject-disc'],
    'green': ['eject-disc', 'push-box', 'pull-box'],
    'purple': ['eject-disc', 'teleport'],
    'yellow': ['eject-disc', 'move-remote-bot', 'remote-bot-disc'],
    'red': ['eject-disc'],
}

function renderControls(){
    //Frame
    const frameImg = sprites.inventory_frame.img
    ctx.drawImage(frameImg,
        ((screenPosX)) * renderScale,
        ((screenPosY) + (screenHeight - 2 * tileSize)) * renderScale,
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
            (screenPosX + 8) * renderScale,
            ((screenPosY + 8) + (screenHeight - 2*tileSize)) * renderScale,
            tileSize * renderScale,tileSize * renderScale)
            return
    } else {
        playerDiscImg = findSprite(`floppy-${player.disc.color}-selected`).img
    }

    ctx.drawImage(playerDiscImg,
        (screenPosX + 8) * renderScale,
        ((screenPosY + 8) + (screenHeight - 2*tileSize)) * renderScale,
        tileSize * renderScale,tileSize * renderScale)

    let controls = controlsDict[player.disc.color]
    for (let i = 0; i < controls.length; i++){
        const controlImg = findSprite(`${controls[i]}-controls`).img
        ctx.drawImage(controlImg,
            ((screenPosX) + (2 * tileSize*(i + 1))) * renderScale,
            ((screenPosY) + (screenHeight - 2*tileSize)) * renderScale,
            tileSize *2* renderScale, tileSize *2* renderScale)
    }

    if (player.disc?.color == 'yellow') {
        let rBot;
        roomModule.currentRoom.forEachGameObject((obj)=>{
            if (obj.name == 'remote-bot-left'||obj.name == 'remote-bot-right'){
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
                (screenPosX + screenWidth - 1.5*tileSize) * renderScale,
                ((screenPosY + 8) + (screenHeight - 2*tileSize)) * renderScale,
                tileSize * renderScale,tileSize * renderScale)
                return
        } else {

            rBotDiscImg = findSprite(`floppy-${rBot.disc.color}-selected`).img
        }
        ctx.drawImage(rBotDiscImg,
            (screenPosX + screenWidth - 1.5 * tileSize) * renderScale,
            ((screenPosY + 8) + (screenHeight - 2*tileSize)) * renderScale,
            tileSize * renderScale,tileSize * renderScale)
        
        if (rBot.disc){
            let rControls = rBot.disc.controls
            for (let i = 0; i < rControls.length; i++){
                let controlImg;
                if (i == 0){
                    controlImg = findSprite(`remote-${rControls[i]}`).img
                } else {
                    controlImg = findSprite(rControls[i]).img
                }
                ctx.drawImage(
                    controlImg,
                    ((screenPosX + screenWidth) - ((2 * tileSize) * (i + 2))) * renderScale,
                    ((screenPosY) + (screenHeight - 2*tileSize)) * renderScale,
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
        screenPosX * renderScale,
        screenPosY * renderScale,
        screenWidth * renderScale,
        screenHeight * renderScale);
    renderBackGround()
    renderObjectList()
    renderControls()
    const shineImg = sprites.screen_shine.img
    ctx.drawImage(shineImg, screenPosX * renderScale, screenPosY * renderScale, screenWidth * renderScale, screenHeight * renderScale)
}

// Input handler

export const BUTTON_UP = 0
export const BUTTON_DOWN = 1
export const BUTTON_HELD = 2

export const BUTTON_DIR_LEFT = 'a'
export const BUTTON_DIR_RIGHT = 'd'
export const BUTTON_DIR_DOWN = 's'
export const BUTTON_DIR_UP = 'w'

export const BUTTON_SQUARE = 'j'
export const BUTTON_CIRCLE = 'l'
export const BUTTON_CROSS = 'k'
export const BUTTON_TRIANGLE = 'i'

export const BUTTON_SQUARE_ALT = '4'
export const BUTTON_CIRCLE_ALT = '6'
export const BUTTON_CROSS_ALT = '5'
export const BUTTON_TRIANGLE_ALT = '8'

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
    BUTTON_TRIANGLE_ALT,]

const keyHeldDict = {}

function keyHandler(){
    buttonList.forEach(key => {
        if (keyIsPressed[key]){
            if (keyHeldDict[key] != BUTTON_UP ){
                keyHeldDict[key] = BUTTON_HELD
            } else {
                keyHeldDict[key] = BUTTON_DOWN
            }
        } else {
            keyHeldDict[key] = BUTTON_UP
        }
    });
}

function inputHandler(){
    if (keyHeldDict[BUTTON_DIR_UP]){
        player.move('up')
    } else if (keyHeldDict[BUTTON_DIR_DOWN]){
        player.move('down')
    } else if (keyHeldDict[BUTTON_DIR_LEFT]){
        player.move('left')
    } else if (keyHeldDict[BUTTON_DIR_RIGHT]){
        player.move('right')
    } else {
        player.state = 'idle'
    }
    if (keyHeldDict[BUTTON_CROSS] == BUTTON_DOWN ||
        keyHeldDict[BUTTON_CROSS_ALT] == BUTTON_DOWN){
        player.discActionA()
    }
    if (keyHeldDict[BUTTON_TRIANGLE] == BUTTON_DOWN ||
        keyHeldDict[BUTTON_TRIANGLE_ALT] == BUTTON_DOWN){
        player.discActionC()
    }
    if (keyHeldDict[BUTTON_CIRCLE] == BUTTON_DOWN ||
        keyHeldDict[BUTTON_CIRCLE_ALT] == BUTTON_DOWN){
        player.inventory()
    }
}

// handling game tics
let ticInterval = 1000/24

function sensorCheck(){
    roomModule.currentRoom.forEachGameObject((obj)=>{
        if (obj.layer == 'sensor') {
            if (obj.validate){
                obj.validate()
            }
        }
    })
}

function ticHandler() {
    keyHandler()
    inputHandler()
    sensorCheck()
}

export function start() {
    setInterval(ticHandler, ticInterval);
}