import { Box, Conveyor, Disc, DiscScanner, DiscTrap, FlipWall, Lever, Pole, PressurePlate, RemoteBot, TeleportPad, Wall } from "../game-objects.js"
import { Room } from "./room-class.js"

//test room
export const testRoom = new Room({name:'testRoom', playerStartPos:{posX: 2, posY: 3}, loadObjects:()=>{

    testRoom.rightRoom = null

    testRoom.objectList.push(new Disc({color:'red', posX: 1, posY: 1,}))
    testRoom.objectList.push(new Disc({color:'purple', posX: 2, posY: 1,}))
    testRoom.objectList.push(new Disc({color:'green', posX: 3, posY: 1}))
    testRoom.objectList.push(new Disc({color:'yellow', posX: 4, posY: 1}))
    testRoom.objectList.push(new Disc({color:'white', posX: 5, posY: 1}))

    testRoom.objectList.push(new Box({posX: 9, posY: 6}))
    
    testRoom.objectList.push(new Wall({posX: 4, posY: 3}))

    testRoom.objectList.push(new DiscTrap({posX: 11, posY: 6}))

    testRoom.objectList.push(new PressurePlate({color: 'green', posX: 3, posY: 6,}))
    testRoom.objectList.push(new DiscScanner({color: 'red', posX: 2, posY: 6,}))
    testRoom.objectList.push(new Lever({color: 'white', posX: 9, posY: 2,}))
    testRoom.objectList.push(new PressurePlate({color: 'white', posX: 4, posY: 4,}))
    testRoom.objectList.push(new DiscScanner({color: 'white', posX: 4, posY: 6,}))
    testRoom.objectList.push(new Lever({posX: 5, posY: 6,color: 'blue'}))
    testRoom.objectList.push(new TeleportPad({posX: 6, posY: 6, color: 'white'}))
    testRoom.objectList.push(new RemoteBot({posX: 7, posY: 6, disc:null}))

    testRoom.objectList.push(new Pole({posX:7, posY:4, color:'white', state:'on'}))

    testRoom.addLineToObjectList(()=>new FlipWall({color:'white', state:'on'}), 'y', 2, 7, 12)
    testRoom.addLineToObjectList(()=>new Conveyor({color:'white', dir:'right'}), 'x', 3, 7, 8)

    testRoom.addLineToObjectList(()=>new Wall({}), 'x', 0, 15, 0)
    testRoom.addLineToObjectList(()=>new Wall({}), 'x', 0, 15, 9)
    testRoom.addLineToObjectList(()=>new Wall({}), 'y', 0, 9, 0)
    testRoom.addLineToObjectList(()=>new Wall({}), 'y', 0, 2, 15)
    testRoom.addLineToObjectList(()=>new Wall({}), 'y', 7, 9, 15)
}})


//test room
export const testWalls = new Room({name:'testWalls', playerStartPos:{posX: 2, posY: 3}, loadObjects:()=>{

    testWalls.objectList.push(new Wall({posX: 4, posY: 3}))
    testWalls.objectList.push(new Wall({posX: 4, posY: 2}))
    testWalls.objectList.push(new Wall({posX: 5, posY: 2}))
}})