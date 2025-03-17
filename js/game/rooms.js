import { DiscScanner, DiscTrap, FlipWall, Disc, RemoteBot, Lever, PressurePlate, TeleportPad, Box, Conveyor } from "./game-objects.js";
import { player } from "./player.js";

class Room {
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
    addLineToObjectList(buildFn, orientation, posStart, posEnd, fixedAxis){
        for(let i = posStart; i <= posEnd; i++){
            const obj = buildFn();
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
    findObjectByPosition(posX, posY, tags){
        for(let i = 0; i < this.objectList.length; i++){
            if (this.objectList[i].posX == posX &&
                this.objectList[i].posY == posY) {
                let hasTag = false
                for (let j = 0; j < tags.length; j++){
                    if (this.objectList[i].tags.includes(tags[j])){
                        hasTag = true
                        break
                    }
                }
                if (hasTag){
                    let object = this.objectList[i]
                    return object
                }
            }
        }
        return null
    }
    takeObjectByPosition(posX, posY, tags){
        for(let i = 0; i < this.objectList.length; i++){
            if (this.objectList[i].posX == posX &&
                this.objectList[i].posY == posY) {
                let hasTag = false
                for (let j = 0; j < tags.length; j++){
                    if (this.objectList[i].tags.includes(tags[j])){
                        hasTag = true
                        break
                    }
                }
                if (hasTag){
                    let object = this.objectList[i]
                    this.objectList.splice(i, 1);
                    return object
                }
            }
        }
        return null
    }
}

//test room
let testRoom = new Room({playerStartPos:{posX: 2, posY: 3}})
testRoom.rightRoom = null

testRoom.objectList.push(new Disc({color:'red', posX: 1, posY: 1,}))
testRoom.objectList.push(new Disc({color:'purple', posX: 2, posY: 1,}))
testRoom.objectList.push(new Disc({color:'green', posX: 3, posY: 1}))
testRoom.objectList.push(new Disc({color:'yellow', posX: 4, posY: 1}))
testRoom.objectList.push(new Disc({color:'white', posX: 5, posY: 1}))

testRoom.objectList.push(new Box({posX: 9, posY: 6}))

testRoom.objectList.push(new DiscTrap({posX: 11, posY: 6}))

testRoom.objectList.push(new PressurePlate({color: 'green', posX: 3, posY: 6,}))
testRoom.objectList.push(new DiscScanner({color: 'red', posX: 2, posY: 6,}))
testRoom.objectList.push(new Lever({color: 'white', posX: 9, posY: 2,}))
testRoom.objectList.push(new PressurePlate({color: 'white', posX: 4, posY: 4,}))
testRoom.objectList.push(new DiscScanner({color: 'white', posX: 4, posY: 6,}))
testRoom.objectList.push(new Lever({posX: 5, posY: 6,color: 'blue'}))
testRoom.objectList.push(new TeleportPad({posX: 6, posY: 6, color: 'white'}))
testRoom.objectList.push(new RemoteBot({posX: 7, posY: 6, disc:null}))

testRoom.objectList.push(new Conveyor({posX: 6, posY: 3, dir:'right'}))
testRoom.objectList.push(new Conveyor({posX: 7, posY: 3, dir:'down'}))
testRoom.objectList.push(new Conveyor({posX: 7, posY: 4, dir:'left'}))
testRoom.objectList.push(new Conveyor({posX: 6, posY: 4, dir:'up'}))


testRoom.addLineToObjectList(()=>new FlipWall({color:'white', state:'on'}), 'y', 2, 7, 12)
// testRoom.addLineToObjectList(()=>new FlipWall({color:'red', state:'on', layer:'player'}), 'y', 2, 7, 13)
// testRoom.addLineToObjectList(()=>new FlipWall({color:'blue', state:'on', layer:'player'}), 'y', 2, 7, 14)
// testRoom.addLineToObjectList(()=>new FlipWall({color:'green', state:'on', layer:'player'}), 'y', 2, 7, 15)

testRoom.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 0)
testRoom.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 9)
testRoom.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 0)
testRoom.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 2, 15)
testRoom.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 7, 9, 15)

//first room; Introduces lever and flip walls
export let firstRoom = new Room({playerStartPos:{posX: 2, posY: 5}})

