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
        this.tags = ['disc', 'movable'];
        this.renderLayer = 'disc';
        this.effect = effect;
        this.color = color;
        this.sprite = 'floppy-' + this.color + '-item'
        this.controls = controls
        this.controls.unshift('eject-disc-controls')
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
        if (targetPosY > 8){
            targetPosY = 8
        } else if (targetPosY < 1){
            targetPosY = 1
        }

        if (dir == 'left'){
            targetPosX --
            this.facing = 'left'
        }
        if (dir == 'right'){
            targetPosX ++
            this.facing = 'right'
        }
        if (targetPosX > 14){
            targetPosX = 14
        } else if (targetPosX < 1){
            targetPosX = 1
        }
        
        //Checking blockage
        let blocked = false
        let targetObject = roomModule.currentRoom.findObjectByPosition(targetPosX, targetPosY, ['disc'])
        if (targetObject){
            blocked = true
        }

        let moved = false;

        if (!blocked) {
            this.posX = targetPosX
            this.posY = targetPosY
            moved = true
        }

        return moved
    }
}

export class DiscScanner {
    constructor({posX=7, posY=5, effectOn=()=>{}, effectOff=()=>{}, color='default', state='off'}){
        this.posX = posX
        this.posY = posY
        this.tags = ['sensor']
        this.renderLayer = 'sensor'
        this.effectOn = effectOn;
        this.effectOff = effectOff;
        this.color = color;
        this.sprite = 'scan-' + this.color
        this.state = state
    }
    validate(){
        const disc = roomModule.currentRoom.findObjectByPosition(this.posX, this.posY, ['disc'])
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

export class ToggleButton {
    constructor({posX=7, posY=5, color='', pressed=false}){
        this.posX = posX
        this.posY = posY
        this.tags = ['sensor']
        this.renderLayer = 'sensor'
        this.color = color;
        this.sprite;
        this.state = 'off';
        this.pressed = pressed;
    }
    validate(){
        const object = roomModule.currentRoom.findObjectByPosition(this.posX, this.posY, ['block', 'bot'])
        if (object) {
            this.state = 'on'
            if (!this.pressed) {
                this.pressed = true
                netSwitch(this.color)
            }
        } else {
            this.state = 'off'
            this.pressed = false
        }
    }
    get sprite() {
        return `button-${this.state}-${this.color}`
    }
}

export class PressurePlate {
    constructor({posX=7, posY=5, color=''}){
        this.posX = posX
        this.posY = posY
        this.tags = ['sensor']
        this.renderLayer = 'sensor'
        this.color = color;
        this.sprite;
        this.state = 'off'
        this.pressed = false
    }
    get sprite() {
        return `plate-${this.state}-${this.color}`
    }
    validate(){
        const object = roomModule.currentRoom.findObjectByPosition(this.posX, this.posY, ['block', 'bot'])
        if(object){
            if (!this.pressed){
                this.state = 'on'
                netSwitch(this.color)
            }
            this.pressed = true
        } else {
            if (this.pressed){
                this.state = 'off'
                netSwitch(this.color)
            }
            this.pressed = false
        }
    }
}

export class TeleportPad {
    constructor({posX=7, posY=5, color='', state='on'}){
        this.posX = posX
        this.posY = posY
        this.tags = ['teleport']
        this.renderLayer = 'sensor'
        this.color = color;
        this.sprite;
        this.state = state
        this.colorNet = this.color;
    }
    get sprite() {
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
        this.colorNet = color
        this.tags = ['block']
        this.class = FlipWall
        if (state=='off'){
            this.tags = []
        } else {
            this.tags = ['block']
        }
    }
    switchState(){
        if (this.state == 'off') {
            this.tags = ['block']
            this.state = 'on'
        } else {
            this.tags = []
            this.state = 'off'
        }
    }
    get sprite() {
        return `${this.color}-wall-${this.state}`
    }
}

export class DiscTrap {
    constructor({posX=0, posY=0, state='on', color='white'}){
        this.posX = posX
        this.posY = posY
        this.tags = ['sensor']
        this.renderLayer = 'sensor'
        this.state = state
        this.color = color
        this.colorNet = color
    }
    get sprite(){
        return `disc-trap-${this.state}-${this.color}`
    }
    validate(){
        if (this.state == 'off'){
            return
        }
        const discFloor = roomModule.currentRoom.findObjectByPosition(this.posX, this.posY, ['disc'])
        const bot = roomModule.currentRoom.findObjectByPosition(this.posX, this.posY, ['player'])
        if (bot?.disc) {
            if (discFloor){
                return
            }
            bot.disc.posX = this.posX
            bot.disc.posY = this.posY
            bot.disc.tags = ['disc']
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

export class Conveyor {
    constructor({posX=7, posY=5, dir='right', color='white', state='off'}){
        this.posX = posX
        this.posY = posY
        this.dir = dir
        this.color = color
        this.colorNet = color
        this.state = state
        this.renderLayer = 'sensor'
        this.tags = ['dynamic']
        this.ticsSinceFrame = 0
        this.animationTicDelay = 24/8
        this.animatioFrame = 0
        this.ticsSinceMove = 0;
        this.moveTicDelay = 24/8
    }
    get sprite(){
        return `conveyor-${this.dir}-${this.animatioFrame}-${this.color}`
    }
    dynamics(){
        if (this.state == 'on') {
            this.ticsSinceMove ++
            this.ticsSinceFrame ++
            if (this.ticsSinceFrame > this.animationTicDelay) {
                this.animatioFrame ++
                if (this.animatioFrame > 3){
                    this.animatioFrame = 0
                }
                this.ticsSinceFrame = 0
            }
            const object = roomModule.currentRoom.findObjectByPosition(this.posX, this.posY, ['movable'])
            if (this.ticsSinceMove > this.moveTicDelay) {
                if (object){
                    if (!object.movedByConveryor){
                        object.move(this.dir)
                        object.movedByConveryor = true
                    }
                }
                this.ticsSinceMove = 0
            } else {
                if (object){
                    object.movedByConveryor = false
                }
            }
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
        this.tags = ['block', 'box', 'movable']
        this.renderLayer = 'block'
        this.sprite = 'box'
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
        if (targetPosY > 8){
            targetPosY = 8
        } else if (targetPosY < 1){
            targetPosY = 1
        }

        if (dir == 'left'){
            targetPosX --
            this.facing = 'left'
        }
        if (dir == 'right'){
            targetPosX ++
            this.facing = 'right'
        }
        if (targetPosX > 14){
            targetPosX = 14
        } else if (targetPosX < 1){
            targetPosX = 1
        }
        
        //Checking blockage
        let blocked = false
        let targetObject = roomModule.currentRoom.findObjectByPosition(targetPosX, targetPosY, ['bot', 'block'])
        if (targetObject){
            blocked = true
        }

        let moved = false;

        if (!blocked) {
            this.posX = targetPosX
            this.posY = targetPosY
            moved = true
        }

        return moved
    }
}

export class RemoteBot {
    constructor({posX=0, posY=0, disc=null}){
        this.posX = posX
        this.posY = posY
        this.posYOffset = 6
        this.tags = ['bot', 'movable'] 
        this.renderLayer = 'player'
        this.facing = 'left'
        this.sprite = 'remote-bot-' + this.facing
        this.disc = disc
    }
    inventory(){
        let floorDisc = roomModule.currentRoom.takeObjectByPosition(this.posX, this.posY, ['disc'])
        if (this.disc){
            this.disc.posX = this.posX
            this.disc.posY = this.posY
            this.disc.tags = ['disc']
            roomModule.currentRoom.objectList.push(this.disc)
        }
        this.disc = floorDisc
    }
    move(dir){
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
        if (targetPosX > 15){
            targetPosX = 15
        } else if (targetPosX < 0){
            targetPosX = 0
        }
        
        let blocked = false
        let targetObject = roomModule.currentRoom.findObjectByPosition(targetPosX, targetPosY, ['bot', 'block'])
        if (targetObject){
            if (this.disc?.color == 'green') {
                if (targetObject.tags.includes('box')){
                    if (!targetObject.move(dir)){
                        blocked = true
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

            this.posX = targetPosX
            this.posY = targetPosY
            botMoved = true

            let floorDisc = roomModule.currentRoom.findObjectByPosition(targetPosX, targetPosY, ['disc'])
            if (floorDisc && this.disc == null){
                this.inventory()
            }
        }
        this.sprite = 'remote-bot-' + this.facing
        return botMoved
    }
    discAction(){
        if (!this.disc){
            return
        }
        if (this.disc.color == 'purple'){
            roomModule.currentRoom.forEachGameObject((obj)=>{
                if (obj.tags.includes('teleport')){
                    if (!roomModule.currentRoom.findObjectByPosition(obj.posX, obj.posY, ['bot', 'block'])){
                        this.posX = obj.posX
                        this.posY = obj.posY
                    }
                }
            })
            return
        }
        if (this.disc.color == 'green'){
            if (this.state == 'walking'){
                return
            }

            if (this.posX > 14 || this.posX < 1 || this.posY > 8 || this.posY < 1){
                return
            }

            let box = roomModule.currentRoom.findObjectByPosition(this.posX - 1, this.posY, ['box'])
            if (box) {
                if (this.move('right')){
                    box.move('right')
                    return
                }
            }
            box = roomModule.currentRoom.findObjectByPosition(this.posX + 1, this.posY, ['box'])
            if (box) {
                if (this.move('left')){
                    box.move('left')
                    return
                }
            }
            box = roomModule.currentRoom.findObjectByPosition(this.posX, this.posY + 1, ['box'])
            if (box) {
                if (this.move('up')){
                    box.move('up')
                    return
                }
            }
            box = roomModule.currentRoom.findObjectByPosition(this.posX, this.posY - 1, ['box'])
            if (box) {
                if (this.move('down')){
                    box.move('down')
                    return
                }
            }
        }
    }
}