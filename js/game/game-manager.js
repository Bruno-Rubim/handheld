import { ctx, renderScale } from "../canvas-handler.js";
import { keyIsPressed } from "../key-handler.js";
import { player } from "./player.js";
import { getImg } from '../image-store.js'
import { roomButton1, roomButton2, roomDisc1, roomDiscButton, roomDisc2, roomPushBox1, roomRemoteBot1, testRoom, roomRemoteBot2, roomPushBox2, roomRemoteBot3 } from "./rooms.js";

const tileSize = 16
export const gameWidthInTiles = 16
export const gameHeightInTiles = 12

const screenWidth = tileSize * gameWidthInTiles
const screenHeight = tileSize * gameHeightInTiles
const screenPosX = 95
const screenPosY = 13

const shineImgSrc = '/handheld/images/case-pc/screen-shine.png'

export const roomModule = {
    currentRoom: roomButton1,
}

roomModule.currentRoom.playerSpawn()

//rendering
const gameLayers = [
    'wallOff', 'disc-trap', 'teleport', 'plate', 'button', 'scanner', 'disc', 'player',
]

function renderBackGround(){
    let backgroundImg = getImg('/handheld/images/game/background.png')
    // uncomment for debug
    // backgroundImg = getImg('/handheld/images/game/background-debug.png')
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
            const img = getImg('/handheld/images/game/' + object.name + '.png')
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
    'yellow': ['eject-disc', 'move-remote-bot'],
}

function renderControls(){
    //Frame
    const frameImg = getImg('/handheld/images/game/inventory-frame.png')
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
        playerDiscImg = getImg(`/handheld/images/game/floppy-null-selected.png`)
        ctx.drawImage(playerDiscImg,
            (screenPosX + 8) * renderScale,
            ((screenPosY + 8) + (screenHeight - 2*tileSize)) * renderScale,
            tileSize * renderScale,tileSize * renderScale)
            return
    } else {
        playerDiscImg = getImg(`/handheld/images/game/floppy-${player.disc.color}-selected.png`)
    }
    ctx.drawImage(playerDiscImg,
        (screenPosX + 8) * renderScale,
        ((screenPosY + 8) + (screenHeight - 2*tileSize)) * renderScale,
        tileSize * renderScale,tileSize * renderScale)

    let controls = controlsDict[player.disc.color]
    for (let i = 0; i < controls.length; i++){
        const controlImg = getImg(`/handheld/images/game/${controls[i]}-controls.png`)
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
            rBotDiscImg = getImg(`/handheld/images/game/floppy-null-selected.png`)
            ctx.drawImage(rBotDiscImg,
                (screenPosX + screenWidth - 1.5*tileSize) * renderScale,
                ((screenPosY + 8) + (screenHeight - 2*tileSize)) * renderScale,
                tileSize * renderScale,tileSize * renderScale)
                return
        } else {

            rBotDiscImg = getImg(`/handheld/images/game/floppy-${rBot.disc.color}-selected.png`)
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
                controlImg = getImg(`/handheld/images/game/remote-${rControls[i]}.png`)
            } else {
                controlImg = getImg(`/handheld/images/game/${rControls[i]}.png`)
            }
            ctx.drawImage(controlImg,
                ((screenPosX + screenWidth) - ((2 * tileSize) * (i + 2))) * renderScale,
                ((screenPosY) + (screenHeight - 2*tileSize)) * renderScale,
                tileSize *2* renderScale, tileSize *2* renderScale)
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
    const shineImg = getImg(shineImgSrc)
    ctx.drawImage(shineImg, screenPosX * renderScale, screenPosY * renderScale, screenWidth * renderScale, screenHeight * renderScale)
}

// player input
const keyHeldDict = {}

export function keyHandler(){
    if (keyIsPressed['w']){
        player.move('up', roomModule.currentRoom.objectList, 'w')
    } else if (keyIsPressed['s']){
        player.move('down', roomModule.currentRoom.objectList, 's')
    } else if (keyIsPressed['a']){
        player.move('left', roomModule.currentRoom.objectList, 'a')
    } else if (keyIsPressed['d']){
        player.move('right', roomModule.currentRoom.objectList, 'd')
    }

    if (keyIsPressed['5']) {
        if (!keyHeldDict['5']){
            player.discActionA()
            keyHeldDict['5'] = true
        } 
    } else {
        keyHeldDict['5'] = false
    }

    if (keyIsPressed['4']) {
        if (!keyHeldDict['4']){
            player.discActionB()
            keyHeldDict['4'] = true
        } 
    } else {
        keyHeldDict['4'] = false
    }

    if (keyIsPressed['8']) {
        if (!keyHeldDict['8']){
            player.discActionC()
            keyHeldDict['8'] = true
        } 
    } else {
        keyHeldDict['8'] = false
    }

    if (keyIsPressed['6']) {
        if (!keyHeldDict['6']){
            player.inventory()
            keyHeldDict['6'] = true
        }
    } else {
        keyHeldDict['6'] = false
    }
    if (!keyIsPressed['w'] && 
        !keyIsPressed['s'] && 
        !keyIsPressed['a'] && 
        !keyIsPressed['d'])
    {
        player.state = 'idle'
    }
}
