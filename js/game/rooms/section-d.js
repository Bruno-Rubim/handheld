import { DiscScanner, FlipWall, Disc, RemoteBot, Lever, PressurePlate, TeleportPad, Box, Conveyor } from "../game-objects.js";
import { player } from "../player.js";
import { Room } from "./room-class.js";
import { secCEnd } from "./section-c.js";

//roomConveyor; introduces conveyor blocks
export const roomConveyor1 = new Room({name:'roomConveyor1', playerStartPos:{posX: 0, posY:4}, loadObjects:()=>{
    localStorage.setItem('startedSectionD', 'yes')
    roomConveyor1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 10, 0)
    roomConveyor1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 14, 15, 0)
    roomConveyor1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 9, 8)
    roomConveyor1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 9)

    roomConveyor1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 3, 0)
    roomConveyor1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 5, 9, 0)
    roomConveyor1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 3, 1)
    roomConveyor1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 5, 9, 1)
    roomConveyor1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 3, 2)
    roomConveyor1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 5, 9, 2)
    roomConveyor1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 5, 9, 3)
    roomConveyor1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 5, 6, 5)
    roomConveyor1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 6, 6)
    roomConveyor1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 6, 7)
    roomConveyor1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 6, 8)
    roomConveyor1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 6, 9)
    roomConveyor1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 5, 10)
    roomConveyor1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 2, 5, 11)
    roomConveyor1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 2, 5, 13)
    roomConveyor1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 14)
    roomConveyor1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 15)

    roomConveyor1.objectList.push(new Lever({color: 'blue', posX:4, posY:2}))
    roomConveyor1.addLineToObjectList(()=>(new Conveyor({dir:'up', color:'blue'})), 'y', 5, 6, 4)
    roomConveyor1.addLineToObjectList(()=>(new Conveyor({dir:'left', color:'blue'})), 'x', 5, 9, 7)
    roomConveyor1.addLineToObjectList(()=>(new Conveyor({dir:'up', color:'blue'})), 'y', 2, 5, 12)
    roomConveyor1.objectList.push(new Lever({color: 'blue', posX:12, posY:7}))
}})
export const secDStart = roomConveyor1

secCEnd.rightRoom = roomConveyor1
roomConveyor1.leftRoom = secCEnd

//roomConveyor; introduces conveyor blocks
export const roomConveyor2 = new Room({name:'roomConveyor2', playerStartPos:{posX: 12, posY:9}, loadObjects:()=>{
    roomConveyor2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 0)
    roomConveyor2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 10, 8)
    roomConveyor2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 10, 9)

    roomConveyor2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 2, 0)
    roomConveyor2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 6, 9, 0)
    roomConveyor2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 14)
    roomConveyor2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 15)

    roomConveyor2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 1, 2)
    roomConveyor2.addLineToObjectList(()=>(new FlipWall({color:'white', state: 'on'})), 'y', 3, 5, 1)
    roomConveyor2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 1, 6)

    roomConveyor2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 9, 14, 1)
    roomConveyor2.objectList.push(new FlipWall({color: 'blue', state:'on', posX:9, posY:2}))
    roomConveyor2.addLineToObjectList(()=>(new Conveyor({dir:'right', color:'blue', speed:4})), 'x', 10, 13, 2)
    roomConveyor2.objectList.push(new Disc({color: 'white', posX:10, posY:2}))
    roomConveyor2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 9, 14, 3)

    roomConveyor2.objectList.push(new DiscScanner({color: 'white', posX:4, posY:3}))
    roomConveyor2.objectList.push(new Lever({color: 'blue', posX:4, posY:5}))
}})

roomConveyor1.upRoom = roomConveyor2
roomConveyor2.downRoom = roomConveyor1

