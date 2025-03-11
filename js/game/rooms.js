import { DiscScanner, DiscTrap, FlipWall, Disc, RemoteBot, SwitchButton, PressurePlate, TeleportPad } from "./game-objects.js";
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

testRoom.objectList.push(new Disc({color:'red', posX: 1, posY: 1,}))
testRoom.objectList.push(new Disc({color:'purple', posX: 2, posY: 1,}))
testRoom.objectList.push(new Disc({color:'green', posX: 3, posY: 1}))
testRoom.objectList.push(new Disc({color:'yellow', posX: 4, posY: 1}))
testRoom.objectList.push(new Disc({color:'white', posX: 5, posY: 1}))

testRoom.objectList.push(({name:'box', posX: 9, posY: 6, layer:'player'}))

testRoom.objectList.push(new DiscTrap({posX: 11, posY: 6}))

testRoom.objectList.push(new DiscScanner({color: 'red', posX: 2, posY: 6,}))
testRoom.objectList.push(new DiscScanner({color: 'white', posX: 4, posY: 6,}))

testRoom.objectList.push(new TeleportPad({posX: 6, posY: 6, color: 'white'}))

testRoom.objectList.push(new RemoteBot({posX: 7, posY: 6, disc:null}))

testRoom.objectList.push(new SwitchButton({posX: 5, posY: 6,color: 'blue'}))

testRoom.addLineToObjectList(new FlipWall({color:'red', state:'on', layer:'player'}), 'y', 2, 7, 14)
testRoom.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 0)
testRoom.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 9)
testRoom.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 0)
testRoom.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 2, 15)
testRoom.addLineToObjectList({name:'wall', layer:'player'}, 'y', 7, 9, 15)

//roomButton1
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

//roomButton2
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

//roomDisc1
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


//roomDiscButton
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

//roomDisc2
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

//roomPushBox1
export let roomPushBox1 = new Room({playerStartPos:{posX: 0, posY:4}})

roomDisc2.rightRoom = roomPushBox1
roomPushBox1.leftRoom = roomDisc2

roomPushBox1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 10, 0)
roomPushBox1.addLineToObjectList(new FlipWall({color:'green', state:'on'}), 'x', 11, 13, 0)
roomPushBox1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 14, 15, 0)
roomPushBox1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 4, 10, 3)
roomPushBox1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 4, 10, 7)
roomPushBox1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 8)
roomPushBox1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 9)

roomPushBox1.addLineToObjectList({name:'box', layer:'player'}, 'y', 4, 5, 1)
roomPushBox1.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 2, 0)
roomPushBox1.addLineToObjectList({name:'wall', layer:'player'}, 'y', 7, 9, 0)
roomPushBox1.addLineToObjectList(new FlipWall({color:'green', state:'off'}), 'y', 4, 6, 10)
roomPushBox1.addLineToObjectList({name:'box', layer:'player'}, 'y', 4, 6, 4)
roomPushBox1.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 15)

roomPushBox1.objectList.push(new Disc({color: 'green', posX: 6, posY: 5}))
roomPushBox1.objectList.push(new DiscScanner({color: 'green', posX: 8, posY: 5}))
roomPushBox1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 4, 10, 3)

//roomPushBox2
export let roomPushBox2 = new Room({playerStartPos:{posX: 12, posY:9}})

roomPushBox1.upRoom = roomPushBox2
roomPushBox2.downRoom = roomPushBox1

roomPushBox2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 10, 0)
roomPushBox2.addLineToObjectList(new FlipWall({color:'white', state:'on'}), 'x', 11, 13, 0)
roomPushBox2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 14, 15, 0)
roomPushBox2.addLineToObjectList(new FlipWall({color:'green', state:'on'}), 'x', 11, 13, 1)
roomPushBox2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 2, 4)
roomPushBox2.addLineToObjectList(new FlipWall({color:'blue', state:'on'}), 'x', 3, 6, 4)
roomPushBox2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 7, 15, 4)
roomPushBox2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 10, 9)
roomPushBox2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 14, 15, 9)

roomPushBox2.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 0)
roomPushBox2.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 15)


roomPushBox2.objectList.push(new DiscScanner({color: 'green', posX: 2, posY: 2}))
roomPushBox2.objectList.push({name: 'box', posX: 8, posY: 2, layer:'player'})

roomPushBox2.objectList.push(new PressurePlate({color: 'blue', posX: 3, posY: 7}))
roomPushBox2.objectList.push(new PressurePlate({color: 'white', posX: 8, posY: 7}))
roomPushBox2.objectList.push(new Disc({color: 'green', posX: 10, posY: 7}))
roomPushBox2.objectList.push({name: 'box', posX: 12, posY: 7, layer:'player'})

