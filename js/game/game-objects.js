import { findSound } from "../sounds.js";
import { getNow } from "../time-manager.js";
import { controlsDict, roomModule } from "./game-manager.js";

export const oppDir = {
    left: 'right',
    right: 'left',
    up: 'down',
    down: 'up',
}

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
        this.controls.unshift('controls-eject-disc')
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
        let targetObject = roomModule.currentRoom.findObjectByPosition(targetPosX, targetPosY, ['disc', 'block'])
        if (targetObject){
            blocked = true
        }

        let moved = false;

        if (!blocked) {
            this.posX = targetPosX
            this.posY = targetPosY
            moved = true
        }

        this.posYOffset = 0
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
                this.state = 'on'
                // findSound('scan-on').play()
                netSwitch(this.color)
            }
        } else {
            if (this.state == 'on') { 
                this.state = 'off'
                // findSound('scan-off').play()
                netSwitch(this.color)
            }
        }
    }
}

export class Lever {
    constructor({posX=7, posY=5, color='', pressed=false}){
        this.posX = posX
        this.posY = posY
        this.tags = ['sensor', 'lever']
        this.renderLayer = 'sensor'
        this.color = color;
        this.sprite;
        this.state = 'off';
        this.pressed = pressed;
        this.colorNet = color;
    }
    validate(){
        const object = roomModule.currentRoom.findObjectByPosition(this.posX, this.posY, ['bot'])
        if (object) {
            if (!this.pressed) {
                this.pressed = true
                netSwitch(this.color)
            }
        } else {
            this.pressed = false
        }
    }
    switchState(){
        if (this.state == 'on'){
            this.state = 'off'
            // findSound('lever-off').play()
        } else {
            this.state = 'on'
            // findSound('lever-on').play()
        }
    }
    get sprite() {
        return `lever-${this.color}-${this.state}`
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
        return `plate-${this.color}-${this.state}`
    }
    validate(){
        const object = roomModule.currentRoom.findObjectByPosition(this.posX, this.posY, ['block', 'bot'])
        if(object){
            if (!this.pressed){
                this.state = 'on'
                // findSound('plate-on').play()
                netSwitch(this.color)
            }
            this.pressed = true
            return
        }
        const disc = roomModule.currentRoom.findObjectByPosition(this.posX, this.posY, ['disc'])
        if (disc) {
            disc.posYOffset = 1
        }
        if (this.pressed){
            this.state = 'off'
            // findSound('plate-off').play()
            netSwitch(this.color)
        }
        this.pressed = false
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
        return `teleport-pad-${this.color}-${this.state}`
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
        return `wall-${this.color}-${this.state}`
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
    constructor({posX=7, posY=5, dir='right', color='white', speed=4, corner=null}){
        this.posX = posX
        this.posY = posY
        this.dir = dir
        this.color = color
        this.colorNet = color
        this.renderLayer = 'conveyor'
        this.tags = ['dynamic']
        this.tags[1] = dir
        this.ticsSinceFrame = 0
        this.animationTicDelay = 24/(speed*2)
        this.animatioFrame = 0
        this.ticsSinceMove = 0;
        this.moveTicDelay = 24/speed
    }
    get sprite(){
        return `conveyor-${this.color}-${this.dir}-${this.animatioFrame}`
    }
    dynamics(){
        this.ticsSinceFrame ++
        if (this.ticsSinceFrame > this.animationTicDelay) {
            this.animatioFrame ++
            if (this.animatioFrame > 3){
                this.animatioFrame = 0
            }
            this.ticsSinceFrame = 0
        }
        const object = roomModule.currentRoom.findObjectByPosition(this.posX, this.posY, ['movable'])
        this.ticsSinceMove ++
        if (this.ticsSinceMove > this.moveTicDelay) {
            if (object){
                if (!object.movedByConveryor){
                    object.move(this.dir, 'dynamic')
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
    switchState(){
        this.dir = oppDir[this.dir]
        this.tags[1] = this.dir
    }
}

export class RedDiscProjectile {
    constructor({posX=0, posY=0, dir='left'}){
        this.posX = posX
        this.posY = posY
        this.dir = dir
        this.tags = ['dynamic', 'projectile'] 
        this.renderLayer = 'player'
        this.sprite = 'red-projectile-' + this.dir
        this.ticsSinceMove = 0
        this.moveTicDelay = 1
    }
    dynamics(){
        this.ticsSinceMove ++
        if (this.ticsSinceMove > this.moveTicDelay) {
            this.move(this.dir)
            this.ticsSinceMove = 0
        }
    }
    move(dir){
        let targetPosX = this.posX;
        let targetPosY = this.posY;

        this.lastMoveTime = getNow()
        this.lastMoveDir = dir
        let blocked = false

        if (dir == 'up'){
            targetPosY --
        }
        if (dir == 'down'){
            targetPosY ++
        }
        if (targetPosY > 9){
            blocked = true
        } else if (targetPosY < 0){
            blocked = true
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
            blocked = true
        } else if (targetPosX < 0){
            blocked = true
        }
        
        let targetObject = roomModule.currentRoom.findObjectByPosition(targetPosX, targetPosY, ['block', 'lever', 'bot'])
        if (targetObject){
            if (targetObject.tags.includes('lever')) {
                netSwitch(targetObject.colorNet)
            }
            blocked = true
        }
        console.log(blocked)
        if (!blocked) {
            this.posX = targetPosX
            this.posY = targetPosY
        } else {
            roomModule.currentRoom.takeObjectByPosition(this.posX, this.posY, ['projectile'])
            let floorDisc = roomModule.currentRoom.findObjectByPosition(targetPosX, targetPosY, ['disc'])
            if (targetObject?.tags.includes('bot') && (!targetObject.disc || !floorDisc)) {
                targetObject.inventory()
                targetObject.disc = new Disc({color:'red'})
                return;
            }
            roomModule.currentRoom.objectList.push(new Disc({color:'red', posX:this.posX, posY:this.posY}))
        }
    }
}

export class Pole {
    constructor({posX=0, posY=0, color='', state='off'}){
        this.posX = posX
        this.posY = posY
        this.color = color
        this.state = state
        this.colorNet = color
        this.tags = ['half-block']
        if (state=='off'){
            this.tags = []
        } else {
            this.tags = ['half-block']
        }
    }
    switchState(){
        if (this.state == 'off') {
            this.tags = ['half-block']
            this.state = 'on'
        } else {
            this.tags = []
            this.state = 'off'
        }
    }
    get sprite() {
        return `pole-${this.color}-${this.state}`
    }
}

const blocksMovement = [
    'block', 'wall', 'half-block',
]

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
            // findSound('error').play()
            return false
        } else if (targetPosY < 1){
            // findSound('error').play()
            return false
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
            findSound('error').play()
        } else if (targetPosX < 1){
            targetPosX = 1
            findSound('error').play()
        }
        
        //Checking blockage
        let blocked = false
        let targetObject = roomModule.currentRoom.findObjectByPosition(targetPosX, targetPosY, [...blocksMovement, 'bot', 'lever'])
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
        this.tags = ['bot', 'movable', 'remoteBot'] 
        this.renderLayer = 'player'
        this.facing = 'left'
        this.disc = disc
        this.moved = false
    }
    get sprite(){
        return `remote-bot-${this.facing}`
    }
    inventory(){
        if (this.pointer) {
            controlsDict['red'] = ['eject-disc', 'pointer'];
            this.pointer = null
            return
        }
        let floorDisc = roomModule.currentRoom.takeObjectByPosition(this.posX, this.posY, ['disc'])
        if (this.disc){
            this.disc.posX = this.posX
            this.disc.posY = this.posY
            this.disc.tags = ['disc']
            roomModule.currentRoom.objectList.push(this.disc)
        }
        this.disc = floorDisc
    }
    move(dir, type){
        if (this.moved){
            return false
        }

        if (type == 'input') {
            if (dir != 'up' && dir != 'down') {
                this.facing = dir
            }
        }

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
        }
        if (dir == 'right'){
            targetPosX ++
        }
        if (targetPosX > 15){
            targetPosX = 15
        } else if (targetPosX < 0){
            targetPosX = 0
        }
        
        let blocked = false
        let targetObject = roomModule.currentRoom.findObjectByPosition(targetPosX, targetPosY, [...blocksMovement, 'bot', oppDir[dir]])
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
        this.moved = botMoved;
        return botMoved
    }
    discAction(){
        if (!this.disc){
            return
        }
        if (this.disc.color == 'red'){
            if (this.pointer) {
                let pointerXShift = 0
                let pointerYShift = 0
                switch (this.pointer) {
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
                let targetObject = roomModule.currentRoom.findObjectByPosition(this.posX + pointerXShift, this.posY + pointerYShift, ['block', 'lever', 'bot'])
                console.log(targetObject)
                if (targetObject) {
                    if (targetObject.tags.includes('bot')){
                        let floorDisc = roomModule.currentRoom.findObjectByPosition(targetObject.posX, targetObject.posY, ['disc'])
                        if (targetObject.tags.includes('bot') && (!targetObject.disc || !floorDisc)) {
                            targetObject.inventory()
                            targetObject.disc = new Disc({color:'red'})
                            this.pointer = null
                            this.disc = null
                            return;
                        }
                    }
                    findSound('error').play()
                    return
                }
                roomModule.currentRoom.objectList.push(new RedDiscProjectile({
                    posX: this.posX + pointerXShift,
                    posY: this.posY + pointerYShift,
                    dir: this.pointer}))
                this.pointer = null
                this.disc = null
                return
            }
            this.pointer = this.lastMoveDir
            return
        }
        if (this.disc.color == 'purple'){
            let teleported = false;
            roomModule.currentRoom.forEachGameObject((obj)=>{
                if (obj.tags.includes('teleport')){
                    if (!roomModule.currentRoom.findObjectByPosition(obj.posX, obj.posY, ['block', 'bot']) && obj.state == 'on'){
                        this.posX = obj.posX
                        this.posY = obj.posY
                        teleported = true
                        return
                    }
                }
            })
            if (!teleported) {
                findSound('error').play()
            }
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

export const player = {
    sprite: 'disc-bot-right',
    posX: 1,
    posY: 4,
    posYOffset: 6,
    tags: ['player', 'bot', 'movable'],
    renderLayer: 'player',
    lastMoveDir: null,
    lastMoveTime: getNow(),
    moveDelay: 175,
    facing: 'left',
    disc: null,
    pointer: null,
    get sprite() {
        return `disc-bot-${this.facing}`
    },
    inventory(){
        if (this.pointer) {
            controlsDict['red'] = ['eject-disc', 'pointer'];
            this.pointer = null
            return
        }
        let floorDisc = roomModule.currentRoom.takeObjectByPosition(this.posX, this.posY, ['disc'])
        if (this.disc){
            this.disc.posX = this.posX
            this.disc.posY = this.posY
            this.disc.posYOffset = 0
            roomModule.currentRoom.objectList.push(this.disc)
        }
        this.disc = floorDisc
    },
    move(dir, type){
        //Checking direction

        let targetPosX = this.posX;
        let targetPosY = this.posY;

        if (type == 'input'){
            if (this.lastMoveDir == dir){
                if (this.lastMoveTime + this.moveDelay > getNow()){
                    return
                }
            }
            if (this.disc?.color == 'yellow'){
                let remoteBot;
                roomModule.currentRoom.forEachGameObject((obj)=>{
                    if (obj.tags.includes('remoteBot')){
                        remoteBot = obj
                    }
                })
                if (remoteBot.disc?.color == 'red' && remoteBot.pointer) {
                    if (dir != 'up' && dir != 'down') {
                        remoteBot.facing = dir
                    }
                    remoteBot.pointer = dir
                    return
                }
            }
            if (dir != 'up' && dir != 'down') {
                this.facing = dir
            }
            if (this.disc?.color == 'red' && this.pointer){
                this.pointer = dir
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
            roomModule.currentRoom = roomModule.currentRoom.downRoom;
            this.posY = 0
            if (!roomModule.currentRoom.loaded){
                roomModule.currentRoom.loadRoom()
            }
            return
        } else if (targetPosY < 0){
            roomModule.currentRoom = roomModule.currentRoom.upRoom;
            this.posY = 9
            if (!roomModule.currentRoom.loaded){
                roomModule.currentRoom.loadRoom()
            }
            return
        }
        
        if (dir == 'left'){
            targetPosX --
        }
        if (dir == 'right'){
            targetPosX ++
        }
        if (targetPosX > 15){
            roomModule.currentRoom = roomModule.currentRoom.rightRoom;
            this.posX = 0
            if (!roomModule.currentRoom.loaded){
                roomModule.currentRoom.loadRoom()
            }
            return
        } else if (targetPosX < 0){
            roomModule.currentRoom = roomModule.currentRoom.leftRoom;
            this.posX = 15
            if (!roomModule.currentRoom.loaded){
                roomModule.currentRoom.loadRoom()
            }
            return
        }
        
        //Checking blockage
        let blocked = false
        let remoteBotMoved = false
        let targetObject = roomModule.currentRoom.findObjectByPosition(targetPosX, targetPosY, [...blocksMovement, 'bot', oppDir[dir]])
        if (targetObject){
            if (this.disc?.color == 'green') {
                if (targetObject.tags.includes('box')){
                    if (!targetObject.move(dir)){
                        blocked = true
                    }
                } else {
                    blocked = true
                }
            } else if (this.disc?.color == 'yellow' && type == 'input'){
                if (targetObject.tags.includes('bot') && !targetObject.tags.includes('player')){
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

        let playerMoved = false;

        if (!blocked) {
            this.posX = targetPosX
            this.posY = targetPosY
            playerMoved = true

            let floorDisc = roomModule.currentRoom.findObjectByPosition(targetPosX, targetPosY, ['disc'])
            if (floorDisc && player.disc == null){
                this.inventory()
                remoteBotMoved = true
            }
        }

        this.state = 'walking'

        if (this.disc?.color == 'yellow' && !remoteBotMoved && type == 'input'){
            roomModule.currentRoom.forEachGameObject((obj)=>{
                if (obj.tags.includes('bot') && !obj.tags.includes('player')) {
                    obj.move(dir, 'input')
                }
            })
            remoteBotMoved = true;
        }

        return playerMoved
    },
    discActionA(){
        if (!this.disc){
            return
        }
        if (this.disc.color == 'red'){
            if (this.pointer) {
                controlsDict['red'] = ['eject-disc', 'pointer'];
                let pointerXShift = 0
                let pointerYShift = 0
                switch (this.pointer) {
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
                let targetObject = roomModule.currentRoom.findObjectByPosition(this.posX + pointerXShift, this.posY + pointerYShift, ['block', 'lever', 'bot'])
                if (targetObject) {
                    if (targetObject.tags.includes('bot')){
                        let floorDisc = roomModule.currentRoom.findObjectByPosition(targetObject.posX, targetObject.posY, ['disc'])
                        if (targetObject.tags.includes('bot') && (!targetObject.disc || !floorDisc)) {
                            targetObject.inventory()
                            targetObject.disc = new Disc({color:'red'})
                            this.pointer = null
                            this.disc = null
                            return;
                        }
                    }
                    findSound('error').play()
                    return
                }
                roomModule.currentRoom.objectList.push(new RedDiscProjectile({
                    posX: this.posX + pointerXShift,
                    posY: this.posY + pointerYShift,
                    dir: this.pointer}))
                this.pointer = null
                this.disc = null
                return
            }
            controlsDict['red'] = ['cancel', 'shoot'];
            this.pointer = this.lastMoveDir
            return
        }
        if (this.disc.color == 'purple'){
            let teleported = false;
            roomModule.currentRoom.forEachGameObject((obj)=>{
                if (obj.tags.includes('teleport')){
                    if (!roomModule.currentRoom.findObjectByPosition(obj.posX, obj.posY, ['block', 'bot']) && obj.state == 'on'){
                        this.posX = obj.posX
                        this.posY = obj.posY
                        teleported = true
                        return
                    }
                }
            })
            if (!teleported) {
                findSound('error').play()
            }
            return
        }
        if (this.disc.color == 'yellow'){
            roomModule.currentRoom.forEachGameObject((obj)=>{
                if (obj.tags.includes('bot') && !obj.tags.includes('player')) {
                    obj.discAction()
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
    },
    discActionB(){
        if (!this.disc){
            return
        }
    },
    discActionC(){
        if (!this.disc){
            return
        }
        if (this.disc.color == 'yellow'){
            roomModule.currentRoom.forEachGameObject((obj)=>{
                if (obj.tags.includes('bot') && !obj.tags.includes('player')) {
                    obj.inventory()
                }            
            })
            return
        }
    },
}