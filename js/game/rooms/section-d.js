import { DiscScanner, FlipWall, Disc, RemoteBot, Lever, PressurePlate, TeleportPad, Box, Conveyor, Wall } from "../game-objects.js";
import { Room } from "./room-class.js";
import { secCEnd } from "./section-c.js";

// introduces teleport pads
export const roomTeleport1 = new Room({name:'roomTeleport1', playerStartPos:{posX: 0, posY:4}, loadObjects: ()=>{
    localStorage.setItem('startedSectionD', 'yes')
    roomTeleport1.addLineToObjectList(()=>new Wall({}), 'x', 0, 15, 0)
    roomTeleport1.addLineToObjectList(()=>new Wall({}), 'x', 0, 15, 1)
    roomTeleport1.addLineToObjectList(()=>new Wall({}), 'x', 8, 15, 2)
    roomTeleport1.addLineToObjectList(()=>new Wall({}), 'x', 0, 7, 7)
    roomTeleport1.addLineToObjectList(()=>new Wall({}), 'x', 0, 7, 8)
    roomTeleport1.addLineToObjectList(()=>new Wall({}), 'x', 8, 15, 8)
    roomTeleport1.addLineToObjectList(()=>new Wall({}), 'x', 0, 15, 9)
    
    roomTeleport1.addLineToObjectList(()=>new Wall({}), 'y', 0, 2, 0)
    roomTeleport1.addLineToObjectList(()=>new Wall({}), 'y', 6, 9, 0)
    roomTeleport1.addLineToObjectList(()=>new Wall({}), 'y', 0, 2, 1)
    roomTeleport1.addLineToObjectList(()=>new Wall({}), 'y', 6, 9, 1)
    roomTeleport1.addLineToObjectList(()=>new Wall({}), 'y', 0, 9, 7)
    roomTeleport1.addLineToObjectList(()=>new Wall({}), 'y', 0, 9, 8)
    roomTeleport1.addLineToObjectList(()=>new Wall({}), 'y', 0, 3, 14)
    roomTeleport1.addLineToObjectList(()=>new Wall({}), 'y', 7, 9, 14)
    roomTeleport1.addLineToObjectList(()=>new Wall({}), 'y', 0, 3, 15)
    roomTeleport1.addLineToObjectList(()=>new Wall({}), 'y', 7, 9, 15)
    
    roomTeleport1.addLineToObjectList(()=>new FlipWall({color:'white', state:'off'}), 'y', 3, 5, 1)
    roomTeleport1.objectList.push(new Disc({posX: 3, posY: 3, color:'white'}))
    roomTeleport1.objectList.push(new DiscScanner({posX: 5, posY: 4, color:'white'}))
    roomTeleport1.objectList.push(new Disc({posX: 3, posY: 5, color:'purple'}))
    
    roomTeleport1.objectList.push(new TeleportPad({posX: 10, posY: 5, state:'off', color:'white'}))
    roomTeleport1.objectList.push(new DiscScanner({posX: 12, posY: 5, color:'purple'}))
    roomTeleport1.addLineToObjectList(()=>new FlipWall({color:'purple', state:'on'}), 'y', 4, 6, 14)
}})
export const secDStart = roomTeleport1

secCEnd.rightRoom = roomTeleport1
roomTeleport1.leftRoom = secCEnd

