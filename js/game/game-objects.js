import { getNow } from "../time-manager.js";
import { roomModule, gameHeightInTiles, gameWidthInTiles } from "./game-manager.js";

function netSwitch(color){
    roomModule.currentRoom.forEachGameObject((obj)=>{
        if (obj.colorNet != color){
            return
        }
        if (typeof obj.switchState != 'function'){
            console.warn(obj)
        }
        obj.switchState()
    })
}

export class Disc {
    constructor({effect=()=>{}, color='default', posX=7, posY=5, controls=[]}){
        this.posX = posX
        this.posY = posY
        this.gameLayer = 'disc';
        this.renderLayer = 'disc';
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
        this.gameLayer = 'sensor'
        this.gameLayer = 'sensor'
        this.effectOn = effectOn;
        this.effectOff = effectOff;
        this.color = color;
        this.name = 'scan-' + this.color
        this.state = state
    }
    validate(){
        const disc = roomModule.currentRoom.findObjectByPosition(this.posX, this.posY, 'disc')
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
    constructor({posX=7, posY=5, color='', pressed=false}){
        this.posX = posX
        this.posY = posY
        this.gameLayer = 'sensor'
        this.gameLayer = 'sensor'
        this.color = color;
        this.name;
        this.state = 'off';
        this.pressed = pressed;
        this.colorNet = this.color;
    }
    validate(){
        const object = roomModule.currentRoom.findObjectByPosition(this.posX, this.posY, 'player')
        if (object) {
            if (!this.pressed) {
                this.pressed = true
                if (this.state == 'off'){
                    netSwitch(this.color)
                } else {
                    netSwitch(this.color)
                }
            }
        } else {
            this.pressed = false
        }
    }
    get name() {
        return `button-${this.state}-${this.color}`
    }
    switchState(){
        if (this.state == 'off'){
            this.state = 'on'
        } else {
            this.state = 'off'
        }
    }
}

export class PressurePlate {
    constructor({posX=7, posY=5, color=''}){
        this.posX = posX
        this.posY = posY
        this.gameLayer = 'sensor'
        this.gameLayer = 'sensor'
        this.color = color;
        this.name;
        this.state = 'off'
        this.pressed = false
        this.colorNet = this.color;
    }
    get name() {
        return `plate-${this.state}-${this.color}`
    }
    validate(){
        const object = roomModule.currentRoom.findObjectByPosition(this.posX, this.posY, 'player')
        if(object){
            if (!this.pressed){
                this.state = 'off'
                netSwitch(this.color)
            }
            this.pressed = true
        } else {
            if (this.pressed){
                this.state = 'on'
                netSwitch(this.color)
            }
            this.pressed = false
        }
    }
    switchState(){
        if (this.state == 'off'){
            this.state = 'on'
        } else {
            this.state = 'off'
        }
    }
}

export class TeleportPad {
    constructor({posX=7, posY=5, color='', state='on'}){
        this.posX = posX
        this.posY = posY
        this.gameLayer = 'teleport'
        this.renderLayer = 'sensor'
        this.color = color;
        this.name;
        this.state = state
        this.colorNet = this.color;
    }
    get name() {
        return `teleport-pad-${this.state}-${this.color}`
    }
    switchState(){
        if (this.state == 'on'){
            this.state = 'off'
        } else {
            this.state = 'on'
        }
    }

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
            this.gameLayer = 'wallOff'
        } else {
            this.gameLayer = 'player'
        }
    }
    switchState(){
        if (this.state == 'off') {
            this.gameLayer = 'player'
            this.state = 'on'
        } else {
            this.gameLayer = 'wallOff'
            this.state = 'off'
        }
    }
    get name() {
        return `${this.color}-wall-${this.state}`
    }
}

