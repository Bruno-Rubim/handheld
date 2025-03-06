import { DiscScanner, DiscTrap, FlipWall, Disc, netSwitch, RemoteBot, SwitchButton } from "./game-objects.js";
import { player } from "./player.js";

export class Room {
    constructor({playerStartPos={posX:0, posY:0}}){
        this.objectList = []
        this.leftRoom = null
        this.rightRoom = null
        this.upRoom = null
        this.downRoom = null
        this.colorNets={}
        this.playerStartPos = playerStartPos
        this.objectList.push(player)
    }
    playerSpawn(){
        player.posX = this.playerStartPos.posX
        player.posY = this.playerStartPos.posY
    }
    addLineToObjectList(originalObj, orientation, posStart, posEnd, fixedAxis){
        let obj = originalObj;
        for(let i = posStart; i <= posEnd; i++){
            if (originalObj.class){
                // console.log(originalObj.constructor)
                obj = new originalObj.constructor(obj)
            } else {
                obj = {...originalObj}
            }
            if (orientation == 'x'){
                obj.posY = fixedAxis;
                obj.posX = i;
            } else {
                obj.posX = fixedAxis;
                obj.posY = i;
            }
            this.objectList.push(obj)
        }
    }
    forEachGameObject(funct){
        for(let i = 0; i < this.objectList.length; i++){
            funct(this.objectList[i])
        }
    }
    findObjectByPosition(posX, posY, layer){
        for(let i = 0; i < this.objectList.length; i++){
            if (this.objectList[i].posX == posX &&
                this.objectList[i].posY == posY &&
                this.objectList[i].layer == layer) {
                return this.objectList[i]
            }
        }
        return null
    }
    takeObjectByPosition(posX, posY, layer){
        for(let i = 0; i < this.objectList.length; i++){
            if (this.objectList[i].posX == posX &&
                this.objectList[i].posY == posY &&
                this.objectList[i].layer == layer) {
                let object = this.objectList[i]
                this.objectList.splice(i, 1);
                return object
            }
        }
        return null
    }
}

//test room
export let testRoom = new Room({playerStartPos:{posX: 2, posY: 3}})
testRoom.rightRoom = null

testRoom.objectList.push(new Disc({color:'red', posX: 3, posY: 4,}))
testRoom.objectList.push(new Disc({color:'purple', posX: 2, posY: 7,}))
testRoom.objectList.push(new Disc({color:'green', posX: 4, posY: 7}))
testRoom.objectList.push(new Disc({color:'yellow', posX: 3, posY: 3}))

testRoom.objectList.push(({name:'box', posX: 9, posY: 5, layer:'player'}))

testRoom.objectList.push(new DiscTrap({posX: 11, posY: 1}))

testRoom.objectList.push(
    new DiscScanner({color: 'red', posX: 4, posY: 4,}))

testRoom.objectList.push({name:'teleport-pad', posX: 6, posY: 3, layer:'teleport'})

testRoom.objectList.push(new RemoteBot({posX: 7, posY: 8, disc:null}))

testRoom.objectList.push(new SwitchButton({posX: 5, posY: 3,color: 'blue'}))

testRoom.addLineToObjectList(new FlipWall({color:'red', state:'on', layer:'player'}), 'y', 2, 7, 14)
testRoom.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 0)
testRoom.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 9)
testRoom.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 0)
testRoom.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 2, 15)
testRoom.addLineToObjectList({name:'wall', layer:'player'}, 'y', 7, 9, 15)

//room0
export let roomButton1 = new Room({playerStartPos:{posX: 1, posY: 5}})

roomButton1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 0)
roomButton1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 1)
roomButton1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 2)
roomButton1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 8, 12, 3)
roomButton1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 8, 12, 6)
roomButton1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 7)
roomButton1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 8)
roomButton1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 9)
roomButton1.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 0)

roomButton1.addLineToObjectList(new FlipWall({color:'white', state:'on', layer:'player'}), 'y', 4, 5, 8)
roomButton1.objectList.push (new SwitchButton({posX: 5, posY: 4, color: 'white'}))

//room1
export let roomButton2 = new Room({playerStartPos:{posX: 0, posY: 5}})
roomButton1.rightRoom = roomButton2
roomButton2.leftRoom = roomButton1

roomButton2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 8, 0)
roomButton2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 8, 1)

roomButton2.objectList.push({name:'wall', layer:'player', posX:9, posY:1})
roomButton2.addLineToObjectList(new FlipWall({color:'white', state:'off'}), 'x', 10, 12, 1)
roomButton2.objectList.push({name:'wall', layer:'player', posX:13, posY:1})