// uses teleport as way out of trap
export const roomTeleport2 = new Room({name:'roomTeleport2', playerStartPos:{posX: 0, posY:5}, loadObjects:()=>{
    roomTeleport2.addLineToObjectList(()=>new Wall({}), 'x', 0, 15, 0)
    roomTeleport2.addLineToObjectList(()=>new Wall({}), 'x', 0, 15, 9)

    roomTeleport2.addLineToObjectList(()=>new Wall({}), 'y', 0, 3, 0)
    roomTeleport2.addLineToObjectList(()=>new Wall({}), 'y', 7, 9, 0)
    roomTeleport2.addLineToObjectList(()=>new Wall({}), 'y', 0, 4, 15)

    roomTeleport2.objectList.push(new Disc({posX: 6, posY: 7, color:'purple'}))
    roomTeleport2.objectList.push(new DiscScanner({posX: 6, posY: 7 , color:'purple'}))
    roomTeleport2.objectList.push(new TeleportPad({posX: 6, posY: 3, color:'purple'}))

    roomTeleport2.objectList.push(new Box({posX: 3, posY: 4}))
    roomTeleport2.objectList.push(new Disc({posX: 3, posY: 6, color:'green'}))

    roomTeleport2.addLineToObjectList(()=>(new FlipWall({state:'off', color:'white'})), 'y', 1, 3, 9)
    roomTeleport2.objectList.push(new PressurePlate({posX: 13, posY: 2, color:'white'}))
    
    roomTeleport2.addLineToObjectList(()=>new Wall({}), 'x', 9, 15, 4)
    roomTeleport2.addLineToObjectList(()=>(new FlipWall({state:'on', color:'white'})), 'y', 5, 7, 9)
    roomTeleport2.addLineToObjectList(()=>(new FlipWall({state:'on', color:'purple'})), 'y', 5, 7, 13)
    roomTeleport2.addLineToObjectList(()=>new Wall({}), 'x', 9, 15, 8)
}})

roomTeleport1.rightRoom = roomTeleport2
roomTeleport2.leftRoom = roomTeleport1

// needs player to teleport remoteBot
export const roomTeleport3 = new Room({name:'roomTeleport3', playerStartPos:{posX: 0, posY:6}, loadObjects:()=>{
    roomTeleport3.addLineToObjectList(()=>new Wall({}), 'x', 0, 9, 0)
    roomTeleport3.addLineToObjectList(()=>new Wall({}), 'x', 13, 15, 0)
    roomTeleport3.addLineToObjectList(()=>new Wall({}), 'x', 0, 15, 9)

    roomTeleport3.addLineToObjectList(()=>new Wall({}), 'y', 0, 4, 0)
    roomTeleport3.addLineToObjectList(()=>new Wall({}), 'y', 8, 9, 0)
    roomTeleport3.addLineToObjectList(()=>new Wall({}), 'y', 0, 5, 13)
    roomTeleport3.addLineToObjectList(()=>new Wall({}), 'y', 0, 5, 14)
    roomTeleport3.addLineToObjectList(()=>new Wall({}), 'y', 0, 9, 15)
    
    roomTeleport3.objectList.push(new Disc({posX: 3, posY: 2, color:'purple'}))
    roomTeleport3.objectList.push(new DiscScanner({posX: 3, posY: 2 , color:'purple'}))
    roomTeleport3.objectList.push(new PressurePlate({posX: 7, posY: 2 , color:'purple'}))
    
    // roomTeleport3.addLineToObjectList(()=>new Wall({}), 'y', 4, 5, 5)

    roomTeleport3.objectList.push(new Disc({posX: 3, posY: 7, color:'yellow'}))
    roomTeleport3.objectList.push(new DiscScanner({posX: 3, posY: 7 , color:'yellow'}))
    roomTeleport3.objectList.push(new RemoteBot({posX: 7, posY: 7}))
    
    roomTeleport3.addLineToObjectList(()=>new Wall({}), 'x', 11, 15, 5)
    roomTeleport3.addLineToObjectList(()=>(new FlipWall({color:'white', state:'on'})), 'y', 6, 8, 11)
    roomTeleport3.objectList.push(new TeleportPad({posX: 12, posY: 7, color:'purple', state:'off'}))
    roomTeleport3.objectList.push(new PressurePlate({posX: 13, posY: 7, color:'white', state:'off'}))

    roomTeleport3.addLineToObjectList(()=>new Wall({}), 'y', 0, 2, 10)
    roomTeleport3.addLineToObjectList(()=>(new FlipWall({color:'white', state:'on'})), 'x', 11, 12, 1)
    roomTeleport3.addLineToObjectList(()=>(new FlipWall({color:'yellow', state:'on'})), 'x', 11, 12, 2)
    roomTeleport3.addLineToObjectList(()=>(new FlipWall({color:'purple', state:'on'})), 'x', 11, 12, 0)
}})

roomTeleport2.rightRoom = roomTeleport3
roomTeleport3.leftRoom = roomTeleport2

