import { DiscScanner, FlipWall, Disc, RemoteBot, Lever, PressurePlate, TeleportPad, Box, Conveyor } from "../game-objects.js";
import { Room } from "./room-class.js";

//roomConveyor; introduces conveyor blocks
export const roomConveyor1 = new Room({name:'roomConveyor1', playerStartPos:{posX: 3, posY:9}})

// room?.upRoom = roomConveyor1
// roomConveyor1.downRoom = room?

roomConveyor1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 10, 0)
roomConveyor1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 14, 15, 0)
roomConveyor1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 1, 9)
roomConveyor1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 5, 15, 9)

roomConveyor1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 0)
roomConveyor1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 15)

//roomConveyor; introduces conveyor blocks
export const roomConveyor2 = new Room({name:'roomConveyor2', playerStartPos:{posX: 3, posY:9}})

roomConveyor1.upRoom = roomConveyor2
roomConveyor2.downRoom = roomConveyor1

roomConveyor2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 0)
roomConveyor2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 5, 15, 9)

roomConveyor2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 0)
roomConveyor2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 5, 15)

//roomLeverPLate Uses multiple Pressure plates boxes and conveyors
export const roomPlatesBoxConv = new Room({name:'roomPlatesBoxConv', playerStartPos:{posX: 0, posY:7}})

roomConveyor2.rightRoom = roomPlatesBoxConv
roomPlatesBoxConv.leftRoom = roomConveyor2

roomPlatesBoxConv.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 0)
roomPlatesBoxConv.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 4, 9, 4)
roomPlatesBoxConv.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 4, 9, 5)
roomPlatesBoxConv.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 9)

roomPlatesBoxConv.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 5, 0)
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
roomPlatesBoxConv.addLineToObjectList(()=>new FlipWall({color:'green', state:'on'}), 'y', 6, 8, 13)
roomPlatesBoxConv.addLineToObjectList(()=>new FlipWall({color:'white', state:'off'}), 'y', 6, 8, 14)

//roomConveyor; pressure plates and boxes