roomButton2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 8, 2)
roomButton2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 7)
roomButton2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 8)
roomButton2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 9)

roomButton2.objectList.push({name:'wall', layer:'player', posX:7, posY:3})
roomButton2.addLineToObjectList(new FlipWall({color:'white', state:'on'}), 'y', 4, 5, 7)
roomButton2.objectList.push({name:'wall', layer:'player', posX:7, posY:6})

roomButton2.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 14)
roomButton2.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 15)

roomButton2.objectList.push(new SwitchButton({posX: 4,posY: 3,color: 'white'}))
roomButton2.objectList.push(new SwitchButton({posX: 12, posY: 5, color: 'white'}))

//room2
export let roomDisc1 = new Room({playerStartPos:{posX: 12, posY: 9}})

roomButton2.upRoom = roomDisc1
roomDisc1.downRoom = roomButton2

roomDisc1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 0)
roomDisc1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 5, 8, 1)
roomDisc1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 5, 8, 7)
roomDisc1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 8, 8)
roomDisc1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 8, 9)
roomDisc1.addLineToObjectList(new FlipWall({color:'white', state:'on'}), 'y', 1, 7, 2)
roomDisc1.addLineToObjectList({name:'wall', layer:'player'}, 'y', 8, 9, 14)
roomDisc1.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 15)

roomDisc1.objectList.push(new Disc({posX: 11, posY: 2, color: 'white'}))

roomDisc1.objectList.push(new DiscScanner({posX: 6, posY: 4, color: 'white'}))


//room3
export let roomDiscButton = new Room({playerStartPos:{posX: 15, posY: 4}})

roomDisc1.leftRoom = roomDiscButton
roomDiscButton.rightRoom = roomDisc1

roomDiscButton.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 4, 0)
roomDiscButton.addLineToObjectList(new FlipWall({color:'white', state:'on'}), 'x', 5, 9, 0)
roomDiscButton.addLineToObjectList({name:'wall', layer:'player'}, 'x', 10, 15, 0)
roomDiscButton.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 4, 1)
roomDiscButton.addLineToObjectList(new FlipWall({color:'blue', state:'off'}), 'x', 5, 9, 1)
roomDiscButton.addLineToObjectList({name:'wall', layer:'player'}, 'x', 10, 15, 1)
roomDiscButton.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 4, 7)
roomDiscButton.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 8)
roomDiscButton.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 9)

roomDiscButton.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 0)
roomDiscButton.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 2, 1)
roomDiscButton.addLineToObjectList({name:'wall', layer:'player'}, 'y', 6, 9, 1)
roomDiscButton.addLineToObjectList(new FlipWall({color:'blue', state:'on'}), 'y', 2, 6, 4)

roomDiscButton.objectList.push(new SwitchButton({posX: 8, posY: 5, color: 'blue'}))

roomDiscButton.objectList.push(new Disc({posX: 14, posY: 7, color: 'white'}))

roomDiscButton.objectList.push(new DiscScanner({posX: 2, posY: 4, color: 'white'}))

//room4
export let roomDisc2 = new Room({playerStartPos:{posX: 7, posY:9}})

roomDiscButton.upRoom = roomDisc2
roomDisc2.downRoom = roomDiscButton

roomDisc2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 0)
roomDisc2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 1)
roomDisc2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 12, 15, 2)
roomDisc2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 12, 15, 7)
roomDisc2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 10, 15, 8)
roomDisc2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 4, 8)
roomDisc2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 4, 9)
roomDisc2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 10, 15, 9)

roomDisc2.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 0)
roomDisc2.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 1)
roomDisc2.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 2)
roomDisc2.addLineToObjectList(new FlipWall({color:'white', state:'on'}), 'y', 3, 6, 13)
roomDisc2.addLineToObjectList(new FlipWall({color:'green', state:'on'}), 'y', 3, 6, 14)

roomDisc2.objectList.push({name:'box', posX: 10, posY: 3, layer:'player'})
roomDisc2.objectList.push({name:'box', posX: 10, posY: 6, layer:'player'})

roomDisc2.objectList.push(new Disc({color: 'green', posX: 4, posY: 3}))
roomDisc2.objectList.push(new Disc({color: 'white', posX: 4, posY: 6}))

roomDisc2.objectList.push(new DiscScanner({color: 'green', posX: 4, posY: 6}))
roomDisc2.objectList.push(new DiscScanner({color: 'white', posX: 4, posY: 3}))

//room5
export let roomPushBox = new Room({playerStartPos:{posX: 0, posY:4}})

roomDisc2.rightRoom = roomPushBox
roomPushBox.leftRoom = roomDisc2