// introduces conveyor
export const roomConveyor1 = new Room({name:'roomConveyor1', playerStartPos:{posX: 11, posY:9}, loadObjects:()=>{
    roomConveyor1.addLineToObjectList(()=>new Wall({}), 'x', 0, 15, 0)
    roomConveyor1.addLineToObjectList(()=>new Wall({}), 'x', 7, 10, 3)
    roomConveyor1.addLineToObjectList(()=>new Wall({}), 'x', 7, 10, 4)
    roomConveyor1.addLineToObjectList(()=>new Wall({}), 'x', 0, 3, 4)
    roomConveyor1.addLineToObjectList(()=>new Wall({}), 'x', 0, 3, 5)
    roomConveyor1.addLineToObjectList(()=>new Wall({}), 'x', 0, 9, 8)
    roomConveyor1.addLineToObjectList(()=>new Wall({}), 'x', 0, 10, 9)
    roomConveyor1.addLineToObjectList(()=>new Wall({}), 'x', 13, 15, 9)

    roomConveyor1.addLineToObjectList(()=>new Wall({}), 'y', 0, 5, 0)
    roomConveyor1.addLineToObjectList(()=>new Wall({}), 'y', 8, 9, 0)
    roomConveyor1.addLineToObjectList(()=>new Wall({}), 'y', 0, 5, 1)
    roomConveyor1.addLineToObjectList(()=>new Wall({}), 'y', 0, 5, 2)
    roomConveyor1.addLineToObjectList(()=>new Wall({}), 'y', 4, 9, 6)
    roomConveyor1.addLineToObjectList(()=>new Wall({}), 'y', 4, 9, 7)
    roomConveyor1.addLineToObjectList(()=>new Wall({}), 'y', 4, 9, 8)
    roomConveyor1.addLineToObjectList(()=>new Wall({}), 'y', 4, 9, 9)
    roomConveyor1.addLineToObjectList(()=>new Wall({}), 'y', 0, 4, 13)
    roomConveyor1.addLineToObjectList(()=>new Wall({}), 'y', 0, 9, 14)
    roomConveyor1.addLineToObjectList(()=>new Wall({}), 'y', 0, 9, 15)
    
    roomConveyor1.addLineToObjectList(()=>(new Conveyor({dir:'down', color:'blue'})), 'y', 4, 5, 4)
    roomConveyor1.addLineToObjectList(()=>(new Conveyor({dir:'down', color:'blue'})), 'y', 4, 6, 5)
    roomConveyor1.addLineToObjectList(()=>(new Conveyor({dir:'left', color:'blue'})), 'x', 2, 4, 6)
    roomConveyor1.addLineToObjectList(()=>(new Conveyor({dir:'left', color:'blue'})), 'x', 2, 5, 7)
    roomConveyor1.objectList.push(new Lever({posX: 4, posY: 2, color:'blue', state:'off'}))

    roomConveyor1.addLineToObjectList(()=>(new Conveyor({dir:'right', color:'blue'})), 'x', 7, 12, 1)
    roomConveyor1.addLineToObjectList(()=>(new Conveyor({dir:'right', color:'blue'})), 'x', 7, 11, 2)
    roomConveyor1.addLineToObjectList(()=>(new Conveyor({dir:'down', color:'blue'})), 'y', 3, 4, 11)
    roomConveyor1.addLineToObjectList(()=>(new Conveyor({dir:'down', color:'blue'})), 'y', 2, 4, 12)
    roomConveyor1.objectList.push(new Lever({posX: 12, posY: 6, color:'blue', state:'off'}))
}})

roomTeleport3.upRoom = roomConveyor1
roomConveyor1.downRoom = roomTeleport3