firstRoom.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 0)
firstRoom.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 1)
firstRoom.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 2)
firstRoom.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 8, 12, 3)
firstRoom.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 8, 12, 6)
firstRoom.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 7)
firstRoom.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 8)
firstRoom.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 9)
firstRoom.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 0)

firstRoom.objectList.push ({posX: 1, posY: 3, sprite: 'wall', tags:['block']})
firstRoom.objectList.push ({posX: 1, posY: 6, sprite: 'wall', tags:['block']})

firstRoom.addLineToObjectList(()=>new FlipWall({color:'white', state:'on', layer:'player'}), 'y', 4, 5, 8)

firstRoom.objectList.push (new Lever({posX: 5, posY: 4, color: 'white'}))

//roomLever2; A second lever addition
let room2Levers = new Room({playerStartPos:{posX: 0, posY: 5}})
firstRoom.rightRoom = room2Levers
room2Levers.leftRoom = firstRoom

room2Levers.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 8, 0)
room2Levers.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 8, 1)

room2Levers.objectList.push({sprite:'wall', renderLayer:'wall', tags:['block'], posX:9, posY:1})
room2Levers.addLineToObjectList(()=>new FlipWall({color:'white', state:'off'}), 'x', 10, 12, 1)
room2Levers.objectList.push({sprite:'wall', renderLayer:'wall', tags:['block'], posX:13, posY:1})

room2Levers.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 8, 2)
room2Levers.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 7)
room2Levers.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 8)
room2Levers.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 9)

room2Levers.objectList.push({sprite:'wall', renderLayer:'wall', tags:['block'], posX:7, posY:3})
room2Levers.addLineToObjectList(()=>new FlipWall({color:'white', state:'on'}), 'y', 4, 5, 7)
room2Levers.objectList.push({sprite:'wall', renderLayer:'wall', tags:['block'], posX:7, posY:6})

room2Levers.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 14)
room2Levers.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 15)

room2Levers.objectList.push(new Lever({posX: 4,posY: 3,color: 'white'}))
room2Levers.objectList.push(new Lever({posX: 12, posY: 5, color: 'white'}))

//roomDisc1 Introduces Disc and Scanner
let room1Disc = new Room({playerStartPos:{posX: 12, posY: 9}})

room2Levers.upRoom = room1Disc
room1Disc.downRoom = room2Levers

room1Disc.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 0)
room1Disc.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 5, 8, 1)
room1Disc.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 5, 8, 7)
room1Disc.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 8, 8)
room1Disc.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 8, 9)
room1Disc.addLineToObjectList(()=>new FlipWall({color:'white', state:'on'}), 'y', 1, 7, 2)
room1Disc.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 8, 9, 14)
room1Disc.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 15)

room1Disc.objectList.push(new Disc({posX: 11, posY: 2, color: 'white'}))

room1Disc.objectList.push(new DiscScanner({posX: 6, posY: 4, color: 'white'}))


//roomDiscLever Uses 2 different color nets with lever and disc
let roomDiscLever = new Room({playerStartPos:{posX: 15, posY: 4}})

room1Disc.leftRoom = roomDiscLever
roomDiscLever.rightRoom = room1Disc

roomDiscLever.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 4, 0)
roomDiscLever.addLineToObjectList(()=>new FlipWall({color:'white', state:'on'}), 'x', 5, 9, 0)
roomDiscLever.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 10, 15, 0)
roomDiscLever.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 4, 1)
roomDiscLever.addLineToObjectList(()=>new FlipWall({color:'blue', state:'off'}), 'x', 5, 9, 1)
roomDiscLever.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 10, 15, 1)
roomDiscLever.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 4, 7)
roomDiscLever.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 8)
roomDiscLever.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 9)

roomDiscLever.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 0)
roomDiscLever.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 2, 1)
roomDiscLever.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 6, 9, 1)
roomDiscLever.addLineToObjectList(()=>new FlipWall({color:'blue', state:'on'}), 'y', 2, 6, 4)

roomDiscLever.objectList.push(new Lever({posX: 8, posY: 5, color: 'blue'}))

roomDiscLever.objectList.push(new Disc({posX: 14, posY: 7, color: 'white'}))