export class DiscTrap {
    constructor({posX=0, posY=0, state='on', color='white'}){
        this.posX = posX
        this.posY = posY
        this.gameLayer = 'sensor'
        this.renderLayer = 'sensor'
        this.state = state
        this.color = color
        this.colorNet = color
    }
    get name(){
        return `disc-trap-${this.state}-${this.color}`
    }
    validate(){
        if (this.state == 'off'){
            return
        }
        const discFloor = roomModule.currentRoom.findObjectByPosition(this.posX, this.posY, 'disc')
        const bot = roomModule.currentRoom.findObjectByPosition(this.posX, this.posY, 'player')
        if (bot?.disc) {
            if (discFloor){
                return
            }
            bot.disc.posX = this.posX
            bot.disc.posY = this.posY
            bot.disc.gameLayer = 'disc'
            roomModule.currentRoom.objectList.push(bot.disc)
            bot.disc = null
        }
    }
    switchState(){
        if (this.state == 'on') {
            this.state = 'off'
        } else {
            this.state = 'on'
        }
    }
}

export class Box {
    constructor({posX=0, posY=0, disc=null}){
        this.posX = posX
        this.posY = posY
        this.gameLayer = 'player'
        this.renderLayer = 'player'
        this.name = 'box'
    }
    move(dir){
        //Checking direction
        let targetPosX = this.posX;
        let targetPosY = this.posY;

        if (this.lastMoveDir == dir){
            if (this.lastMoveTime + this.moveDelay > getNow()){
                return
            }
        }
        this.lastMoveTime = getNow()
        this.lastMoveDir = dir

        if (dir == 'up'){
            targetPosY --
        }
        if (dir == 'down'){
            targetPosY ++
        }
        if (targetPosY > 9){
            targetPosY = 9
        } else if (targetPosY < 0){
            targetPosY = 0
        }

        if (dir == 'left'){
            targetPosX --
            this.facing = 'left'
        }
        if (dir == 'right'){
            targetPosX ++
            this.facing = 'right'
        }
        if (targetPosX > gameWidthInTiles -1){
            targetPosX = 15
        } else if (targetPosX < 0){
            targetPosX = 0
        }
        
        //Checking blockage
        let blocked = false
        let targetObject = roomModule.currentRoom.findObjectByPosition(targetPosX, targetPosY, 'player')
        if (targetObject){
            blocked = true
        }

        let moved = false;

        if (!blocked) {
            this.posX = targetPosX
            this.posY = targetPosY
            moved = true
        }

        if (this.disc?.color == 'yellow' && !remoteBotMoved){
            roomModule.currentRoom.forEachGameObject((obj)=>{
                if (obj.name == 'remote-bot-left' || obj.name == 'remote-bot-right') {
                    obj.move(dir)
                }
            })
            remoteBotMoved = true;
        }

        return moved
    }
}