// needs player to teleport remoteBot
export const roomConveyor2 = new Room({name:'roomConveyorTeleport', playerStartPos:{posX: 15, posY:6}, loadObjects:()=>{
    roomConveyor2.addLineToObjectList(()=>new Wall({}), 'x', 0, 15, 0)
    roomConveyor2.addLineToObjectList(()=>new Wall({}), 'x', 0, 15, 9)

    roomConveyor2.addLineToObjectList(()=>new Wall({}), 'y', 0, 3, 0)
    roomConveyor2.addLineToObjectList(()=>new Wall({}), 'y', 7, 9, 0)
    roomConveyor2.addLineToObjectList(()=>new Wall({}), 'y', 0, 3, 14)
    roomConveyor2.addLineToObjectList(()=>new Wall({}), 'y', 0, 5, 15)
    roomConveyor2.addLineToObjectList(()=>new Wall({}), 'y', 8, 9, 15)

    roomConveyor2.addLineToObjectList(()=>new Wall({}), 'x', 0, 1, 3)
    roomConveyor2.addLineToObjectList(()=>(new FlipWall({color:'white', state: 'on'})), 'y', 4, 6, 1)
    roomConveyor2.addLineToObjectList(()=>new Wall({}), 'x', 0, 1, 7)

    roomConveyor2.objectList.push(new DiscScanner({color: 'white', posX:4, posY:3}))
    roomConveyor2.objectList.push(new Lever({color: 'blue', posX:4, posY:7}))

    roomConveyor2.addLineToObjectList(()=>new Wall({}), 'x', 9, 14, 1)
    roomConveyor2.objectList.push(new FlipWall({color: 'blue', state:'on', posX:9, posY:2}))
    roomConveyor2.addLineToObjectList(()=>(new Conveyor({dir:'right', color:'blue', speed:4})), 'x', 10, 13, 2)
    roomConveyor2.objectList.push(new Disc({color: 'white', posX:10, posY:2}))
    roomConveyor2.addLineToObjectList(()=>new Wall({}), 'x', 9, 14, 3)

}})

roomConveyor1.leftRoom = roomConveyor2
roomConveyor2.rightRoom = roomConveyor1

//roomLeverPLate Uses multiple Pressure plates boxes and conveyors
export const roomConveyor3 = new Room({name:'roomConveyor3', playerStartPos:{posX: 15, posY:5}, loadObjects:()=>{
    roomConveyor3.addLineToObjectList(()=>new Wall({}), 'x', 0, 4, 0)
    roomConveyor3.addLineToObjectList(()=>new Wall({}), 'x', 9, 15, 0)
    roomConveyor3.addLineToObjectList(()=>new Wall({}), 'x', 0, 15, 9)

    roomConveyor3.addLineToObjectList(()=>new Wall({}), 'y', 0, 9, 0)
    roomConveyor3.addLineToObjectList(()=>new Wall({}), 'y', 0, 9, 2)
    roomConveyor3.addLineToObjectList(()=>new Wall({}), 'y', 0, 3, 15)
    roomConveyor3.addLineToObjectList(()=>new Wall({}), 'y', 7, 9, 15)

    roomConveyor3.addLineToObjectList(()=>(new Conveyor({dir:'down', color:'blue', speed:2.5})), 'y', 1, 8, 1)
    roomConveyor3.objectList.push(new PressurePlate({color:'white', posX:1, posY:1}))
    roomConveyor3.objectList.push(new Box({posX:1, posY:1}))

    roomConveyor3.addLineToObjectList(()=>new Wall({}), 'y', 0, 3, 5)
    roomConveyor3.addLineToObjectList(()=>(new FlipWall({color:'white', state: 'on'})), 'x', 6, 8, 1)
    roomConveyor3.addLineToObjectList(()=>(new FlipWall({color:'green', state: 'on'})), 'x', 6, 8, 2)
    roomConveyor3.addLineToObjectList(()=>(new FlipWall({color:'white', state: 'off'})), 'x', 6, 8, 3)
    roomConveyor3.addLineToObjectList(()=>new Wall({}), 'y', 0, 3, 9)

    roomConveyor3.objectList.push(new PressurePlate({color:'blue', posX:5, posY:7}))
    roomConveyor3.objectList.push(new Disc({color:'green', posX:9, posY:7}))
    roomConveyor3.objectList.push(new DiscScanner({color:'green', posX:9, posY:7}))
    roomConveyor3.objectList.push(new Box({posX:12, posY:7}))
}})

roomConveyor2.leftRoom = roomConveyor3
roomConveyor3.rightRoom = roomConveyor2