roomDiscLever.objectList.push(new DiscScanner({posX: 2, posY: 4, color: 'white'}))

//roomDisc2 Uses 2 different color nets with 2 discs
let room2Discs = new Room({playerStartPos:{posX: 7, posY:9}})

roomDiscLever.upRoom = room2Discs
room2Discs.downRoom = roomDiscLever

room2Discs.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 0)
room2Discs.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 1)
room2Discs.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 12, 15, 2)
room2Discs.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 12, 15, 7)
room2Discs.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 10, 15, 8)
room2Discs.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 4, 8)
room2Discs.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 4, 9)
room2Discs.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 10, 15, 9)

room2Discs.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 0)
room2Discs.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 1)
room2Discs.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 2)
room2Discs.addLineToObjectList(()=>new FlipWall({color:'white', state:'on'}), 'y', 3, 6, 13)
room2Discs.addLineToObjectList(()=>new FlipWall({color:'green', state:'on'}), 'y', 3, 6, 14)

room2Discs.objectList.push(new Box({posX: 10, posY: 3}))
room2Discs.objectList.push(new Box({posX: 10, posY: 6}))

room2Discs.objectList.push(new Disc({color: 'green', posX: 4, posY: 3}))
room2Discs.objectList.push(new Disc({color: 'white', posX: 4, posY: 6}))

room2Discs.objectList.push(new DiscScanner({color: 'green', posX: 4, posY: 6}))
room2Discs.objectList.push(new DiscScanner({color: 'white', posX: 4, posY: 3}))

//roomPushBox1 Introduces disc abilities and movable boxes
let roomPushBox1 = new Room({playerStartPos:{posX: 0, posY:4}})

room2Discs.rightRoom = roomPushBox1
roomPushBox1.leftRoom = room2Discs

roomPushBox1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 0)
roomPushBox1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 1)
roomPushBox1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 1, 15, 2)
roomPushBox1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 4, 10, 3)
roomPushBox1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 4, 10, 7)
roomPushBox1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 10, 8)
roomPushBox1.addLineToObjectList(()=>new FlipWall({color:'green', state:'on'}), 'x', 11, 13, 8)
roomPushBox1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 10, 9)

roomPushBox1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 2, 0)
roomPushBox1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 7, 9, 0)
roomPushBox1.addLineToObjectList(()=>new FlipWall({color:'green', state:'off'}), 'y', 4, 6, 4)
roomPushBox1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 14)
roomPushBox1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 15)

roomPushBox1.objectList.push(new Disc({color: 'green', posX: 6, posY: 5}))
roomPushBox1.objectList.push(new DiscScanner({color: 'green', posX: 8, posY: 5}))
roomPushBox1.objectList.push(new Box({posX: 2, posY: 4}))
roomPushBox1.objectList.push(new Box({posX: 2, posY: 5}))
roomPushBox1.objectList.push(new Box({posX: 10, posY: 4}))
roomPushBox1.objectList.push(new Box({posX: 10, posY: 5}))
roomPushBox1.objectList.push(new Box({posX: 10, posY: 6}))

//roomPullBox; introduces ability to pull boxes and pressure plates
let roomPullBox = new Room({playerStartPos:{posX: 12, posY:0}})

roomPushBox1.downRoom = roomPullBox
roomPullBox.upRoom = roomPushBox1

roomPullBox.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 10, 0)
roomPullBox.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 14, 15, 0)
roomPullBox.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 6, 15, 4)
roomPullBox.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 6, 15, 5)
roomPullBox.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 9)

roomPullBox.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 0)
roomPullBox.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 1)
roomPullBox.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 5, 15)

roomPullBox.objectList.push(new PressurePlate({color: 'white', posX: 12, posY: 2}))
roomPullBox.objectList.push(new Disc({color: 'green', posX: 7, posY: 2}))
roomPullBox.objectList.push(new Box({posX: 2, posY: 2}))

roomPullBox.addLineToObjectList(()=>new FlipWall({color:'white', state:'on'}), 'x', 2, 5, 4)
roomPullBox.addLineToObjectList(()=>new FlipWall({color:'white', state:'on'}), 'x', 2, 5, 5)

