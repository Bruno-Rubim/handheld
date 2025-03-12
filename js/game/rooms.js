import { debug } from "./game-manager.js";
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

// testRoom.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 0)
// testRoom.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 9)
// testRoom.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 0)
// testRoom.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 2, 15)
// testRoom.addLineToObjectList({name:'wall', layer:'player'}, 'y', 7, 9, 15)

//first room; Introduces button and flip walls
export let firstRoom = new Room({playerStartPos:{posX: 2, posY: 5}})

firstRoom.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 0)
firstRoom.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 1)
firstRoom.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 2)
firstRoom.addLineToObjectList({name:'wall', layer:'player'}, 'x', 8, 12, 3)
firstRoom.addLineToObjectList({name:'wall', layer:'player'}, 'x', 8, 12, 6)
firstRoom.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 7)
firstRoom.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 8)
firstRoom.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 9)
firstRoom.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 0)

firstRoom.objectList.push ({posX: 1, posY: 3, name: 'wall', layer:'player'})
firstRoom.objectList.push ({posX: 1, posY: 6, name: 'wall', layer:'player'})

firstRoom.addLineToObjectList(new FlipWall({color:'white', state:'on', layer:'player'}), 'y', 4, 5, 8)

firstRoom.objectList.push (new SwitchButton({posX: 5, posY: 4, color: 'white'}))

//roomButton2; A second button addition
export let room2Buttons = new Room({playerStartPos:{posX: 0, posY: 5}})
firstRoom.rightRoom = room2Buttons
room2Buttons.leftRoom = firstRoom

room2Buttons.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 8, 0)
room2Buttons.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 8, 1)

room2Buttons.objectList.push({name:'wall', layer:'player', posX:9, posY:1})
room2Buttons.addLineToObjectList(new FlipWall({color:'white', state:'off'}), 'x', 10, 12, 1)
room2Buttons.objectList.push({name:'wall', layer:'player', posX:13, posY:1})

room2Buttons.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 8, 2)
room2Buttons.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 7)
room2Buttons.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 8)
room2Buttons.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 9)

room2Buttons.objectList.push({name:'wall', layer:'player', posX:7, posY:3})
room2Buttons.addLineToObjectList(new FlipWall({color:'white', state:'on'}), 'y', 4, 5, 7)
room2Buttons.objectList.push({name:'wall', layer:'player', posX:7, posY:6})

room2Buttons.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 14)
room2Buttons.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 15)

room2Buttons.objectList.push(new SwitchButton({posX: 4,posY: 3,color: 'white'}))
room2Buttons.objectList.push(new SwitchButton({posX: 12, posY: 5, color: 'white'}))

//roomDisc1 Introduces Disc and Scanner
export let room1Disc = new Room({playerStartPos:{posX: 12, posY: 9}})

room2Buttons.upRoom = room1Disc
room1Disc.downRoom = room2Buttons

room1Disc.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 0)
room1Disc.addLineToObjectList({name:'wall', layer:'player'}, 'x', 5, 8, 1)
room1Disc.addLineToObjectList({name:'wall', layer:'player'}, 'x', 5, 8, 7)
room1Disc.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 8, 8)
room1Disc.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 8, 9)
room1Disc.addLineToObjectList(new FlipWall({color:'white', state:'on'}), 'y', 1, 7, 2)
room1Disc.addLineToObjectList({name:'wall', layer:'player'}, 'y', 8, 9, 14)
room1Disc.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 15)

room1Disc.objectList.push(new Disc({posX: 11, posY: 2, color: 'white'}))

room1Disc.objectList.push(new DiscScanner({posX: 6, posY: 4, color: 'white'}))


//roomDiscButton Uses 2 different color nets with button and disc
export let roomDiscButton = new Room({playerStartPos:{posX: 15, posY: 4}})

room1Disc.leftRoom = roomDiscButton
roomDiscButton.rightRoom = room1Disc

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

//roomDisc2 Uses 2 different color nets with 2 discs
export let room2Discs = new Room({playerStartPos:{posX: 7, posY:9}})

roomDiscButton.upRoom = room2Discs
room2Discs.downRoom = roomDiscButton

