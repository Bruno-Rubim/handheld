import { DiscScanner, FlipWall, Disc, RemoteBot, Lever, PressurePlate, TeleportPad, Box, Conveyor } from "../game-objects.js";
import { Room } from "./room-class.js";

//first room; Introduces lever and flip walls
export const firstRoom = new Room({name:'firstRoom', playerStartPos:{posX: 2, posY: 5}})

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
export const room2Levers = new Room({name:'room2Levers', playerStartPos:{posX: 0, posY: 5}})
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
export const roomDisc1 = new Room({name:'room1Disc', playerStartPos:{posX: 12, posY: 9}})

room2Levers.upRoom = roomDisc1
roomDisc1.downRoom = room2Levers

roomDisc1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 0)
roomDisc1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 5, 8, 1)
roomDisc1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 5, 8, 7)
roomDisc1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 8, 8)
roomDisc1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 8, 9)
roomDisc1.addLineToObjectList(()=>new FlipWall({color:'white', state:'on'}), 'y', 1, 7, 2)
roomDisc1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 8, 9, 14)
roomDisc1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 15)

roomDisc1.objectList.push(new Disc({posX: 11, posY: 2, color: 'white'}))

roomDisc1.objectList.push(new DiscScanner({posX: 6, posY: 4, color: 'white'}))

//roomDisc2 uses Disc with 2 scanners
export const roomDisc2 = new Room({name:'roomDisc2', playerStartPos:{posX: 15, posY: 4}})

roomDisc1.leftRoom = roomDisc2
roomDisc2.rightRoom = roomDisc1

roomDisc2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 0)
roomDisc2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 14, 1)
roomDisc2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 1, 13, 2)
roomDisc2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 5, 8, 1)
roomDisc2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 1, 13, 7)
roomDisc2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 8)
roomDisc2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 9)

roomDisc2.objectList.push(new DiscScanner({color:'white', posX:11, posY: 5}))
roomDisc2.objectList.push(new Disc({color:'white', posX:11, posY: 5}))
roomDisc2.addLineToObjectList(()=>new FlipWall({color:'white', state:'off'}), 'y', 3, 6, 8)
roomDisc2.objectList.push(new DiscScanner({color:'white', posX:5, posY: 4}))
roomDisc2.addLineToObjectList(()=>new FlipWall({color:'white', state:'on'}), 'y', 3, 6, 2)

//roomDiscLever Uses 2 different color nets with lever and disc
export const roomDiscLever = new Room({name:'roomDiscLever2', playerStartPos:{posX: 15, posY: 4}})

roomDisc2.leftRoom = roomDiscLever
roomDiscLever.rightRoom = roomDisc2

roomDiscLever.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 4, 0)
roomDiscLever.addLineToObjectList(()=>new FlipWall({color:'blue', state:'off'}), 'x', 5, 9, 0)
roomDiscLever.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 10, 15, 0)
roomDiscLever.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 4, 1)
roomDiscLever.addLineToObjectList(()=>new FlipWall({color:'white', state:'on'}), 'x', 5, 9, 1)
roomDiscLever.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 10, 15, 1)
roomDiscLever.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 4, 7)
roomDiscLever.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 8)
roomDiscLever.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 9)

roomDiscLever.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 0)
roomDiscLever.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 2, 1)
roomDiscLever.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 6, 9, 1)
roomDiscLever.addLineToObjectList(()=>new FlipWall({color:'blue', state:'on'}), 'y', 2, 6, 4)

roomDiscLever.objectList.push(new Lever({posX: 8, posY: 6, color: 'blue'}))

roomDiscLever.objectList.push(new Disc({posX: 8, posY: 3, color: 'white'}))

roomDiscLever.objectList.push(new DiscScanner({posX: 2, posY: 4, color: 'white'}))

//roomDisc2 Uses 2 different color nets with 2 discs
export const room2Discs = new Room({name:'room2Discs', playerStartPos:{posX: 7, posY:9}})

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
room2Discs.addLineToObjectList(()=>new FlipWall({color:'white', state:'on'}), 'y', 2, 7, 11)
room2Discs.addLineToObjectList(()=>new FlipWall({color:'green', state:'on'}), 'y', 3, 6, 13)

room2Discs.objectList.push(new Disc({color: 'green', posX: 9, posY: 3}))
room2Discs.objectList.push(new Disc({color: 'white', posX: 9, posY: 6}))

room2Discs.objectList.push(new DiscScanner({color: 'green', posX: 4, posY: 6}))
room2Discs.objectList.push(new DiscScanner({color: 'white', posX: 4, posY: 3}))

//roomPushBox1 Introduces disc abilities; movable boxes and pressure plates
export const roomPushBox1 = new Room({name:'roomPushBox1', playerStartPos:{posX: 0, posY:5}})