//roomLeverPLate Uses multiple Pressure plates boxes and conveyors
export const roomConveyorTeleport = new Room({name:'roomConveyor3', playerStartPos:{posX: 7, posY:9}, loadObjects:()=>{
    roomConveyorTeleport.addLineToObjectList(()=>new Wall({}), 'x', 0, 15, 0)
    roomConveyorTeleport.addLineToObjectList(()=>new Wall({}), 'x', 0, 5, 9)
    roomConveyorTeleport.addLineToObjectList(()=>new Wall({}), 'x', 9, 15, 9)
    
    roomConveyorTeleport.addLineToObjectList(()=>new Wall({}), 'y', 0, 9, 0)
    roomConveyorTeleport.addLineToObjectList(()=>new Wall({}), 'y', 0, 4, 13)
    roomConveyorTeleport.addLineToObjectList(()=>new Wall({}), 'y', 0, 4, 14)
    roomConveyorTeleport.addLineToObjectList(()=>new Wall({}), 'y', 0, 4, 15)
    
    roomConveyorTeleport.addLineToObjectList(()=>new Wall({}), 'x', 0, 4, 1)
    roomConveyorTeleport.addLineToObjectList(()=>(new Conveyor({dir:'left', color:'purple', speed:8})), 'x', 2, 3, 2)
    roomConveyorTeleport.addLineToObjectList(()=>(new Conveyor({dir:'right', color:'white', speed:8})), 'x', 4, 4, 2)
    roomConveyorTeleport.objectList.push(new PressurePlate({posX:1, posY:2, color:'white'}))
    roomConveyorTeleport.addLineToObjectList(()=>new Wall({}), 'x', 0, 4, 3)
    
    roomConveyorTeleport.objectList.push(new Disc({posX:7, posY:2, color:'purple'}))
    roomConveyorTeleport.objectList.push(new DiscScanner({posX:7, posY:2, color:'purple'}))
    roomConveyorTeleport.objectList.push(new TeleportPad({posX:11, posY:2, color:'white', state:'on'}))
    
    roomConveyorTeleport.addLineToObjectList(()=>new Wall({}), 'x', 0, 1, 4)
    roomConveyorTeleport.addLineToObjectList(()=>(new Conveyor({dir:'right', color:'white'})), 'x', 2, 5, 4)
    roomConveyorTeleport.objectList.push(new Conveyor({dir:'up', color:'white', posX: 2, posY: 5}))
    roomConveyorTeleport.addLineToObjectList(()=>new Wall({}), 'x', 0, 1, 5)
    roomConveyorTeleport.addLineToObjectList(()=>new Wall({}), 'x', 3, 4, 5)
    
    roomConveyorTeleport.objectList.push(new PressurePlate({posX:1, posY:7, color:'white'}))
    roomConveyorTeleport.objectList.push(new DiscScanner({posX:3, posY:7, color:'yellow'}))
    roomConveyorTeleport.addLineToObjectList(()=>(new Conveyor({dir:'left', color:'blue'})), 'y', 6, 8, 4)
    
    roomConveyorTeleport.objectList.push(new RemoteBot({posX:7, posY:6, color:'yellow'}))
    roomConveyorTeleport.objectList.push(new Disc({posX:10, posY:6, color:'yellow'}))

    roomConveyorTeleport.addLineToObjectList(()=>new Wall({}), 'x', 10, 15, 4)
    roomConveyorTeleport.addLineToObjectList(()=>(new FlipWall({state:'on', color:'yellow'})), 'y', 5, 7, 12)
    roomConveyorTeleport.addLineToObjectList(()=>(new FlipWall({state:'on', color:'purple'})), 'y', 5, 7, 13)
    roomConveyorTeleport.addLineToObjectList(()=>(new FlipWall({state:'on', color:'white'})), 'y', 5, 7, 14)
    roomConveyorTeleport.addLineToObjectList(()=>new Wall({}), 'x', 10, 15, 8)
}})

roomConveyor3.upRoom = roomConveyorTeleport
roomConveyorTeleport.downRoom = roomConveyor3

export const secDend = roomConveyorTeleport;