roomPullBox.addLineToObjectList(()=>new FlipWall({color:'green', state:'on'}), 'y', 6, 8, 10)
roomPullBox.addLineToObjectList(()=>new FlipWall({color:'green', state:'on'}), 'y', 6, 8, 11)

roomPullBox.objectList.push(new DiscScanner({color: 'green', posX: 7, posY: 7}))

//roomConveyor; introduces conveyor blocks
let roomConveyor = new Room({playerStartPos:{posX: 0, posY:7}})

roomPullBox.rightRoom = roomConveyor
roomConveyor.leftRoom = roomPullBox

roomConveyor.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 1, 0)
roomConveyor.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 5, 15, 0)
roomConveyor.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 5, 11, 1)
roomConveyor.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 5, 11, 3)
roomConveyor.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 12, 4)
roomConveyor.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 12, 5)
roomConveyor.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 4, 10, 6)
roomConveyor.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 4, 10, 8)
roomConveyor.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 9)

roomConveyor.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 5, 0)
roomConveyor.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 5, 1)
roomConveyor.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 4, 5, 14)
roomConveyor.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 15)

roomConveyor.objectList.push(new Lever({posX: 2, posY: 3, color:'white'}))
roomConveyor.addLineToObjectList(()=>(new Conveyor({dir:'right'})), 'x', 5, 11, 2)
roomConveyor.objectList.push(new Lever({posX: 14, posY: 1, color:'white'}))

roomConveyor.addLineToObjectList(()=>(new Conveyor({dir:'up'})), 'y', 4, 5, 13)
roomConveyor.objectList.push(new Lever({posX: 14, posY: 8, color:'white'}))

roomConveyor.addLineToObjectList(()=>(new Conveyor({dir:'left'})), 'x', 4, 10, 7)
roomConveyor.objectList.push(new Lever({posX: 3, posY: 8, color:'white'}))

//roomConveyor; introduces conveyor blocks
let roomConveyor2 = new Room({playerStartPos:{posX: 3, posY:9}})

roomConveyor.upRoom = roomConveyor2
roomConveyor2.downRoom = roomConveyor

roomConveyor2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 0)
roomConveyor2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 2)
roomConveyor2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 1, 9)
roomConveyor2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 5, 15, 9)

roomConveyor2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 0)
roomConveyor2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 5, 15)

roomConveyor2.addLineToObjectList(()=>(new Conveyor({color:'white', dir:'left'})), 'x', 1, 14, 1)
roomConveyor2.objectList.push(new Disc({color: 'green', posX:7, posY:1}))
roomConveyor2.objectList.push(new DiscScanner({color: 'green', posX:1, posY:1}))

roomConveyor2.objectList.push(new PressurePlate({color: 'white', posX:7, posY:4}))

roomConveyor2.addLineToObjectList(()=>(new FlipWall({color:'green', state:'off'})), 'y', 6, 8, 15)

//roomLeverPLate
let roomLeverPLate = new Room({playerStartPos:{posX: 0, posY:7}})

roomPullBox.rightRoom = roomLeverPLate
roomLeverPLate.leftRoom = roomPullBox

roomLeverPLate.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 0)
roomLeverPLate.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 4, 9, 4)
roomLeverPLate.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 4, 9, 5)
roomLeverPLate.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 9)

roomLeverPLate.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 5, 0)
roomLeverPLate.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 1, 3, 9)
roomLeverPLate.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 5, 13)
roomLeverPLate.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 5, 14)
roomLeverPLate.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 5, 15)

roomLeverPLate.addLineToObjectList(()=>(new Conveyor({color:'white', dir: 'left'})), 'y', 1, 3, 4)
roomLeverPLate.addLineToObjectList(()=>(new Conveyor({color:'white', dir: 'left'})), 'y', 1, 3, 5)
roomLeverPLate.objectList.push(new Lever({color: 'white', posX:7, posY:2}))

roomLeverPLate.objectList.push(new Disc({color: 'green', posX:4, posY:7}))
roomLeverPLate.objectList.push(new PressurePlate({color: 'white', posX:6, posY:7}))
roomLeverPLate.objectList.push(new Box({posX:6, posY:7}))
roomLeverPLate.addLineToObjectList(()=>new FlipWall({color:'white', state:'on'}), 'y', 6, 8, 9)
roomLeverPLate.objectList.push(new PressurePlate({color: 'white', posX:11, posY:7}))