roomPushBox.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 0)
roomPushBox.addLineToObjectList({name:'wall', layer:'player'}, 'x', 4, 10, 3)
roomPushBox.addLineToObjectList({name:'wall', layer:'player'}, 'x', 4, 10, 7)
roomPushBox.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 8)
roomPushBox.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 9)

roomPushBox.addLineToObjectList({name:'box', layer:'player'}, 'y', 4, 5, 1)
roomPushBox.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 2, 0)
roomPushBox.addLineToObjectList({name:'wall', layer:'player'}, 'y', 7, 9, 0)
roomPushBox.addLineToObjectList(new FlipWall({color:'green', state:'off'}), 'y', 4, 6, 10)
roomPushBox.addLineToObjectList({name:'box', layer:'player'}, 'y', 4, 6, 4)
roomPushBox.addLineToObjectList(new FlipWall({color:'green', state:'on'}), 'y', 1, 3, 15)
roomPushBox.addLineToObjectList({name:'wall', layer:'player'}, 'y', 4, 9, 15)

roomPushBox.objectList.push(new Disc({color: 'green', posX: 6, posY: 5}))
roomPushBox.objectList.push(new DiscScanner({color: 'green', posX: 8, posY: 5}))
roomPushBox.addLineToObjectList({name:'wall', layer:'player'}, 'x', 4, 10, 3)

//roomTrap1
export let roomTrap1 = new Room({playerStartPos:{posX: 0, posY:2}})

roomPushBox.rightRoom = roomTrap1
roomTrap1.leftRoom = roomPushBox

roomTrap1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 10, 0)
roomTrap1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 14, 15, 0)
// roomTrap1.addLineToObjectList(new DiscTrap({color:'white', state:'on'}), 'x', 11, 13, 1)
roomTrap1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 9)
roomTrap1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 4, 10, 1)
roomTrap1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 4, 10, 2)
roomTrap1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 4, 10, 3)
roomTrap1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 4, 10, 4)
roomTrap1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 5, 9, 5)
roomTrap1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 5, 9, 7)
roomTrap1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 8)

roomTrap1.addLineToObjectList({name:'wall', layer:'player'}, 'y', 4, 9, 0)
roomTrap1.addLineToObjectList({name:'wall', layer:'player'}, 'y', 1, 4, 14)
roomTrap1.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 15)

roomTrap1.objectList.push(new Disc({color: 'green', posX: 4, posY: 5}))
roomTrap1.objectList.push(new Disc({color: 'white', posX: 4, posY: 7}))

roomTrap1.objectList.push({name:'box', posX: 9, posY: 6, layer:'player'})
roomTrap1.objectList.push(new DiscTrap({posX: 7, posY: 6}))

roomTrap1.objectList.push(new DiscTrap({posX: 11, posY: 1}))
roomTrap1.objectList.push(new DiscTrap({posX: 12, posY: 1}))
roomTrap1.objectList.push(new DiscTrap({posX: 13, posY: 1}))

//room6
export let roomTrap2 = new Room({playerStartPos:{posX: 12, posY:9}})

roomTrap1.upRoom = roomTrap2
roomTrap2.downRoom = roomTrap1

roomTrap2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 0)
roomTrap2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 4, 15, 5)
roomTrap2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 10, 9)
roomTrap2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 3, 9, 6)
roomTrap2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 3, 9, 8)
roomTrap2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 14, 15, 9)

roomTrap2.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 0)
roomTrap2.addLineToObjectList(new FlipWall({color:'white', state:'on'}), 'y', 1, 4, 12)
roomTrap2.addLineToObjectList(new FlipWall({color:'green', state:'on'}), 'y', 1, 4, 13)
roomTrap2.addLineToObjectList({name:'wall', layer:'player'}, 'y', 4, 9, 15)

roomTrap2.objectList.push(new Disc({color: 'green', posX: 14, posY: 6}))
roomTrap2.objectList.push(new Disc({color: 'white', posX: 14, posY: 8}))

roomTrap2.objectList.push({name:'box', posX: 9, posY: 7, layer:'player'})

roomTrap2.objectList.push(new DiscTrap({posX: 6, posY: 7}))

roomTrap2.objectList.push(new DiscScanner({color: 'white', posX: 8, posY: 2}))
roomTrap2.objectList.push(new DiscScanner({color: 'green', posX: 8, posY: 3}))

//roomIdk
export let roomIdk = new Room({playerStartPos:{posX: 0, posY:3}})

roomTrap2.rightRoom = roomIdk
roomIdk.leftRoom = roomTrap2