export class RemoteBot {
    constructor({posX=0, posY=0, disc=null}){
        this.posX = posX
        this.posY = posY
        this.posYOffset = 6
        this.gameLayer = 'player' 
        this.renderLayer = 'player'
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
            this.disc.gameLayer = 'disc'
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
                    let nextTargetPlate = roomModule.currentRoom.findObjectByPosition(nextTargetPosX, nextTargetPosY, 'plate')
                    if (nextTargetPlate?.state == 'off'){
                        nextTargetPlate.switchState()
                    }
                } else {
                    blocked = true
                }
            } else {
                blocked = true
            }
        }
        let botMoved = false
        if (!blocked) {
            let currentPlate = roomModule.currentRoom.findObjectByPosition(this.posX, this.posY, 'plate')
            if (currentPlate?.state == 'on'){
                currentPlate.switchState()
            }

            this.posX = targetPosX
            this.posY = targetPosY
            botMoved = true

            let targetPlate = roomModule.currentRoom.findObjectByPosition(this.posX, this.posY, 'plate')
            if (targetPlate?.state == 'off'){
                targetPlate.switchState()
            }

            let button = roomModule.currentRoom.findObjectByPosition(targetPosX, targetPosY, 'button')
            if (button){
                button.switchState()
            }
            
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
        return botMoved
    }
    discAction(){
        if (!this.disc){
            return
        }
        if (this.disc.color == 'red'){
            let x = this.posX
            let y = this.posY
            let gameLayer = this.gameLayer
            if (roomModule.currentRoom.findObjectByPosition(x + 1, y, gameLayer) instanceof FlipWall){
                roomModule.currentRoom.takeObjectByPosition(x + 1, y, gameLayer)
                roomModule.currentRoom.objectList.push({posX: x + 1, posY: y, gameLayer: gameLayer, name: 'drill-right'})
                setTimeout(()=>{
                    roomModule.currentRoom.takeObjectByPosition(x + 1, y, gameLayer)
                }, 200)
            }
            if (roomModule.currentRoom.findObjectByPosition(x - 1, y, gameLayer) instanceof FlipWall){
                roomModule.currentRoom.takeObjectByPosition(x - 1, y, gameLayer)
                roomModule.currentRoom.objectList.push({posX: x - 1, posY: y, gameLayer: gameLayer, name: 'drill-left'})
                setTimeout(()=>{
                    roomModule.currentRoom.takeObjectByPosition(x - 1, y, gameLayer)
                }, 200)
            }
            if (roomModule.currentRoom.findObjectByPosition(x, y + 1, gameLayer) instanceof FlipWall){
                roomModule.currentRoom.takeObjectByPosition(x, y + 1, gameLayer)
                roomModule.currentRoom.objectList.push({posX: x, posY: y + 1, gameLayer: gameLayer, name: 'drill-down'})
                setTimeout(()=>{
                    roomModule.currentRoom.takeObjectByPosition(x, y + 1, gameLayer)
                }, 200)
            }
            if (roomModule.currentRoom.findObjectByPosition(x, y - 1, gameLayer) instanceof FlipWall){
                roomModule.currentRoom.takeObjectByPosition(x, y - 1, gameLayer)
                roomModule.currentRoom.objectList.push({posX: x, posY: y - 1, gameLayer: gameLayer, name: 'drill-up'})
                setTimeout(()=>{
                    roomModule.currentRoom.takeObjectByPosition(x, y - 1, gameLayer)
                }, 200)
            }
            return
        }
        if (this.disc.color == 'purple'){
            roomModule.currentRoom.forEachGameObject((obj)=>{
                if (obj.gameLayer == 'teleport'){
                    if (!roomModule.currentRoom.findObjectByPosition(obj.posX, obj.posY, 'player')){
                        this.posX = obj.posX
                        this.posY = obj.posY
                    }
                }
            })
            return
        }
        if (this.disc.color == 'green'){
            const startingPosX = this.posX
            const startingPosY = this.posY

            function changeBoxPosition(){
                let plate = roomModule.currentRoom.findObjectByPosition(box.posX, box.posY, 'plate')
                if (plate) {
                    plate.switchState()
                }
                box.posX = startingPosX;
                box.posY = startingPosY;
                plate = roomModule.currentRoom.findObjectByPosition(box.posX, box.posY, 'plate')
                if (plate) {
                    plate.switchState()
                }
            }

            let box = roomModule.currentRoom.findObjectByPosition(this.posX - 1, this.posY, 'player')
            if (box?.name == 'box'){
                if (this.move('right')){
                    changeBoxPosition()
                }
                return
            }
            box = roomModule.currentRoom.findObjectByPosition(this.posX + 1, this.posY, 'player')
            if (box?.name == 'box'){
                if (this.move('left')){
                    changeBoxPosition()
                }
                return
            }
            box = roomModule.currentRoom.findObjectByPosition(this.posX, this.posY + 1, 'player')
            if (box?.name == 'box'){
                if (this.move('up')){
                    changeBoxPosition()
                }
                return
            }
            box = roomModule.currentRoom.findObjectByPosition(this.posX, this.posY - 1, 'player')
            if (box?.name == 'box'){
                if (this.move('down')){
                    changeBoxPosition()
                }
                return
            }
        }
    }
}