roomLeverPLate.objectList.push(new DiscScanner({color: 'green', posX:11, posY:2}))
roomLeverPLate.addLineToObjectList(()=>new FlipWall({color:'green', state:'on'}), 'y', 6, 8, 13)
roomLeverPLate.addLineToObjectList(()=>new FlipWall({color:'white', state:'off'}), 'y', 6, 8, 14)


//roomPushBox2 Uses multiple Pressure plates and boxes
let roomPushBox2 = new Room({playerStartPos:{posX: 0, posY:7}})

roomLeverPLate.rightRoom = roomPushBox2
roomPushBox2.leftRoom = roomLeverPLate

roomPushBox2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 1, 0)
roomPushBox2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 5, 15, 0)
roomPushBox2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 12, 15, 4)
roomPushBox2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 7, 4)
roomPushBox2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 9)

roomPushBox2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 5, 0)
roomPushBox2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 3, 1)
roomPushBox2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 1, 5)
roomPushBox2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 15)

roomPushBox2.addLineToObjectList(()=>new FlipWall({color:'green', state:'off'}), 'x', 2, 4, 0)
roomPushBox2.addLineToObjectList(()=>new FlipWall({color:'white', state:'on'}), 'x', 2, 4, 1)

roomPushBox2.objectList.push(new DiscScanner({color: 'green', posX: 12, posY: 2}))
roomPushBox2.objectList.push(new Box({posX: 7, posY: 2}))

roomPushBox2.addLineToObjectList(()=>new FlipWall({color:'green', state:'on'}), 'x', 8, 11, 4)

roomPushBox2.objectList.push(new Disc({color: 'green', posX: 2, posY: 7}))
roomPushBox2.objectList.push(new Box({posX: 4, posY: 7}))
roomPushBox2.objectList.push(new PressurePlate({color: 'white', posX: 7, posY: 7}))
roomPushBox2.objectList.push(new PressurePlate({color: 'green', posX: 12, posY: 7}))

//roomRemoteLever; Introduces remoteBot
let roomPushBox3 = new Room({playerStartPos:{posX: 3, posY:9}})

roomPushBox2.upRoom = roomPushBox3
roomPushBox3.downRoom = roomPushBox2

roomPushBox3.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 10, 0)
roomPushBox3.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 14, 15, 0)
roomPushBox3.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 1, 9)
roomPushBox3.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 5, 15, 9)

roomPushBox3.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 0)
roomPushBox3.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 15)

//roomRemoteLever; Introduces remoteBot
let roomRemoteLever = new Room({playerStartPos:{posX: 12, posY:9}})

roomPushBox3.upRoom = roomRemoteLever
roomRemoteLever.downRoom = roomPushBox3

roomRemoteLever.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 0)
roomRemoteLever.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 10, 1)
roomRemoteLever.addLineToObjectList(()=>new FlipWall({color:'white', state:'on'}), 'x', 10, 14, 4)
roomRemoteLever.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 10, 9)
roomRemoteLever.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 9, 8)
roomRemoteLever.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 14, 15, 9)

roomRemoteLever.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 0)
roomRemoteLever.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 1)
roomRemoteLever.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 8)
roomRemoteLever.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 9)
roomRemoteLever.addLineToObjectList(()=>new FlipWall({color:'yellow', state:'on'}), 'y', 1, 3, 15)
roomRemoteLever.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 4, 9, 15)

roomRemoteLever.objectList.push(({sprite:'wall', posX: 7, posY: 2, tags:['block']}))
roomRemoteLever.objectList.push(({sprite:'wall', posX: 2, posY: 2, tags:['block']}))
roomRemoteLever.objectList.push(({sprite:'wall', posX: 7, posY: 7, tags:['block']}))
roomRemoteLever.objectList.push(({sprite:'wall', posX: 2, posY: 7, tags:['block']}))