room2Discs.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 0)
room2Discs.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 1)
room2Discs.addLineToObjectList({name:'wall', layer:'player'}, 'x', 12, 15, 2)
room2Discs.addLineToObjectList({name:'wall', layer:'player'}, 'x', 12, 15, 7)
room2Discs.addLineToObjectList({name:'wall', layer:'player'}, 'x', 10, 15, 8)
room2Discs.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 4, 8)
room2Discs.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 4, 9)
room2Discs.addLineToObjectList({name:'wall', layer:'player'}, 'x', 10, 15, 9)

room2Discs.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 0)
room2Discs.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 1)
room2Discs.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 2)
room2Discs.addLineToObjectList(new FlipWall({color:'white', state:'on'}), 'y', 3, 6, 13)
room2Discs.addLineToObjectList(new FlipWall({color:'green', state:'on'}), 'y', 3, 6, 14)

room2Discs.objectList.push({name:'box', posX: 10, posY: 3, layer:'player'})
room2Discs.objectList.push({name:'box', posX: 10, posY: 6, layer:'player'})

room2Discs.objectList.push(new Disc({color: 'green', posX: 4, posY: 3}))
room2Discs.objectList.push(new Disc({color: 'white', posX: 4, posY: 6}))

room2Discs.objectList.push(new DiscScanner({color: 'green', posX: 4, posY: 6}))
room2Discs.objectList.push(new DiscScanner({color: 'white', posX: 4, posY: 3}))

//roomPushBox1 Introduces disc abilities and movable boxes
export let roomPushBox1 = new Room({playerStartPos:{posX: 0, posY:4}})

room2Discs.rightRoom = roomPushBox1
roomPushBox1.leftRoom = room2Discs

roomPushBox1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 0)
roomPushBox1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 1)
roomPushBox1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 1, 15, 2)
roomPushBox1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 4, 10, 3)
roomPushBox1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 4, 10, 7)
roomPushBox1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 10, 8)
roomPushBox1.addLineToObjectList(new FlipWall({color:'green', state:'on'}), 'x', 11, 13, 8)
roomPushBox1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 10, 9)

roomPushBox1.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 2, 0)
roomPushBox1.addLineToObjectList({name:'wall', layer:'player'}, 'y', 7, 9, 0)
roomPushBox1.addLineToObjectList({name:'box', layer:'player'}, 'y', 4, 5, 2)
roomPushBox1.addLineToObjectList(new FlipWall({color:'green', state:'off'}), 'y', 4, 6, 4)
roomPushBox1.addLineToObjectList({name:'box', layer:'player'}, 'y', 4, 6, 10)
roomPushBox1.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 14)
roomPushBox1.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 15)

roomPushBox1.objectList.push(new Disc({color: 'green', posX: 6, posY: 5}))
roomPushBox1.objectList.push(new DiscScanner({color: 'green', posX: 8, posY: 5}))

//roomPullBox; introduces ability to pull boxes and pressure plates
export let roomPullBox = new Room({playerStartPos:{posX: 12, posY:0}})

roomPushBox1.downRoom = roomPullBox
roomPullBox.upRoom = roomPushBox1

roomPullBox.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 10, 0)
roomPullBox.addLineToObjectList({name:'wall', layer:'player'}, 'x', 14, 15, 0)
roomPullBox.addLineToObjectList({name:'wall', layer:'player'}, 'x', 6, 15, 4)
roomPullBox.addLineToObjectList({name:'wall', layer:'player'}, 'x', 6, 15, 5)
roomPullBox.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 9)

roomPullBox.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 0)
roomPullBox.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 1)
roomPullBox.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 5, 15)

roomPullBox.objectList.push(new PressurePlate({color: 'white', posX: 12, posY: 2}))
roomPullBox.objectList.push(new Disc({color: 'green', posX: 7, posY: 2}))
roomPullBox.objectList.push({name: 'box', posX: 2, posY: 2, layer:'player'})

roomPullBox.addLineToObjectList(new FlipWall({color:'white', state:'on'}), 'x', 2, 5, 4)
roomPullBox.addLineToObjectList(new FlipWall({color:'white', state:'on'}), 'x', 2, 5, 5)

roomPullBox.addLineToObjectList(new FlipWall({color:'green', state:'on'}), 'y', 6, 8, 10)
roomPullBox.addLineToObjectList(new FlipWall({color:'green', state:'on'}), 'y', 6, 8, 11)

roomPullBox.objectList.push(new DiscScanner({color: 'green', posX: 7, posY: 7}))

