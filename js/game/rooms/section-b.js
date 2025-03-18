import { DiscScanner, FlipWall, Disc, RemoteBot, Lever, PressurePlate, TeleportPad, Box, Conveyor } from "../game-objects.js";
import { Room } from "./room-class.js";
import { roomBoxPlates } from "./section-a.js";

//roomRemoteLever; Introduces remoteBot
export const roomRemoteBot1 = new Room({name:'roomRemoteBot', playerStartPos:{posX: 12, posY:9}})

roomBoxPlates.upRoom = roomRemoteBot1
roomRemoteBot1.downRoom = roomBoxPlates

roomRemoteBot1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 0)
roomRemoteBot1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 10, 1)
roomRemoteBot1.addLineToObjectList(()=>new FlipWall({color:'white', state:'on'}), 'x', 10, 14, 4)
roomRemoteBot1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 10, 9)
roomRemoteBot1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 9, 8)
roomRemoteBot1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 14, 15, 9)

roomRemoteBot1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 0)
roomRemoteBot1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 1)
roomRemoteBot1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 8)
roomRemoteBot1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 9)
roomRemoteBot1.addLineToObjectList(()=>new FlipWall({color:'yellow', state:'on'}), 'y', 1, 3, 15)
roomRemoteBot1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 4, 9, 15)

roomRemoteBot1.objectList.push(({sprite:'wall', posX: 7, posY: 2, tags:['block']}))
roomRemoteBot1.objectList.push(({sprite:'wall', posX: 2, posY: 2, tags:['block']}))
roomRemoteBot1.objectList.push(({sprite:'wall', posX: 7, posY: 7, tags:['block']}))
roomRemoteBot1.objectList.push(({sprite:'wall', posX: 2, posY: 7, tags:['block']}))

roomRemoteBot1.objectList.push(new Lever({posX: 3, posY: 4, color:'white'}))
roomRemoteBot1.objectList.push(new RemoteBot({posX: 6, posY: 6}))
roomRemoteBot1.objectList.push(new Disc({color: 'yellow', posX: 13, posY: 7}))
roomRemoteBot1.objectList.push(new DiscScanner({color: 'yellow', posX: 11, posY: 7, state:'off'}))

//Needs simple room to introduce remoteBot picking up and ejecting discs
export const roomRemoteDisc = new Room({name:'roomRemoteDisc', playerStartPos:{posX: 0, posY:2}})

roomRemoteBot1.rightRoom = roomRemoteDisc
roomRemoteDisc.leftRoom = roomRemoteBot1

roomRemoteDisc.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 0)
roomRemoteDisc.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 5)
roomRemoteDisc.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 1, 4)
roomRemoteDisc.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 9)

roomRemoteDisc.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 4, 9, 0)
roomRemoteDisc.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 4, 9, 15)

roomRemoteDisc.objectList.push(new Lever({color:'blue', posX:3, posY:2}))
roomRemoteDisc.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 2, 5)
roomRemoteDisc.objectList.push(new Disc({color:'yellow', posX:7, posY:2}))
roomRemoteDisc.objectList.push(new DiscScanner({color:'yellow', posX:7, posY:2, state:'on'}))

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
export const roomRemoteWallShift = new Room({name:'roomRemoteWallShift', playerStartPos:{posX: 0, posY:2}})

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
export const roomRemotePushBox = new Room({name:'roomRemotePushBox', playerStartPos:{posX: 3, posY:0}})

roomRemoteWallShift.downRoom = roomRemotePushBox
roomRemotePushBox.upRoom = roomRemoteWallShift

roomRemotePushBox.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 1, 0)
roomRemotePushBox.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 4, 15, 0)
roomRemotePushBox.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 11, 15, 1)
roomRemotePushBox.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 14, 15, 2)
roomRemotePushBox.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 11, 15, 3)
roomRemotePushBox.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 11, 15, 4)
roomRemotePushBox.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 12, 15, 5)
roomRemotePushBox.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 9)

roomRemotePushBox.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 0)
roomRemotePushBox.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 5, 8, 1)
roomRemotePushBox.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 5, 8, 6)

roomRemotePushBox.objectList.push(new FlipWall({color:'yellow', posX:12, posY: 2, state:'off'}))
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

//something should come before this

//roomRemoteBot3; Use of box to shift robot position
export const roomRemoteBot3 = new Room({name:'roomRemoteBot3', playerStartPos:{posX: 0, posY:7}})

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
export const roomRemoteBot4 = new Room({name:'roomRemoteBot4', playerStartPos:{posX: 0, posY:7}})

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