roomRemoteLever.objectList.push(new Lever({posX: 3, posY: 4, color:'white'}))
roomRemoteLever.objectList.push(new RemoteBot({posX: 6, posY: 6}))
roomRemoteLever.objectList.push(new Disc({color: 'yellow', posX: 13, posY: 7}))
roomRemoteLever.objectList.push(new DiscScanner({color: 'yellow', posX: 11, posY: 7, state:'off'}))

//Needs simple room to introduce remoteBot picking up and ejecting discs
let roomRemoteDisc = new Room({playerStartPos:{posX: 0, posY:2}})

roomRemoteLever.rightRoom = roomRemoteDisc
roomRemoteDisc.leftRoom = roomRemoteLever

roomRemoteDisc.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 0)
roomRemoteDisc.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 5)
roomRemoteDisc.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 9)

roomRemoteDisc.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 4, 9, 0)
roomRemoteDisc.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 4, 9, 15)

roomRemoteDisc.objectList.push(new Lever({color:'blue', posX:3, posY:4}))
roomRemoteDisc.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 3, 5, 5)
roomRemoteDisc.objectList.push(new Disc({color:'yellow', posX:7, posY:4}))
roomRemoteDisc.objectList.push(new DiscScanner({color:'yellow', posX:7, posY:4, state:'on'}))

roomRemoteDisc.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 10, 11, 1)
roomRemoteDisc.addLineToObjectList(()=>new FlipWall({color:'yellow', state:'off'}), 'y', 2, 3, 10)
roomRemoteDisc.addLineToObjectList(()=>new FlipWall({color:'white', state:'on'}), 'y', 2, 3, 11)
roomRemoteDisc.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 10, 11, 4)

roomRemoteDisc.objectList.push(new Disc({color:'white', posX:2, posY:7}))
roomRemoteDisc.addLineToObjectList(()=>new FlipWall({color:'blue', state:'off'}), 'y', 6, 8, 4)
roomRemoteDisc.objectList.push(new RemoteBot({posX:6, posY:7}))
roomRemoteDisc.addLineToObjectList(()=>new FlipWall({color:'blue', state:'on'}), 'y', 6, 8, 8)
roomRemoteDisc.addLineToObjectList(()=>new FlipWall({color:'blue', state:'off'}), 'y', 6, 8, 11)
roomRemoteDisc.objectList.push(new DiscScanner({color:'white', posX:13, posY:7, state:'off'}))

// roomRemoteWallShift; Uses wall to shift remoteBot's position
let roomRemoteWallShift = new Room({playerStartPos:{posX: 0, posY:2}})

roomRemoteDisc.rightRoom = roomRemoteWallShift
roomRemoteWallShift.leftRoom = roomRemoteDisc

roomRemoteWallShift.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 0)
roomRemoteWallShift.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 5, 15, 9)
roomRemoteWallShift.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 1, 9)

roomRemoteWallShift.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 4, 9, 0)
roomRemoteWallShift.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 7, 9, 1)
roomRemoteWallShift.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 7, 9, 4)
roomRemoteWallShift.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 15)

roomRemoteWallShift.addLineToObjectList(()=>new FlipWall({color:'yellow', state:'on'}), 'x', 2, 3, 8)
roomRemoteWallShift.addLineToObjectList(()=>new FlipWall({color:'green', state:'on'}), 'x', 2, 3, 7)

roomRemoteWallShift.objectList.push(new DiscScanner({posX:9, posY: 7, color:'yellow', state:'off'}))
roomRemoteWallShift.objectList.push(new Lever({posX:9, posY: 4, color:'white'}))
roomRemoteWallShift.objectList.push(new RemoteBot({posX:9, posY: 2}))
roomRemoteWallShift.objectList.push(new Disc({posX:5, posY: 2, color:'yellow'}))

roomRemoteWallShift.addLineToObjectList(()=>new FlipWall({color:'white', state:'on'}), 'y', 7, 8, 11)
roomRemoteWallShift.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 1, 6, 11)
roomRemoteWallShift.addLineToObjectList(()=>new FlipWall({color:'white', state:'off'}), 'x', 12, 14, 5)
roomRemoteWallShift.addLineToObjectList(()=>new FlipWall({color:'white', state:'on'}), 'x', 12, 14, 3)
roomRemoteWallShift.objectList.push(new PressurePlate({posX:13, posY: 1, color:'green'}))