//roomPushBox2 Uses multiple Pressure plates and boxes
export let roomPushBox2 = new Room({playerStartPos:{posX: 0, posY:7}})

roomPullBox.rightRoom = roomPushBox2
roomPushBox2.leftRoom = roomPullBox

roomPushBox2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 10, 0)
roomPushBox2.addLineToObjectList(new FlipWall({color:'white', state:'on'}), 'x', 11, 13, 0)
roomPushBox2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 14, 15, 0)
roomPushBox2.addLineToObjectList(new FlipWall({color:'green', state:'on'}), 'x', 11, 13, 1)
roomPushBox2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 3, 4)
roomPushBox2.addLineToObjectList(new FlipWall({color:'blue', state:'on'}), 'x', 4, 7, 4)
roomPushBox2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 8, 15, 4)
roomPushBox2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 9)

roomPushBox2.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 5, 0)
roomPushBox2.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 3, 1)
roomPushBox2.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 1, 10)
roomPushBox2.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 1, 14)
roomPushBox2.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 15)

roomPushBox2.objectList.push(new DiscScanner({color: 'green', posX: 3, posY: 2}))
roomPushBox2.objectList.push({name: 'box', posX: 8, posY: 2, layer:'player'})

roomPushBox2.objectList.push(new PressurePlate({color: 'blue', posX: 3, posY: 7}))
roomPushBox2.objectList.push(new PressurePlate({color: 'white', posX: 8, posY: 7}))
roomPushBox2.objectList.push(new Disc({color: 'green', posX: 10, posY: 7}))
roomPushBox2.objectList.push({name: 'box', posX: 12, posY: 7, layer:'player'})

//roomRemoteButton; Introduces remoteBot
export let roomRemoteButton = new Room({playerStartPos:{posX: 12, posY:9}})

roomPushBox2.upRoom = roomRemoteButton
roomRemoteButton.downRoom = roomPushBox2

roomRemoteButton.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 0)
roomRemoteButton.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 10, 1)
roomRemoteButton.addLineToObjectList(new FlipWall({color:'white', state:'on'}), 'x', 10, 14, 4)
roomRemoteButton.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 10, 9)
roomRemoteButton.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 9, 8)
roomRemoteButton.addLineToObjectList({name:'wall', layer:'player'}, 'x', 14, 15, 9)

roomRemoteButton.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 0)
roomRemoteButton.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 1)
roomRemoteButton.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 8)
roomRemoteButton.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 9)
roomRemoteButton.addLineToObjectList(new FlipWall({color:'yellow', state:'on'}), 'y', 1, 3, 15)
roomRemoteButton.addLineToObjectList({name:'wall', layer:'player'}, 'y', 4, 9, 15)

roomRemoteButton.objectList.push(({name:'wall', posX: 7, posY: 2, layer:'player'}))
roomRemoteButton.objectList.push(({name:'wall', posX: 2, posY: 2, layer:'player'}))
roomRemoteButton.objectList.push(({name:'wall', posX: 7, posY: 7, layer:'player'}))
roomRemoteButton.objectList.push(({name:'wall', posX: 2, posY: 7, layer:'player'}))

roomRemoteButton.objectList.push(new SwitchButton({posX: 3, posY: 4, color:'white'}))
roomRemoteButton.objectList.push(new RemoteBot({posX: 6, posY: 6}))
roomRemoteButton.objectList.push(new Disc({color: 'yellow', posX: 13, posY: 7}))
roomRemoteButton.objectList.push(new DiscScanner({color: 'yellow', posX: 11, posY: 7, state:'off'}))

//Needs simple room to introduce remoteBot picking up and ejecting discs
export let roomRemoteDisc = new Room({playerStartPos:{posX: 0, posY:2}})

roomRemoteButton.rightRoom = roomRemoteDisc
roomRemoteDisc.leftRoom = roomRemoteButton

roomRemoteDisc.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 0)
roomRemoteDisc.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 5)
roomRemoteDisc.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 9)

roomRemoteDisc.addLineToObjectList({name:'wall', layer:'player'}, 'y', 4, 9, 0)
roomRemoteDisc.addLineToObjectList({name:'wall', layer:'player'}, 'y', 4, 9, 15)

