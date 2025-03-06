import { getNow } from "../time-manager.js";
import { gameHeightInTiles, roomModule, gameWidthInTiles} from "./game-manager.js";
import { FlipWall } from "./game-objects.js";

export const player = {
    name: 'disc-bot-right',
    posX: 1,
    posY: 4,
    layer: 'player',
    lastMoveDir: null,
    lastMoveTime: getNow(),
    moveDelay: 175,
    facing: 'left',
    disc: null,
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
    },
    move(dir){
        //Checking direction
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
        if (targetPosY > 9){
            roomModule.currentRoom = roomModule.currentRoom.downRoom;
            targetPosY = 0
        } else if (targetPosY < 0){
            roomModule.currentRoom = roomModule.currentRoom.upRoom;
            targetPosY = 9
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
            roomModule.currentRoom = roomModule.currentRoom.rightRoom;
        } else if (targetPosX < 0){
            roomModule.currentRoom = roomModule.currentRoom.leftRoom;
            targetPosX = 15
        }
        
        //Checking blockage
        let blocked = false
        let remoteBotMoved = false
        let targetObject = roomModule.currentRoom.findObjectByPosition(targetPosX, targetPosY, 'player')
        if (targetObject){
            if (this.disc?.color == 'green' && targetObject?.name == 'box'){
                if (!roomModule.currentRoom.findObjectByPosition(nextTargetPosX, nextTargetPosY, 'player')){
                    targetObject.posX = nextTargetPosX
                    targetObject.posY = nextTargetPosY
                } else {
                    blocked = true
                }
            } else if (this.disc?.color == 'yellow' && (targetObject?.name == 'remote-bot-right' || targetObject?.name == 'remote-bot-left')){
                roomModule.currentRoom.forEachGameObject((obj)=>{
                    if (obj.name == 'remote-bot-left' || obj.name == 'remote-bot-right') {
                        obj.move(dir)
                    }
                })
                remoteBotMoved = true
                targetObject = roomModule.currentRoom.findObjectByPosition(targetPosX, targetPosY, 'player')
                if (targetObject){
                    blocked = true
                }
            } else {
                blocked = true
            }
        }

        if (!blocked) {
            this.posX = targetPosX
            this.posY = targetPosY

            let button = roomModule.currentRoom.findObjectByPosition(targetPosX, targetPosY, 'button')
            if (button){
                button.switchState()
            }

            let discTrap = roomModule.currentRoom.findObjectByPosition(targetPosX, targetPosY, 'disc-trap')
            if (discTrap){
                discTrap.pullDisc()
            }

            let floorDisc = roomModule.currentRoom.findObjectByPosition(targetPosX, targetPosY, 'disc')
            if (floorDisc && player.disc == null){
                this.inventory()
                remoteBotMoved = true
            }
        }

        this.name = 'disc-bot-' + this.facing
        this.state = 'walking'

        if (this.disc?.color == 'yellow' && !remoteBotMoved){
            roomModule.currentRoom.forEachGameObject((obj)=>{
                if (obj.name == 'remote-bot-left' || obj.name == 'remote-bot-right') {
                    obj.move(dir)
                }
            })
        }
    },
    discActionA(){
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
        if (this.disc.color == 'yellow'){
            roomModule.currentRoom.forEachGameObject((obj)=>{
                if (obj.name == 'remote-bot-left' || obj.name == 'remote-bot-right') {
                    obj.discAction()
                }
            })
            return
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
                if (obj.name == 'remote-bot-left' || obj.name == 'remote-bot-right') {
                    obj.inventory()
                }            
            })
            return
        }
    },
}