room2Discs.rightRoom = roomPushBox1
roomPushBox1.leftRoom = room2Discs

roomPushBox1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 0)
roomPushBox1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 1)
roomPushBox1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 2)
roomPushBox1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 2, 6, 3)
roomPushBox1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 8, 15, 3)
roomPushBox1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 7)
roomPushBox1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 8)
roomPushBox1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 9)

roomPushBox1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 2, 0)
roomPushBox1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 7, 9, 0)

roomPushBox1.objectList.push(new Box({posX: 8, posY: 5}))
roomPushBox1.objectList.push(new PressurePlate({color: 'white', posX: 6, posY: 5}))
roomPushBox1.objectList.push(new Disc({color: 'green', posX: 7, posY: 3}))
roomPushBox1.objectList.push(new DiscScanner({color: 'green', posX: 7, posY: 3}))
roomPushBox1.addLineToObjectList(()=>new FlipWall({color:'green', state:'on'}), 'y', 4, 6, 13)
roomPushBox1.addLineToObjectList(()=>new FlipWall({color:'white', state:'on'}), 'y', 4, 6, 11)

//roomPushBox2 continues box and plate concept
export const roomPushBox2 = new Room({name:'roomPushBox2', playerStartPos:{posX: 0, posY:5}})

roomPushBox1.rightRoom = roomPushBox2
roomPushBox2.leftRoom = roomPushBox1

roomPushBox2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 0)
roomPushBox2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 10, 1)
roomPushBox2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 10, 2)
roomPushBox2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 8, 10, 3)
roomPushBox2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 8, 10, 7)
roomPushBox2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 10, 8)
roomPushBox2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 10, 9)
roomPushBox2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 14, 15, 9)

roomPushBox2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 3, 0)
roomPushBox2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 7, 9, 0)
roomPushBox2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 14)
roomPushBox2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 15)

roomPushBox2.objectList.push(new Box({posX: 4, posY: 5}))
roomPushBox2.objectList.push(new PressurePlate({color: 'white', posX: 4, posY: 5}))

roomPushBox2.objectList.push(new Disc({color: 'green', posX: 7, posY: 5}))
roomPushBox2.addLineToObjectList(()=>(new FlipWall({color:'white', state: 'off'})), 'y', 4, 6, 8)

roomPushBox2.objectList.push(new PressurePlate({color: 'white', posX: 12, posY: 2}))
roomPushBox2.objectList.push(new DiscScanner({color: 'green', posX: 12, posY: 5}))

roomPushBox2.addLineToObjectList(()=>(new FlipWall({color:'white', state: 'on'})), 'x', 11, 13, 7)
roomPushBox2.addLineToObjectList(()=>(new FlipWall({color:'green', state: 'on'})), 'x', 11, 13, 8)

//roomPullBox; introduces ability to pull boxes and pressure plates
export const roomPullBox = new Room({name:'roomPullBox', playerStartPos:{posX: 12, posY:0}})

roomPushBox2.downRoom = roomPullBox
roomPullBox.upRoom = roomPushBox2

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

//roomBoxPlates
export const roomBoxPlates = new Room({name:'roomBoxPlates', playerStartPos:{posX: 0, posY:7}})

roomPullBox.rightRoom = roomBoxPlates
roomBoxPlates.leftRoom = roomPullBox

roomBoxPlates.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 10, 0)
roomBoxPlates.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 9)

roomBoxPlates.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 5, 0)
roomBoxPlates.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 3, 1)
roomBoxPlates.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 3, 2)
roomBoxPlates.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 15)

roomBoxPlates.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 1, 10)
roomBoxPlates.addLineToObjectList(()=>new FlipWall({color:'green', state:'off'}), 'x', 11, 13, 0)
roomBoxPlates.addLineToObjectList(()=>new FlipWall({color:'white', state:'on'}), 'x', 11, 13, 1)
roomBoxPlates.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 1, 14)

roomBoxPlates.objectList.push(new DiscScanner({color: 'green', posX: 4, posY: 2}))
roomBoxPlates.objectList.push(new Box({posX: 9, posY: 2}))

roomBoxPlates.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 4, 4)
roomBoxPlates.addLineToObjectList(()=>new FlipWall({color:'green', state:'on'}), 'x', 5, 8, 4)
roomBoxPlates.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 9, 15, 4)

roomBoxPlates.objectList.push(new Disc({color: 'green', posX: 2, posY: 6}))
roomBoxPlates.objectList.push(new Box({posX: 12, posY: 7}))
roomBoxPlates.objectList.push(new PressurePlate({color: 'green', posX: 4, posY: 7}))
roomBoxPlates.objectList.push(new PressurePlate({color: 'white', posX: 9, posY: 7}))