roomRemoteDisc.objectList.push(new SwitchButton({color:'blue', posX:3, posY:4}))
roomRemoteDisc.addLineToObjectList({name:'wall', layer:'player'}, 'y', 3, 5, 5)
roomRemoteDisc.objectList.push(new Disc({color:'yellow', posX:7, posY:4}))
roomRemoteDisc.objectList.push(new DiscScanner({color:'yellow', posX:7, posY:4, state:'on'}))

roomRemoteDisc.addLineToObjectList({name:'wall', layer:'player'}, 'x', 10, 11, 1)
roomRemoteDisc.addLineToObjectList(new FlipWall({color:'yellow', state:'off'}), 'y', 2, 3, 10)
roomRemoteDisc.addLineToObjectList(new FlipWall({color:'white', state:'on'}), 'y', 2, 3, 11)
roomRemoteDisc.addLineToObjectList({name:'wall', layer:'player'}, 'x', 10, 11, 4)

roomRemoteDisc.objectList.push(new RemoteBot({posX:2, posY:7}))
roomRemoteDisc.addLineToObjectList(new FlipWall({color:'blue', state:'off'}), 'y', 6, 8, 4)
roomRemoteDisc.objectList.push(new Disc({color:'white', posX:6, posY:7}))
roomRemoteDisc.addLineToObjectList(new FlipWall({color:'blue', state:'on'}), 'y', 6, 8, 8)
roomRemoteDisc.addLineToObjectList(new FlipWall({color:'blue', state:'off'}), 'y', 6, 8, 11)
roomRemoteDisc.objectList.push(new DiscScanner({color:'white', posX:13, posY:7, state:'off'}))

// roomRemoteWallShift; Uses wall to shift remoteBot's position
export let roomRemoteWallShift = new Room({playerStartPos:{posX: 0, posY:2}})

roomRemoteDisc.rightRoom = roomRemoteWallShift
roomRemoteWallShift.leftRoom = roomRemoteDisc

roomRemoteWallShift.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 0)
roomRemoteWallShift.addLineToObjectList({name:'wall', layer:'player'}, 'x', 5, 15, 9)
roomRemoteWallShift.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 1, 9)

roomRemoteWallShift.addLineToObjectList({name:'wall', layer:'player'}, 'y', 4, 9, 0)
roomRemoteWallShift.addLineToObjectList({name:'wall', layer:'player'}, 'y', 7, 9, 1)
roomRemoteWallShift.addLineToObjectList({name:'wall', layer:'player'}, 'y', 7, 9, 4)
roomRemoteWallShift.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 15)

roomRemoteWallShift.addLineToObjectList(new FlipWall({color:'yellow', state:'on'}), 'x', 2, 3, 8)
roomRemoteWallShift.addLineToObjectList(new FlipWall({color:'green', state:'on'}), 'x', 2, 3, 7)

roomRemoteWallShift.objectList.push(new DiscScanner({posX:7, posY: 7, color:'yellow', state:'off'}))
roomRemoteWallShift.objectList.push(new SwitchButton({posX:9, posY: 4, color:'white'}))
roomRemoteWallShift.objectList.push(new RemoteBot({posX:9, posY: 2}))
roomRemoteWallShift.objectList.push(new Disc({posX:5, posY: 2, color:'yellow'}))

roomRemoteWallShift.addLineToObjectList(new FlipWall({color:'white', state:'on'}), 'y', 7, 8, 11)
roomRemoteWallShift.addLineToObjectList({name:'wall', layer:'player'}, 'y', 1, 6, 11)
roomRemoteWallShift.addLineToObjectList(new FlipWall({color:'white', state:'off'}), 'x', 12, 14, 5)
roomRemoteWallShift.addLineToObjectList(new FlipWall({color:'white', state:'on'}), 'x', 12, 14, 3)
roomRemoteWallShift.objectList.push(new PressurePlate({posX:13, posY: 1, color:'green'}))

//roomRemotePushBox; Introduces RemoteBot using disc ability
export let roomRemotePushBox = new Room({playerStartPos:{posX: 3, posY:0}})

roomRemoteWallShift.downRoom = roomRemotePushBox
roomRemotePushBox.upRoom = roomRemoteWallShift

