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
        let discTrap = roomModule.currentRoom.findObjectByPosition(this.posX, this.posY, 'disc-trap')
        if (discTrap?.state == 'on'){
            return
        }
        let scanner = roomModule.currentRoom.findObjectByPosition(this.posX, this.posY, 'scanner')
        let floorDisc = roomModule.currentRoom.takeObjectByPosition(this.posX, this.posY, 'disc')
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
                    let nextTargetPlate = roomModule.currentRoom.findObjectByPosition(nextTargetPosX, nextTargetPosY, 'plate')
                    if (nextTargetPlate?.state == 'off'){
                        nextTargetPlate.switchState()
                    }
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

        let playerMoved = false;

        if (!blocked) {
            let currentPlate = roomModule.currentRoom.findObjectByPosition(this.posX, this.posY, 'plate')
            if (currentPlate?.state == 'on'){
                currentPlate.switchState()
            }

            this.posX = targetPosX
            this.posY = targetPosY
            playerMoved = true

            let button = roomModule.currentRoom.findObjectByPosition(targetPosX, targetPosY, 'button')
            if (button){
                button.switchState()
            }

            let targetPlate = roomModule.currentRoom.findObjectByPosition(targetPosX, targetPosY, 'plate')
            if (targetPlate?.state == 'off'){
                targetPlate.switchState()
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

        return playerMoved
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
                    if (!roomModule.currentRoom.findObjectByPosition(obj.posX, obj.posY, 'player') && obj.state == 'on'){
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
                if (obj.name == 'remote-bot-left' || obj.name == 'remote-bot-right') {
                    obj.discAction()
                }
            })
            return
        }
        if (this.disc.color == 'green'){
            if (this.state == 'walking'){
                return
            }
            const startingPosX = this.posX
            const startingPosY = this.posY
            let box = roomModule.currentRoom.findObjectByPosition(this.posX - 1, this.posY, 'player')

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