//roomLeverPLate Uses multiple Pressure plates boxes and conveyors
export const roomConveyor3 = new Room({name:'roomConveyor3', playerStartPos:{posX: 15, posY:4}, loadObjects:()=>{
    roomConveyor3.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 4, 0)
    roomConveyor3.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 9, 15, 0)
    roomConveyor3.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 9)

    roomConveyor3.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 0)
    roomConveyor3.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 2)
    roomConveyor3.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 2, 15)
    roomConveyor3.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 6, 9, 15)

    roomConveyor3.addLineToObjectList(()=>(new Conveyor({dir:'down', color:'blue', speed:2.5})), 'y', 1, 8, 1)
    roomConveyor3.objectList.push(new PressurePlate({color:'white', posX:1, posY:1}))
    roomConveyor3.objectList.push(new Box({posX:1, posY:1}))

    roomConveyor3.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 3, 5)
    roomConveyor3.addLineToObjectList(()=>(new FlipWall({color:'white', state: 'on'})), 'x', 6, 8, 1)
    roomConveyor3.addLineToObjectList(()=>(new FlipWall({color:'green', state: 'on'})), 'x', 6, 8, 2)
    roomConveyor3.addLineToObjectList(()=>(new FlipWall({color:'white', state: 'off'})), 'x', 6, 8, 3)
    roomConveyor3.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 3, 9)

    roomConveyor3.objectList.push(new PressurePlate({color:'blue', posX:5, posY:7}))
    roomConveyor3.objectList.push(new Disc({color:'green', posX:9, posY:7}))
    roomConveyor3.objectList.push(new DiscScanner({color:'green', posX:9, posY:7}))
    roomConveyor3.objectList.push(new Box({posX:12, posY:7}))
}})

roomConveyor2.leftRoom = roomConveyor3
roomConveyor3.rightRoom = roomConveyor2

//roomConveyor; introduces conveyor blocks
export const roomConveyor4 = new Room({name:'roomConveyor4', playerStartPos:{posX: 7, posY:9}, loadObjects:()=>{
    roomConveyor4.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 0)
    roomConveyor4.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 5, 9)
    roomConveyor4.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 9, 15, 9)
    
    roomConveyor4.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 0)
    roomConveyor4.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 4, 15)
    roomConveyor4.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 8, 9, 15)
}})

roomConveyor3.upRoom = roomConveyor4
roomConveyor4.downRoom = roomConveyor3

//roomLeverPLate Uses multiple Pressure plates boxes and conveyors
export const roomPlatesBoxConv = new Room({name:'roomPlatesBoxConv', playerStartPos:{posX: 0, posY:6}, loadObjects:()=>{
    roomPlatesBoxConv.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 0)
    roomPlatesBoxConv.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 4, 9, 4)
    roomPlatesBoxConv.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 4, 9, 5)
    roomPlatesBoxConv.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 9)

    roomPlatesBoxConv.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 4, 0)
    roomPlatesBoxConv.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 8, 9, 0)
    roomPlatesBoxConv.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 1, 3, 9)
    roomPlatesBoxConv.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 5, 13)
    roomPlatesBoxConv.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 5, 14)
    roomPlatesBoxConv.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 5, 15)

    roomPlatesBoxConv.addLineToObjectList(()=>(new Conveyor({color:'white', dir: 'left'})), 'y', 1, 3, 4)
    roomPlatesBoxConv.addLineToObjectList(()=>(new Conveyor({color:'white', dir: 'left'})), 'y', 1, 3, 5)
    roomPlatesBoxConv.objectList.push(new Lever({color: 'white', posX:7, posY:2}))

    roomPlatesBoxConv.objectList.push(new Disc({color: 'green', posX:4, posY:7}))
    roomPlatesBoxConv.objectList.push(new PressurePlate({color: 'white', posX:6, posY:7}))
    roomPlatesBoxConv.objectList.push(new Box({posX:6, posY:7}))
    roomPlatesBoxConv.addLineToObjectList(()=>new FlipWall({color:'white', state:'on'}), 'y', 6, 8, 9)
    roomPlatesBoxConv.objectList.push(new PressurePlate({color: 'white', posX:11, posY:7}))

    roomPlatesBoxConv.objectList.push(new DiscScanner({color: 'green', posX:11, posY:2}))
    roomPlatesBoxConv.addLineToObjectList(()=>new Conveyor({color:'green', dir:'left'}), 'y', 6, 8, 13)
    roomPlatesBoxConv.addLineToObjectList(()=>new Conveyor({color:'white', dir:'right'}), 'y', 6, 8, 14)
}})

roomConveyor4.rightRoom = roomPlatesBoxConv
roomPlatesBoxConv.leftRoom = roomConveyor4