roomRemotePushBox.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 1, 0)
roomRemotePushBox.addLineToObjectList({name:'wall', layer:'player'}, 'x', 4, 15, 0)
roomRemotePushBox.addLineToObjectList({name:'wall', layer:'player'}, 'x', 11, 12, 1)
roomRemotePushBox.addLineToObjectList({name:'wall', layer:'player'}, 'x', 11, 13, 3)
roomRemotePushBox.addLineToObjectList({name:'wall', layer:'player'}, 'x', 11, 15, 4)
roomRemotePushBox.addLineToObjectList({name:'wall', layer:'player'}, 'x', 12, 15, 5)
roomRemotePushBox.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 9)

roomRemotePushBox.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 0)
roomRemotePushBox.addLineToObjectList({name:'wall', layer:'player'}, 'y', 5, 8, 1)
roomRemotePushBox.addLineToObjectList({name:'wall', layer:'player'}, 'y', 5, 8, 6)
roomRemotePushBox.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 3, 15)
roomRemotePushBox.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 3, 14)

roomRemotePushBox.objectList.push(new FlipWall({color:'yellow', posX:11, posY: 2, state:'off'}))
roomRemotePushBox.objectList.push(new DiscScanner({posX:13, posY: 2, color:'yellow', state:'on'}))
roomRemotePushBox.objectList.push(new Disc({posX:13, posY: 2, color:'yellow'}))

roomRemotePushBox.objectList.push(new RemoteBot({posX:8, posY: 7}))

roomRemotePushBox.addLineToObjectList(new FlipWall({color:'white', state:'off'}), 'x', 2, 5, 5)
roomRemotePushBox.objectList.push(new Disc({posX:3, posY: 4, color:'green'}))
roomRemotePushBox.objectList.push(new DiscScanner({posX:2, posY: 7, color:'green'}))
roomRemotePushBox.objectList.push(new PressurePlate({posX:5, posY: 7, color:'white'}))
roomRemotePushBox.objectList.push({name:'box', posX:4, posY: 7, layer:'player'})

roomRemotePushBox.addLineToObjectList(new FlipWall({color:'white', state:'on'}), 'y', 6, 8, 13)
roomRemotePushBox.addLineToObjectList(new FlipWall({color:'green', state:'on'}), 'y', 6, 8, 14)

//roomRemoteBot3; Use of box to shift robot position
export let roomRemoteBot3 = new Room({playerStartPos:{posX: 0, posY:7}})

roomRemotePushBox.rightRoom = roomRemoteBot3
roomRemoteBot3.leftRoom = roomRemotePushBox

roomRemoteBot3.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 0)
roomRemoteBot3.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 4)
roomRemoteBot3.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 9)

roomRemoteBot3.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 5, 0)
roomRemoteBot3.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 3, 1)
roomRemoteBot3.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 3, 12)
roomRemoteBot3.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 3, 13)
roomRemoteBot3.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 3, 14)
roomRemoteBot3.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 5, 15)

roomRemoteBot3.objectList.push(new RemoteBot({posX: 3, posY: 2}))
roomRemoteBot3.addLineToObjectList(new FlipWall({color:'green', state:'on'}), 'y', 1, 3, 5)
roomRemoteBot3.objectList.push(new PressurePlate({color:'blue', posX: 11, posY: 2}))

roomRemoteBot3.objectList.push(new DiscScanner({posX:3, posY: 7, color:'yellow', state:'on'}))
roomRemoteBot3.objectList.push(new Disc({posX:3, posY: 7, color:'yellow'}))

roomRemoteBot3.objectList.push(new PressurePlate({color:'white', posX: 9, posY: 8}))
roomRemoteBot3.objectList.push(new DiscScanner({color:'green', posX: 9, posY: 5}))

roomRemoteBot3.objectList.push({name:'box', posX: 7, posY: 7, layer:'player'})
roomRemoteBot3.objectList.push(new Disc({posX:7, posY: 6, color:'green'}))

roomRemoteBot3.addLineToObjectList(new FlipWall({color:'white', state:'on'}), 'y', 5, 8, 12)
roomRemoteBot3.addLineToObjectList(new FlipWall({color:'green', state:'on'}), 'y', 5, 8, 13)
roomRemoteBot3.addLineToObjectList(new FlipWall({color:'blue', state:'on'}), 'y', 5, 8, 14)
roomRemoteBot3.addLineToObjectList(new FlipWall({color:'yellow', state:'off'}), 'y', 6, 8, 15)

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

export let startingRoom = firstRoom