//roomRemoteBot1
export let roomRemoteBot1 = new Room({playerStartPos:{posX: 12, posY:9}})

roomPushBox2.upRoom = roomRemoteBot1
roomRemoteBot1.downRoom = roomPushBox2

roomRemoteBot1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 0)
roomRemoteBot1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 10, 1)
roomRemoteBot1.addLineToObjectList(new FlipWall({color:'white', state:'on'}), 'x', 10, 14, 4)
roomRemoteBot1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 10, 9)
roomRemoteBot1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 9, 8)
roomRemoteBot1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 14, 15, 9)

roomRemoteBot1.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 0)
roomRemoteBot1.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 1)
roomRemoteBot1.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 8)
roomRemoteBot1.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 9)
roomRemoteBot1.addLineToObjectList(new FlipWall({color:'yellow', state:'on'}), 'y', 1, 3, 15)
roomRemoteBot1.addLineToObjectList({name:'wall', layer:'player'}, 'y', 4, 9, 15)

roomRemoteBot1.objectList.push(({name:'wall', posX: 7, posY: 2, layer:'player'}))
roomRemoteBot1.objectList.push(({name:'wall', posX: 2, posY: 2, layer:'player'}))
roomRemoteBot1.objectList.push(({name:'wall', posX: 7, posY: 7, layer:'player'}))
roomRemoteBot1.objectList.push(({name:'wall', posX: 2, posY: 7, layer:'player'}))

roomRemoteBot1.objectList.push(new SwitchButton({posX: 3, posY: 4, color:'white'}))
roomRemoteBot1.objectList.push(new RemoteBot({posX: 6, posY: 6}))
roomRemoteBot1.objectList.push(new Disc({color: 'yellow', posX: 13, posY: 7}))
roomRemoteBot1.objectList.push(new DiscScanner({color: 'yellow', posX: 11, posY: 7, state:'off'}))

//roomRemoteBot2
export let roomRemotePushBox = new Room({playerStartPos:{posX: 0, posY:2}})

roomRemoteBot1.rightRoom = roomRemotePushBox
roomRemotePushBox.leftRoom = roomRemoteBot1

roomRemotePushBox.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 0)
roomRemotePushBox.addLineToObjectList({name:'wall', layer:'player'}, 'x', 11, 12, 2)
roomRemotePushBox.addLineToObjectList({name:'wall', layer:'player'}, 'x', 11, 13, 3)
roomRemotePushBox.addLineToObjectList({name:'wall', layer:'player'}, 'x', 11, 15, 4)
roomRemotePushBox.addLineToObjectList({name:'wall', layer:'player'}, 'x', 12, 15, 5)
roomRemotePushBox.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 9)

roomRemotePushBox.addLineToObjectList({name:'wall', layer:'player'}, 'y', 4, 9, 0)
roomRemotePushBox.addLineToObjectList({name:'wall', layer:'player'}, 'y', 5, 8, 1)
roomRemotePushBox.addLineToObjectList({name:'wall', layer:'player'}, 'y', 5, 8, 6)
roomRemotePushBox.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 3, 15)
roomRemotePushBox.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 3, 14)

roomRemotePushBox.objectList.push(new FlipWall({color:'yellow', posX:11, posY: 1, state:'off'}))
roomRemotePushBox.objectList.push(new DiscScanner({posX:13, posY: 2, color:'yellow', state:'on'}))
roomRemotePushBox.objectList.push(new Disc({posX:13, posY: 2, color:'yellow'}))

roomRemotePushBox.objectList.push(new RemoteBot({posX:8, posY: 7}))

roomRemotePushBox.addLineToObjectList(new FlipWall({color:'green', state:'off'}), 'x', 2, 5, 5)
roomRemotePushBox.objectList.push(new Disc({posX:3, posY: 4, color:'green'}))
roomRemotePushBox.objectList.push(new PressurePlate({posX:5, posY: 7, color:'green', state:'on'}))
roomRemotePushBox.objectList.push(new PressurePlate({posX:2, posY: 7, color:'white'}))
roomRemotePushBox.objectList.push({name:'box', posX:4, posY: 7, layer:'player'})

roomRemotePushBox.addLineToObjectList(new FlipWall({color:'white', state:'on'}), 'y', 6, 8, 13)
roomRemotePushBox.addLineToObjectList(new FlipWall({color:'green', state:'on'}), 'y', 6, 8, 14)

//roomRemoteBot2
export let roomRemoteBot3 = new Room({playerStartPos:{posX: 0, posY:7}})