//roomRemotePushBox; Introduces RemoteBot using disc ability
let roomRemotePushBox = new Room({playerStartPos:{posX: 3, posY:0}})

roomRemoteWallShift.downRoom = roomRemotePushBox
roomRemotePushBox.upRoom = roomRemoteWallShift

roomRemotePushBox.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 1, 0)
roomRemotePushBox.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 4, 15, 0)
roomRemotePushBox.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 11, 12, 1)
roomRemotePushBox.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 11, 13, 3)
roomRemotePushBox.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 11, 15, 4)
roomRemotePushBox.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 12, 15, 5)
roomRemotePushBox.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 9)

roomRemotePushBox.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 0)
roomRemotePushBox.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 5, 8, 1)
roomRemotePushBox.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 5, 8, 6)
roomRemotePushBox.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 3, 15)
roomRemotePushBox.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 3, 14)

roomRemotePushBox.objectList.push(new FlipWall({color:'yellow', posX:11, posY: 2, state:'off'}))
roomRemotePushBox.objectList.push(new DiscScanner({posX:13, posY: 2, color:'yellow', state:'on'}))
roomRemotePushBox.objectList.push(new Disc({posX:13, posY: 2, color:'yellow'}))

roomRemotePushBox.objectList.push(new RemoteBot({posX:8, posY: 7}))

roomRemotePushBox.objectList.push(new Disc({posX:3, posY: 3, color:'green'}))
roomRemotePushBox.addLineToObjectList(()=>new FlipWall({color:'white', state:'off'}), 'x', 2, 5, 5)
roomRemotePushBox.objectList.push(new DiscScanner({posX:2, posY: 8, color:'green'}))
roomRemotePushBox.objectList.push(new PressurePlate({posX:5, posY: 8, color:'white'}))
roomRemotePushBox.objectList.push(new Box({posX:4, posY: 8}))

roomRemotePushBox.addLineToObjectList(()=>new FlipWall({color:'white', state:'on'}), 'y', 6, 8, 13)
roomRemotePushBox.addLineToObjectList(()=>new FlipWall({color:'green', state:'on'}), 'y', 6, 8, 14)

//roomRemoteBot3; Use of box to shift robot position
let roomRemoteBot3 = new Room({playerStartPos:{posX: 0, posY:7}})

roomRemotePushBox.rightRoom = roomRemoteBot3
roomRemoteBot3.leftRoom = roomRemotePushBox

roomRemoteBot3.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 0)
roomRemoteBot3.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 4)
roomRemoteBot3.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 9)

roomRemoteBot3.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 5, 0)
roomRemoteBot3.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 3, 1)
roomRemoteBot3.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 3, 12)
roomRemoteBot3.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 3, 13)
roomRemoteBot3.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 3, 14)
roomRemoteBot3.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 5, 15)

roomRemoteBot3.objectList.push(new RemoteBot({posX: 3, posY: 2}))
roomRemoteBot3.addLineToObjectList(()=>new FlipWall({color:'white', state:'on'}), 'y', 1, 3, 5)
roomRemoteBot3.objectList.push(new PressurePlate({color:'blue', posX: 11, posY: 2}))

roomRemoteBot3.objectList.push(new DiscScanner({posX:3, posY: 7, color:'yellow', state:'on'}))
roomRemoteBot3.objectList.push(new Disc({posX:3, posY: 7, color:'yellow'}))

roomRemoteBot3.objectList.push(new PressurePlate({color:'white', posX: 9, posY: 8}))
roomRemoteBot3.objectList.push(new DiscScanner({color:'green', posX: 9, posY: 5}))

roomRemoteBot3.objectList.push(new Box({posX: 7, posY: 7}))
roomRemoteBot3.objectList.push(new Disc({posX:7, posY: 6, color:'green'}))

roomRemoteBot3.addLineToObjectList(()=>new FlipWall({color:'white', state:'on'}), 'y', 5, 8, 12)
roomRemoteBot3.addLineToObjectList(()=>new FlipWall({color:'green', state:'on'}), 'y', 5, 8, 13)
roomRemoteBot3.addLineToObjectList(()=>new FlipWall({color:'blue', state:'on'}), 'y', 5, 8, 14)
roomRemoteBot3.addLineToObjectList(()=>new FlipWall({color:'yellow', state:'off'}), 'y', 6, 8, 15)

