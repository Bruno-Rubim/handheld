import { BUTTON_DOWN, buttonHandler, buttonHeldDict } from "../button-manager.js";
import { ctx, layout, renderScale } from "../canvas-handler.js";
import sprites, { findSprite } from "../sprites.js";
import { player } from "./player.js";
import { firstRoom, startingRoom } from "./rooms.js";

const tileSize = 16
export const gameWidthInTiles = 16
export const gameHeightInTiles = 12

const screenWidth = tileSize * gameWidthInTiles
const screenHeight = tileSize * gameHeightInTiles
let screenPosX;
let screenPosY;

if (layout == 'pc') {
    screenPosX = 95
    screenPosY = 13
} else {
    screenPosX = 32
    screenPosY = 32
}


export const debug = false

export const roomModule = {
    currentRoom: startingRoom,
}

if (!debug){
    roomModule.currentRoom = firstRoom
}

roomModule.currentRoom.playerSpawn()

//rendering

function renderBackGround(){
    let backgroundImg = (debug ? sprites.background_debug : sprites.background).img
    ctx.drawImage(backgroundImg,
        (screenPosX) * renderScale,
        (screenPosY) * renderScale,
        gameWidthInTiles * tileSize * renderScale,
        (gameHeightInTiles * tileSize - (2 * tileSize)) * renderScale
    )
}

const renderLayers = [
    'wall', 'sensor', 'disc', 'block', 'player',
]

function renderObjectList(){
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
                (screenPosX + object.posX * tileSize) * renderScale,
                (screenPosY - posYOffscale + object.posY * tileSize) * renderScale,
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
    'yellow': ['eject-disc', 'move-remote-bot'],
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
function inputHandler(){
    if (buttonHeldDict['up']){
        player.move('up')
    } else if (buttonHeldDict['down']){
        player.move('down')
    } else if (buttonHeldDict['left']){
        player.facing = 'left'
        player.move('left')
    } else if (buttonHeldDict['right']){
        console.log(buttonHeldDict['right'])
        player.facing = 'right'
        player.move('right')
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

function ticHandler() {
    buttonHandler()
    inputHandler()
    sensorCheck()
    dynamicCheck()
}

export function start() {
    setInterval(ticHandler, ticInterval);
}