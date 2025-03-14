import { getNow } from "../time-manager.js";
import { roomModule, gameWidthInTiles} from "./game-manager.js";

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
    inventory(){
        let floorDisc = roomModule.currentRoom.takeObjectByPosition(this.posX, this.posY, ['disc'])
        if (this.disc){
            this.disc.posX = this.posX
            this.disc.posY = this.posY
            roomModule.currentRoom.objectList.push(this.disc)
        }
        this.disc = floorDisc
    },
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
            roomModule.currentRoom = roomModule.currentRoom.downRoom;
            targetPosY = 0
        } else if (targetPosY < 0){
            roomModule.currentRoom = roomModule.currentRoom.upRoom;
            targetPosY = 9
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
            targetPosX = 0
            roomModule.currentRoom = roomModule.currentRoom.rightRoom;
        } else if (targetPosX < 0){
            roomModule.currentRoom = roomModule.currentRoom.leftRoom;
            targetPosX = 15
        }
        
        //Checking blockage
        let blocked = false
        let remoteBotMoved = false
        let targetObject = roomModule.currentRoom.findObjectByPosition(targetPosX, targetPosY, ['block', 'bot'])
        if (targetObject){
            if (this.disc?.color == 'green') {
                if (targetObject.tags.includes('box')){
                    if (!targetObject.move(dir)){
                        blocked = true
                    }
                } else {
                    blocked = true
                }
            } else if (this.disc?.color == 'yellow'){
                if (targetObject.tags.includes('bot')){
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

        this.sprite = 'disc-bot-' + this.facing
        this.state = 'walking'

        if (this.disc?.color == 'yellow' && !remoteBotMoved){
            roomModule.currentRoom.forEachGameObject((obj)=>{
                if (obj.tags.includes('bot')) {
                    obj.move(dir)
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
        if (this.disc.color == 'purple'){
            roomModule.currentRoom.forEachGameObject((obj)=>{
                if (obj.tags.includes('teleport')){
                    if (!roomModule.currentRoom.findObjectByPosition(obj.posX, obj.posY, ['block', 'bot']) && obj.state == 'on'){
                        this.posX = obj.posX
                        this.posY = obj.posY
                        return
                    }
                }
            })
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