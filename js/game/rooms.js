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
                obj = new originalObj.class (obj)
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

testRoom.objectList.push(new Disc({
    color:'red',
    posX: 3,
    posY: 4,
    layer:'disc',
    controls:[
        'drill-controls',

    ]})
)
testRoom.objectList.push(new Disc({
    color:'purple',
    posX: 2,
    posY: 7,
    layer:'disc',
    controls:[
        'teleport-controls',

    ]})
)
testRoom.objectList.push(new Disc({
    color:'green',
    posX: 4,
    posY: 7,
    layer:'disc',
    controls:[
        'push-box-controls'
        
    ]})
)
testRoom.objectList.push(new Disc({
    color:'yellow',
    posX: 3,
    posY: 3,
    layer:'disc',
    controls:[
        'move-remote-bot-controls'
    ]})
)

testRoom.objectList.push(({name:'box', posX: 9, posY: 5, layer:'player'}))

testRoom.objectList.push(new DiscTrap({posX: 11, posY: 1}))

testRoom.objectList.push(
    new DiscScanner({color: 'red',
        effectOn: ()=>{
            netSwitch('red')
        },
        effectOff: ()=>{
            netSwitch('red')
        },
        posX: 4,
        posY: 4,
        layer: 'scanner'
    })
)

testRoom.objectList.push({
    name:'teleport-pad',
    posX: 6,
    posY: 3,
    layer:'teleport'
})

testRoom.objectList.push(new RemoteBot({
    posX: 7, posY: 8, disc:null
}))

testRoom.objectList.push(
    new SwitchButton({
        posX: 5,
        posY: 3,
        color: 'blue',
        layer: 'button',
    })
)

testRoom.addLineToObjectList(new FlipWall({color:'red', state:'on', layer:'player'}), 'y', 2, 7, 14)
testRoom.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 0)
testRoom.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 9)
testRoom.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 0)
testRoom.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 2, 15)
testRoom.addLineToObjectList({name:'wall', layer:'player'}, 'y', 7, 9, 15)

//room0
export let room0 = new Room({playerStartPos:{posX: 1, posY: 5}})

room0.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 0)
room0.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 1)
room0.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 2)
room0.addLineToObjectList({name:'wall', layer:'player'}, 'x', 8, 12, 3)
room0.addLineToObjectList({name:'wall', layer:'player'}, 'x', 8, 12, 6)
room0.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 7)
room0.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 8)
room0.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 9)
room0.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 0)

room0.addLineToObjectList(new FlipWall({color:'white', state:'on', layer:'player'}), 'y', 4, 5, 8)
room0.objectList.push (new SwitchButton({posX: 5, posY: 4, color: 'white'}))

//room1
export let room1 = new Room({playerStartPos:{posX: 0, posY: 5}})
room0.rightRoom = room1
room1.leftRoom = room0

room1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 8, 0)
room1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 8, 1)

room1.objectList.push({name:'wall', layer:'player', posX:9, posY:1})
room1.addLineToObjectList(new FlipWall({color:'white', state:'off'}), 'x', 10, 12, 1)
room1.objectList.push({name:'wall', layer:'player', posX:13, posY:1})

room1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 8, 2)
room1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 7)
room1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 8)
room1.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 9)

room1.objectList.push({name:'wall', layer:'player', posX:7, posY:3})
room1.addLineToObjectList(new FlipWall({color:'white', state:'on'}), 'y', 4, 5, 7)
room1.objectList.push({name:'wall', layer:'player', posX:7, posY:6})

room1.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 14)
room1.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 15)

room1.objectList.push(new SwitchButton({
    posX: 4,
    posY: 3,
    color: 'white'
}))
room1.objectList.push(new SwitchButton({
    posX: 12,
    posY: 5,
    color: 'white'
}))

//room2
export let room2 = new Room({playerStartPos:{posX: 12, posY: 9}})

room1.upRoom = room2
room2.downRoom = room1

room2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 0)
room2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 5, 8, 1)
room2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 5, 8, 7)
room2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 8, 8)
room2.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 8, 9)
room2.addLineToObjectList(new FlipWall({color:'white', state:'on'}), 'y', 1, 7, 2)
room2.addLineToObjectList({name:'wall', layer:'player'}, 'y', 8, 9, 14)
room2.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 15)

room2.objectList.push(new Disc({
    posX: 11,
    posY: 2,
    color: 'white'
}))

room2.objectList.push(new DiscScanner({
    posX: 6,
    posY: 4,
    color: 'white'
}))


//room3
export let room3 = new Room({playerStartPos:{posX: 15, posY: 4}})

room2.leftRoom = room3
room3.rightRoom = room2

room3.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 4, 0)
room3.addLineToObjectList(new FlipWall({color:'white', state:'on'}), 'x', 5, 9, 0)
room3.addLineToObjectList({name:'wall', layer:'player'}, 'x', 10, 15, 0)
room3.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 4, 1)
room3.addLineToObjectList(new FlipWall({color:'blue', state:'off'}), 'x', 5, 9, 1)
room3.addLineToObjectList({name:'wall', layer:'player'}, 'x', 10, 15, 1)
room3.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 4, 7)
room3.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 8)
room3.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 9)

room3.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 0)
room3.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 2, 1)
room3.addLineToObjectList({name:'wall', layer:'player'}, 'y', 6, 9, 1)
room3.addLineToObjectList(new FlipWall({color:'blue', state:'on'}), 'y', 2, 6, 4)

room3.objectList.push(new SwitchButton({
    posX: 8,
    posY: 5,
    color: 'blue'
}))

room3.objectList.push(new Disc({
    posX: 14,
    posY: 7,
    color: 'white'
}))

room3.objectList.push(new DiscScanner({posX: 2, posY: 4, color: 'white'}))

//room4
export let room4 = new Room({playerStartPos:{posX: 7, posY:9}})

room3.upRoom = room4
room4.downRoom = room3

room4.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 0)
room4.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 15, 1)
room4.addLineToObjectList({name:'wall', layer:'player'}, 'x', 12, 15, 2)
room4.addLineToObjectList({name:'wall', layer:'player'}, 'x', 12, 15, 7)
room4.addLineToObjectList({name:'wall', layer:'player'}, 'x', 10, 15, 8)
room4.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 4, 8)
room4.addLineToObjectList({name:'wall', layer:'player'}, 'x', 0, 4, 9)
room4.addLineToObjectList({name:'wall', layer:'player'}, 'x', 10, 15, 9)

room4.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 0)
room4.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 1)
room4.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 9, 2)
room4.addLineToObjectList(new FlipWall({color:'white', state:'on'}), 'y', 3, 6, 13)
room4.addLineToObjectList(new FlipWall({color:'green', state:'on'}), 'y', 3, 6, 14)

room4.objectList.push({name:'box', posX: 8, posY: 4, layer:'player'})
room4.objectList.push({name:'box', posX: 8, posY: 5, layer:'player'})

room4.objectList.push(new Disc({color: 'green', posX: 4, posY: 3}))
room4.objectList.push(new Disc({color: 'white', posX: 4, posY: 6}))

room4.objectList.push(new DiscScanner({color: 'green', posX: 4, posY: 6}))
room4.objectList.push(new DiscScanner({color: 'white', posX: 4, posY: 3}))

//room5
export let room5 = new Room({playerStartPos:{posX: 0, posY:4}})

room4.rightRoom = room5
room5.leftRoom = room4

room5.addLineToObjectList({name:'wall', layer:'player'}, 'y', 0, 2, 0)
room5.addLineToObjectList({name:'wall', layer:'player'}, 'y', 7, 9, 0)