roomRemotePushBox.rightRoom = roomRemoteBot3
roomRemoteBot3.leftRoom = roomRemotePushBox

roomRemoteBot3.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 0)
roomRemoteBot3.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 4)
roomRemoteBot3.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 9)

roomRemoteBot3.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 5, 0)
roomRemoteBot3.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 3, 1)
roomRemoteBot3.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 3, 13)
roomRemoteBot3.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 3, 14)
roomRemoteBot3.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 5, 15)

roomRemoteBot3.addLineToObjectList(new FlipWall({color:'yellow', state:'off'}), 'y', 6, 8, 0)
roomRemoteBot3.objectList.push(new DiscScanner({posX:3, posY: 7, color:'yellow', state:'on'}))
roomRemoteBot3.objectList.push(new Disc({posX:3, posY: 7, color:'yellow'}))

roomRemoteBot3.objectList.push(new PressurePlate({color:'blue', posX: 9, posY: 8}))
roomRemoteBot3.objectList.push(new DiscScanner({color:'green', posX: 9, posY: 5}))

roomRemoteBot3.objectList.push({name:'box', posX: 7, posY: 6, layer:'player'})
roomRemoteBot3.objectList.push(new Disc({posX:7, posY: 7, color:'green'}))

roomRemoteBot3.objectList.push(new RemoteBot({posX: 3, posY: 2}))
roomRemoteBot3.addLineToObjectList(new FlipWall({color:'blue', state:'on'}), 'y', 1, 3, 7)
roomRemoteBot3.objectList.push(new PressurePlate({color:'white', posX: 11, posY: 2}))

roomRemoteBot3.addLineToObjectList(new FlipWall({color:'green', state:'on'}), 'y', 5, 8, 12)
roomRemoteBot3.addLineToObjectList(new FlipWall({color:'white', state:'on'}), 'y', 5, 8, 13)
roomRemoteBot3.addLineToObjectList(new FlipWall({color:'yellow', state:'off'}), 'y', 5, 8, 14)

//roomRemoteBot4
export let roomRemoteBot4 = new Room({playerStartPos:{posX: 0, posY:7}})

roomRemoteBot3.rightRoom = roomRemoteBot4
roomRemoteBot4.leftRoom = roomRemoteBot3

roomRemoteBot4.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 0)
roomRemoteBot4.addLineToObjectList({name:'wall', layer:'player'}, 'x', 10, 15, 5)
roomRemoteBot4.addLineToObjectList({name:'wall', layer:'player'}, 'x', 10, 15, 3)
roomRemoteBot4.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 9)

roomRemoteBot4.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 5, 0)
roomRemoteBot4.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 5, 4)
roomRemoteBot4.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 3, 15)
roomRemoteBot4.addLineToObjectList({name:'wall', layer:'player'}, 'y', 6, 9, 15)

roomRemoteBot4.objectList.push(new Disc({color: 'green', posX: 2, posY: 6}))
roomRemoteBot4.addLineToObjectList(new FlipWall({color:'yellow', state:'off'}), 'x', 1, 3, 5)
roomRemoteBot4.objectList.push(({name: 'box', posX: 2, posY: 4, layer:'player'}))
roomRemoteBot4.objectList.push(new PressurePlate({color:'white', posX: 2, posY: 2}))

roomRemoteBot4.objectList.push(new Disc({color: 'yellow', posX: 7, posY: 6}))
roomRemoteBot4.objectList.push({name:'wall', layer:'player', posX:7, posY:5})
roomRemoteBot4.objectList.push(new DiscScanner({color: 'yellow', posX: 7, posY: 8}))

roomRemoteBot4.addLineToObjectList(new FlipWall({color:'white', state:'off'}), 'y', 1, 2, 10)
roomRemoteBot4.addLineToObjectList(new FlipWall({color:'green', state:'on'}), 'y', 1, 2, 11)
roomRemoteBot4.objectList.push(new RemoteBot({posX: 13, posY: 2}))

roomRemoteBot4.addLineToObjectList(new FlipWall({color:'green', state:'off'}), 'y', 6, 8, 10)
roomRemoteBot4.objectList.push(new DiscScanner({color: 'green', posX: 13, posY: 7, state:'off'}))

roomRemoteBot4.objectList.push(new FlipWall({color:'white', state:'on', posX:10, posY:4}))
roomRemoteBot4.objectList.push(new FlipWall({color:'yellow', state:'on', posX:11, posY:4}))
roomRemoteBot4.objectList.push(new FlipWall({color:'green', state:'on', posX:12, posY:4}))

export const startingRoom = roomButton1