//roomRemoteBot4 
let roomRemoteBot4 = new Room({playerStartPos:{posX: 0, posY:7}})

roomRemoteBot3.rightRoom = roomRemoteBot4
roomRemoteBot4.leftRoom = roomRemoteBot3

roomRemoteBot4.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 0)
roomRemoteBot4.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 10, 15, 5)
roomRemoteBot4.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 10, 15, 3)
roomRemoteBot4.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 9)

roomRemoteBot4.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 5, 0)
roomRemoteBot4.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 5, 4)
roomRemoteBot4.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 3, 15)
roomRemoteBot4.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 6, 9, 15)

roomRemoteBot4.objectList.push(new Disc({color: 'green', posX: 2, posY: 6}))
roomRemoteBot4.addLineToObjectList(()=>new FlipWall({color:'yellow', state:'off'}), 'x', 1, 3, 5)
roomRemoteBot4.objectList.push(new Box({posX: 2, posY: 4}))
roomRemoteBot4.objectList.push(new PressurePlate({color:'white', posX: 2, posY: 2}))

roomRemoteBot4.objectList.push(new Disc({color: 'yellow', posX: 7, posY: 6}))
roomRemoteBot4.objectList.push({sprite:'wall', renderLayer:'wall', tags:['block'], posX:7, posY:5})
roomRemoteBot4.objectList.push(new DiscScanner({color: 'yellow', posX: 7, posY: 8}))

roomRemoteBot4.addLineToObjectList(()=>new FlipWall({color:'white', state:'off'}), 'y', 1, 2, 10)
roomRemoteBot4.addLineToObjectList(()=>new FlipWall({color:'green', state:'on'}), 'y', 1, 2, 11)
roomRemoteBot4.objectList.push(new RemoteBot({posX: 13, posY: 2}))

roomRemoteBot4.addLineToObjectList(()=>new FlipWall({color:'green', state:'off'}), 'y', 6, 8, 10)
roomRemoteBot4.objectList.push(new DiscScanner({color: 'green', posX: 13, posY: 7, state:'off'}))

roomRemoteBot4.objectList.push(new FlipWall({color:'white', state:'on', posX:10, posY:4}))
roomRemoteBot4.objectList.push(new FlipWall({color:'yellow', state:'on', posX:11, posY:4}))
roomRemoteBot4.objectList.push(new FlipWall({color:'green', state:'on', posX:12, posY:4}))

// introduces teleport pads
let roomTeleport1 = new Room({playerStartPos:{posX: 0, posY:4}})

roomRemoteBot4.rightRoom = roomTeleport1
roomTeleport1.leftRoom = roomRemoteBot4

roomTeleport1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 0)
roomTeleport1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 1)
roomTeleport1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 8, 15, 2)
roomTeleport1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 7, 7)
roomTeleport1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 8)
roomTeleport1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 9)

roomTeleport1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 3, 0)
roomTeleport1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 5, 9, 0)
roomTeleport1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 2, 1)
roomTeleport1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 6, 9, 1)
roomTeleport1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 7)
roomTeleport1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 8)
roomTeleport1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 3, 14)
roomTeleport1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 7, 9, 14)
roomTeleport1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 4, 15)
roomTeleport1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 6, 9, 15)

roomTeleport1.addLineToObjectList(()=>new FlipWall({color:'white', state:'off'}), 'y', 3, 5, 1)
roomTeleport1.objectList.push(new Disc({posX: 3, posY: 3, color:'white'}))
roomTeleport1.objectList.push(new DiscScanner({posX: 5, posY: 4, color:'white'}))
roomTeleport1.objectList.push(new Disc({posX: 3, posY: 5, color:'purple'}))

roomTeleport1.objectList.push(new TeleportPad({posX: 10, posY: 5, state:'off', color:'white'}))
roomTeleport1.objectList.push(new DiscScanner({posX: 12, posY: 5, color:'purple'}))
roomTeleport1.addLineToObjectList(()=>new FlipWall({color:'purple', state:'on'}), 'y', 4, 6, 14)

export let startingRoom = roomConveyor2