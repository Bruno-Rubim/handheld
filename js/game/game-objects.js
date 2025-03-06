import { getNow } from "../time-manager.js";
import { roomModule, gameHeightInTiles, gameWidthInTiles } from "./game-manager.js";

export class Disc {
    constructor({effect=()=>{}, color='default', posX=7, posY=5, controls=[]}){
        this.posX = posX
        this.posY = posY
        this.layer = 'disc';
        this.effect = effect;
        this.color = color;
        this.name = 'floppy-' + this.color + '-item'
        this.controls = controls
        this.controls.unshift('eject-disc-controls')
    }
}

export class DiscScanner {
    constructor({posX=7, posY=5, effectOn=()=>{}, effectOff=()=>{}, color='default', state='off'}){
        this.posX = posX
        this.posY = posY
        this.layer = 'scanner'
        this.effectOn = effectOn;
        this.effectOff = effectOff;
        this.color = color;
        this.name = this.color + '-scan'
        this.state = state
    }
    discCheck(disc){
        if (disc?.color == this.color){
            if (this.state == 'off'){
                netSwitch(this.color)
                this.state = 'on'
            }
        } else {
            if (this.state == 'on') { 
                netSwitch(this.color)
                this.state = 'off'
            }
        }
    }
}

export class SwitchButton {
    constructor({posX=7, posY=5, color=''}){
        this.posX = posX
        this.posY = posY
        this.layer = 'button'
        this.color = color;
        this.name;
        this.state = 'off'
        this.colorNet = this.color;
    }
    get name() {
        return `button-${this.state}-${this.color}`
    }
    switchOff(){
        this.state = 'off'
    }
    switchOn(){
        this.state = 'on'
    }
    switchState(){
        if (this.state == 'off'){
            netSwitch(this.color)
            this.switchOn
        } else {
            netSwitch(this.color)
            this.switchOff
        }
    }
}

export function netSwitch(color){
    roomModule.currentRoom.forEachGameObject((obj)=>{
        if (obj.colorNet != color){
            return
        }
        if (obj.state == 'on'){
            obj.switchOff()
        } else {
            obj.switchOn()
        }
    })
}

export class FlipWall {
    constructor({posX=0, posY=0, color='', state='off'}){
        this.posX = posX
        this.posY = posY
        this.color = color
        this.state = state
        this.class = FlipWall
        this.colorNet = color
        if (state=='off'){
            this.layer = 'wallOff'
        } else {
            this.layer = 'player'
        }
    }
    switchOn(){
        this.layer = 'player'
        this.state = 'on'
    }
    switchOff(){
        this.layer = 'wallOff'
        this.state = 'off'
    }
    get name() {
        return `${this.color}-wall-${this.state}`
    }
}

export class DiscTrap {
    constructor({posX=0, posY=0, state='on', color='white'}){
        this.posX = posX
        this.posY = posY
        this.layer = 'disc-trap' 
        this.state = state
        this.color = color
        this.colorNet = color
    }
    get name(){
        return `disc-trap-${this.state}-${this.color}`
    }
    pullDisc(){
        if (this.state == 'off'){
            return
        }
        const discFloor = roomModule.currentRoom.findObjectByPosition(this.posX, this.posY, 'disc')
        const bot = roomModule.currentRoom.findObjectByPosition(this.posX, this.posY, 'player')
        if (bot.disc) {
            if (discFloor){
                return
            }
            bot.disc.posX = this.posX
            bot.disc.posY = this.posY
            bot.disc.layer = 'disc'
            roomModule.currentRoom.objectList.push(bot.disc)
            bot.disc = null
        }
    }
    switchOff(){
        this.state = 'off'
    }
    switchOn(){
        this.state = 'on'
    }
}

export class RemoteBot {
    constructor({posX=0, posY=0, disc=Disc}){
        this.posX = posX
        this.posY = posY
        this.layer = 'player' 
        this.facing = 'left'
        this.name = 'remote-bot-' + this.facing
        this.disc = disc
    }
    inventory(){
        let scanner = roomModule.currentRoom.findObjectByPosition(this.posX, this.posY, 'scanner')
        let floorDisc = roomModule.currentRoom.takeObjectByPosition(this.posX, this.posY, 'disc')
        let discTrap = roomModule.currentRoom.findObjectByPosition(this.posX, this.posY, 'disc-trap')
        if (this.disc){
            this.disc.posX = this.posX
            this.disc.posY = this.posY
            this.disc.layer = 'disc'
            roomModule.currentRoom.objectList.push(this.disc)
        }
        if (scanner){
            scanner.discCheck(this.disc);
        }
        this.disc = floorDisc
        if (discTrap){
            discTrap.pullDisc()
        }
    }
    move(dir){
        let targetPosX = this.posX;
        let targetPosY = this.posY;
        let nextTargetPosX = this.posX;
        let nextTargetPosY = this.posY;

        if (this.lastMoveDir == dir){
            if (this.lastMoveTime + this.moveDelay > getNow()){
                return
            }
        }
        this.lastMoveTime = getNow()
        this.lastMoveDir = dir

        if (dir == 'up'){
            targetPosY --
            nextTargetPosY -=2
        }
        if (dir == 'down'){
            targetPosY ++
            nextTargetPosY +=2
        }
        if (targetPosY > gameHeightInTiles -3){
            targetPosY = gameHeightInTiles -3
        } else if (targetPosY < 0){
            targetPosY = 0
        }

        if (dir == 'left'){
            targetPosX --
            nextTargetPosX -= 2
            this.facing = 'left'
        }
        if (dir == 'right'){
            targetPosX ++
            nextTargetPosX += 2
            this.facing = 'right'
        }
        if (targetPosX > gameWidthInTiles -1){
            targetPosX = 0
        } else if (targetPosX < 0){
            targetPosX = 0
        }
        
        let targetObject = roomModule.currentRoom.findObjectByPosition(targetPosX, targetPosY, 'player')
        let blocked = false
        if (targetObject){
            if (this.disc?.color == 'green' && targetObject?.name == 'box'){
                if (!roomModule.currentRoom.findObjectByPosition(nextTargetPosX, nextTargetPosY, 'player')){
                    targetObject.posX = nextTargetPosX
                    targetObject.posY = nextTargetPosY
                } else {
                    blocked = true
                }
            } else {
                blocked = true
            }
        }
        if (!blocked) {
            this.posX = targetPosX
            this.posY = targetPosY
            let discTrap = roomModule.currentRoom.findObjectByPosition(targetPosX, targetPosY, 'disc-trap')
            if (discTrap){
                discTrap.pullDisc()
            }
            let floorDisc = roomModule.currentRoom.findObjectByPosition(targetPosX, targetPosY, 'disc')
            if (floorDisc && this.disc == null){
                this.inventory()
            }
        }
        this.name = 'remote-bot-' + this.facing
        this.state = 'walking'
    }
    discAction(){
        if (!this.disc){
            return
        }
        if (this.disc.color == 'red'){
            let x = this.posX
            let y = this.posY
            let layer = this.layer
            if (roomModule.currentRoom.findObjectByPosition(x + 1, y, layer) instanceof FlipWall){
                roomModule.currentRoom.takeObjectByPosition(x + 1, y, layer)
                roomModule.currentRoom.objectList.push({posX: x + 1, posY: y, layer: layer, name: 'drill-right'})
                setTimeout(()=>{
                    roomModule.currentRoom.takeObjectByPosition(x + 1, y, layer)
                }, 200)
            }
            if (roomModule.currentRoom.findObjectByPosition(x - 1, y, layer) instanceof FlipWall){
                roomModule.currentRoom.takeObjectByPosition(x - 1, y, layer)
                roomModule.currentRoom.objectList.push({posX: x - 1, posY: y, layer: layer, name: 'drill-left'})
                setTimeout(()=>{
                    roomModule.currentRoom.takeObjectByPosition(x - 1, y, layer)
                }, 200)
            }
            if (roomModule.currentRoom.findObjectByPosition(x, y + 1, layer) instanceof FlipWall){
                roomModule.currentRoom.takeObjectByPosition(x, y + 1, layer)
                roomModule.currentRoom.objectList.push({posX: x, posY: y + 1, layer: layer, name: 'drill-down'})
                setTimeout(()=>{
                    roomModule.currentRoom.takeObjectByPosition(x, y + 1, layer)
                }, 200)
            }
            if (roomModule.currentRoom.findObjectByPosition(x, y - 1, layer) instanceof FlipWall){
                roomModule.currentRoom.takeObjectByPosition(x, y - 1, layer)
                roomModule.currentRoom.objectList.push({posX: x, posY: y - 1, layer: layer, name: 'drill-up'})
                setTimeout(()=>{
                    roomModule.currentRoom.takeObjectByPosition(x, y - 1, layer)
                }, 200)
            }
            return
        }
        if (this.disc.color == 'purple'){
            roomModule.currentRoom.forEachGameObject((obj)=>{
                if (obj.layer == 'teleport'){
                    if (!roomModule.currentRoom.findObjectByPosition(obj.posX, obj.posY, 'player')){
                        this.posX = obj.posX
                        this.posY = obj.posY
                    }
                }
            })
            return
        }
    }
}