import { DiscScanner, FlipWall, Disc, RemoteBot, Lever, PressurePlate, TeleportPad, Box, Conveyor, Wall } from "../game-objects.js";
import { Room } from "./room-class.js";
import { secBEnd } from "./section-b.js";

//roomRemoteLever; Introduces remoteBot
export const roomRemoteLever = new Room({name:'roomRemoteBot', playerStartPos:{posX: 12, posY:9}, loadObjects(){
    localStorage.setItem('startedSectionC', 'yes')
    roomRemoteLever.addLineToObjectList(()=>new Wall({}), 'x', 0, 15, 0)
    roomRemoteLever.addLineToObjectList(()=>new Wall({}), 'x', 0, 10, 1)
    roomRemoteLever.addLineToObjectList(()=>new FlipWall({color:'white', state:'on'}), 'x', 10, 14, 4)
    roomRemoteLever.addLineToObjectList(()=>new Wall({}), 'x', 0, 10, 9)
    roomRemoteLever.addLineToObjectList(()=>new Wall({}), 'x', 0, 9, 8)
    roomRemoteLever.addLineToObjectList(()=>new Wall({}), 'x', 14, 15, 9)

    roomRemoteLever.addLineToObjectList(()=>new Wall({}), 'y', 0, 9, 0)
    roomRemoteLever.addLineToObjectList(()=>new Wall({}), 'y', 0, 9, 1)
    roomRemoteLever.addLineToObjectList(()=>new Wall({}), 'y', 0, 9, 8)
    roomRemoteLever.addLineToObjectList(()=>new Wall({}), 'y', 0, 9, 9)
    roomRemoteLever.addLineToObjectList(()=>new FlipWall({color:'yellow', state:'on'}), 'y', 1, 3, 15)
    roomRemoteLever.addLineToObjectList(()=>new Wall({}), 'y', 4, 9, 15)

    roomRemoteLever.objectList.push(new Wall({posX: 7, posY: 2}))
    roomRemoteLever.objectList.push(new Wall({posX: 2, posY: 2}))
    roomRemoteLever.objectList.push(new Wall({posX: 7, posY: 7}))
    roomRemoteLever.objectList.push(new Wall({posX: 2, posY: 7}))

    roomRemoteLever.objectList.push(new Lever({posX: 3, posY: 4, color:'white'}))
    roomRemoteLever.objectList.push(new RemoteBot({posX: 6, posY: 6}))
    roomRemoteLever.objectList.push(new Disc({color: 'yellow', posX: 13, posY: 7}))
    roomRemoteLever.objectList.push(new DiscScanner({color: 'yellow', posX: 11, posY: 7, state:'off'}))
}})
export const secCStart = roomRemoteLever

secBEnd.upRoom = roomRemoteLever
roomRemoteLever.downRoom = secBEnd

//Needs simple room to introduce remoteBot picking up and ejecting discs
export const roomRemoteDisc = new Room({name:'roomRemoteDisc', playerStartPos:{posX: 0, posY:2}, loadObjects:()=>{
    roomRemoteDisc.addLineToObjectList(()=>new Wall({}), 'x', 0, 15, 0)
    roomRemoteDisc.addLineToObjectList(()=>new Wall({}), 'x', 0, 15, 5)
    roomRemoteDisc.addLineToObjectList(()=>new Wall({}), 'x', 0, 1, 4)
    roomRemoteDisc.addLineToObjectList(()=>new Wall({}), 'x', 0, 15, 9)
    
    roomRemoteDisc.addLineToObjectList(()=>new Wall({}), 'y', 4, 9, 0)
    roomRemoteDisc.addLineToObjectList(()=>new Wall({}), 'y', 4, 9, 15)

    roomRemoteDisc.objectList.push(new Lever({color:'blue', posX:3, posY:2}))
    roomRemoteDisc.addLineToObjectList(()=>new Wall({}), 'y', 0, 2, 5)
    roomRemoteDisc.objectList.push(new Disc({color:'yellow', posX:7, posY:2}))
    roomRemoteDisc.objectList.push(new DiscScanner({color:'yellow', posX:7, posY:2, state:'on'}))

    roomRemoteDisc.addLineToObjectList(()=>new Wall({}), 'x', 10, 11, 1)
    roomRemoteDisc.addLineToObjectList(()=>new FlipWall({color:'yellow', state:'off'}), 'y', 2, 3, 10)
    roomRemoteDisc.addLineToObjectList(()=>new FlipWall({color:'white', state:'on'}), 'y', 2, 3, 11)
    roomRemoteDisc.addLineToObjectList(()=>new Wall({}), 'x', 10, 11, 4)

    roomRemoteDisc.objectList.push(new Disc({color:'white', posX:2, posY:7}))
    roomRemoteDisc.addLineToObjectList(()=>new FlipWall({color:'blue', state:'off'}), 'y', 6, 8, 4)
    roomRemoteDisc.objectList.push(new RemoteBot({posX:6, posY:7}))
    roomRemoteDisc.addLineToObjectList(()=>new FlipWall({color:'blue', state:'on'}), 'y', 6, 8, 8)
    roomRemoteDisc.addLineToObjectList(()=>new FlipWall({color:'blue', state:'off'}), 'y', 6, 8, 11)
    roomRemoteDisc.objectList.push(new DiscScanner({color:'white', posX:13, posY:7, state:'off'}))
}})

roomRemoteLever.rightRoom = roomRemoteDisc
roomRemoteDisc.leftRoom = roomRemoteLever

// roomRemoteWallShift; Uses wall to shift remoteBot's position
export const roomRemoteWallShift = new Room({name:'roomRemoteWallShift', playerStartPos:{posX: 0, posY:2}, loadObjects:()=>{
    roomRemoteDisc.rightRoom = roomRemoteWallShift
    roomRemoteWallShift.leftRoom = roomRemoteDisc

    roomRemoteWallShift.addLineToObjectList(()=>new Wall({}), 'x', 0, 15, 0)
    roomRemoteWallShift.addLineToObjectList(()=>new Wall({}), 'x', 5, 15, 9)
    roomRemoteWallShift.addLineToObjectList(()=>new Wall({}), 'x', 0, 1, 9)

    roomRemoteWallShift.addLineToObjectList(()=>new Wall({}), 'y', 4, 9, 0)
    roomRemoteWallShift.addLineToObjectList(()=>new Wall({}), 'y', 7, 9, 1)
    roomRemoteWallShift.addLineToObjectList(()=>new Wall({}), 'y', 7, 9, 4)
    roomRemoteWallShift.addLineToObjectList(()=>new Wall({}), 'y', 0, 9, 15)

    roomRemoteWallShift.addLineToObjectList(()=>new FlipWall({color:'yellow', state:'on'}), 'x', 2, 3, 8)
    roomRemoteWallShift.addLineToObjectList(()=>new FlipWall({color:'green', state:'on'}), 'x', 2, 3, 7)

    roomRemoteWallShift.objectList.push(new DiscScanner({posX:9, posY: 7, color:'yellow', state:'off'}))
    roomRemoteWallShift.objectList.push(new Lever({posX:9, posY: 4, color:'white'}))
    roomRemoteWallShift.objectList.push(new RemoteBot({posX:9, posY: 2}))
    roomRemoteWallShift.objectList.push(new Disc({posX:5, posY: 2, color:'yellow'}))

    roomRemoteWallShift.addLineToObjectList(()=>new FlipWall({color:'white', state:'on'}), 'y', 7, 8, 11)
    roomRemoteWallShift.addLineToObjectList(()=>new Wall({}), 'y', 1, 6, 11)
    roomRemoteWallShift.addLineToObjectList(()=>new FlipWall({color:'white', state:'off'}), 'x', 12, 14, 5)
    roomRemoteWallShift.addLineToObjectList(()=>new FlipWall({color:'white', state:'on'}), 'x', 12, 14, 3)
    roomRemoteWallShift.objectList.push(new PressurePlate({posX:13, posY: 1, color:'green'}))
}})

roomRemoteDisc.rightRoom = roomRemoteWallShift
roomRemoteWallShift.leftRoom = roomRemoteDisc

//roomRemotePushBox; Introduces RemoteBot using disc ability
export const roomRemotePushBox = new Room({name:'roomRemotePushBox', playerStartPos:{posX: 3, posY:0}, loadObjects:()=>{
    roomRemotePushBox.addLineToObjectList(()=>new Wall({}), 'x', 0, 1, 0)
    roomRemotePushBox.addLineToObjectList(()=>new Wall({}), 'x', 4, 15, 0)
    roomRemotePushBox.addLineToObjectList(()=>new Wall({}), 'x', 11, 15, 1)
    roomRemotePushBox.addLineToObjectList(()=>new Wall({}), 'x', 14, 15, 2)
    roomRemotePushBox.addLineToObjectList(()=>new Wall({}), 'x', 11, 15, 3)
    roomRemotePushBox.addLineToObjectList(()=>new Wall({}), 'x', 11, 15, 4)
    roomRemotePushBox.addLineToObjectList(()=>new Wall({}), 'x', 12, 15, 5)
    roomRemotePushBox.addLineToObjectList(()=>new Wall({}), 'x', 0, 15, 9)

    roomRemotePushBox.addLineToObjectList(()=>new Wall({}), 'y', 0, 9, 0)
    roomRemotePushBox.addLineToObjectList(()=>new Wall({}), 'y', 5, 8, 1)
    roomRemotePushBox.addLineToObjectList(()=>new Wall({}), 'y', 5, 8, 6)

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
}})

roomRemoteWallShift.downRoom = roomRemotePushBox
roomRemotePushBox.upRoom = roomRemoteWallShift

//something should come before this

//roomRemoteBot3; Use of box to shift robot position
export const roomRemoteBoxShift = new Room({name:'roomRemoteBot3', playerStartPos:{posX: 0, posY:7}, loadObjects:()=>{
    roomRemoteBoxShift.addLineToObjectList(()=>new Wall({}), 'x', 0, 15, 0)
    roomRemoteBoxShift.addLineToObjectList(()=>new Wall({}), 'x', 0, 15, 4)
    roomRemoteBoxShift.addLineToObjectList(()=>new Wall({}), 'x', 0, 15, 9)

    roomRemoteBoxShift.addLineToObjectList(()=>new Wall({}), 'y', 0, 5, 0)
    roomRemoteBoxShift.addLineToObjectList(()=>new Wall({}), 'y', 0, 3, 1)
    roomRemoteBoxShift.addLineToObjectList(()=>new Wall({}), 'y', 0, 3, 12)
    roomRemoteBoxShift.addLineToObjectList(()=>new Wall({}), 'y', 0, 3, 13)
    roomRemoteBoxShift.addLineToObjectList(()=>new Wall({}), 'y', 0, 3, 14)
    roomRemoteBoxShift.addLineToObjectList(()=>new Wall({}), 'y', 0, 4, 15)
    roomRemoteBoxShift.addLineToObjectList(()=>new Wall({}), 'y', 8, 9, 15)

    roomRemoteBoxShift.objectList.push(new RemoteBot({posX: 3, posY: 2}))
    roomRemoteBoxShift.addLineToObjectList(()=>new FlipWall({color:'white', state:'on'}), 'y', 1, 3, 5)
    roomRemoteBoxShift.objectList.push(new PressurePlate({color:'blue', posX: 11, posY: 2}))

    roomRemoteBoxShift.objectList.push(new DiscScanner({posX:3, posY: 7, color:'yellow', state:'on'}))
    roomRemoteBoxShift.objectList.push(new Disc({posX:3, posY: 7, color:'yellow'}))

    roomRemoteBoxShift.objectList.push(new PressurePlate({color:'white', posX: 9, posY: 8}))
    roomRemoteBoxShift.objectList.push(new DiscScanner({color:'green', posX: 9, posY: 5}))

    roomRemoteBoxShift.objectList.push(new Box({posX: 7, posY: 7}))
    roomRemoteBoxShift.objectList.push(new Disc({posX:7, posY: 6, color:'green'}))

    roomRemoteBoxShift.addLineToObjectList(()=>new FlipWall({color:'white', state:'on'}), 'y', 5, 8, 12)
    roomRemoteBoxShift.addLineToObjectList(()=>new FlipWall({color:'green', state:'on'}), 'y', 5, 8, 13)
    roomRemoteBoxShift.addLineToObjectList(()=>new FlipWall({color:'blue', state:'on'}), 'y', 5, 8, 14)
    roomRemoteBoxShift.addLineToObjectList(()=>new FlipWall({color:'yellow', state:'off'}), 'y', 5, 7, 15)
}})

roomRemotePushBox.rightRoom = roomRemoteBoxShift
roomRemoteBoxShift.leftRoom = roomRemotePushBox

//roomRemoteBot4 
export const roomRemoteSelfTrap = new Room({name:'roomRemoteBot4', playerStartPos:{posX: 0, posY:6}, loadObjects:()=>{
    roomRemoteSelfTrap.addLineToObjectList(()=>new Wall({}), 'x', 0, 15, 0)
    roomRemoteSelfTrap.addLineToObjectList(()=>new Wall({}), 'x', 11, 15, 5)
    roomRemoteSelfTrap.addLineToObjectList(()=>new Wall({}), 'x', 11, 15, 3)
    roomRemoteSelfTrap.addLineToObjectList(()=>new Wall({}), 'x', 0, 15, 9)

    roomRemoteSelfTrap.addLineToObjectList(()=>new Wall({}), 'y', 0, 4, 0)
    roomRemoteSelfTrap.addLineToObjectList(()=>new Wall({}), 'y', 8, 9, 0)
    roomRemoteSelfTrap.addLineToObjectList(()=>new Wall({}), 'y', 0, 4, 4)
    roomRemoteSelfTrap.addLineToObjectList(()=>new Wall({}), 'y', 0, 3, 15)
    roomRemoteSelfTrap.addLineToObjectList(()=>new Wall({}), 'y', 6, 9, 15)

    roomRemoteSelfTrap.objectList.push(new PressurePlate({color:'white', posX: 2, posY: 2}))
    roomRemoteSelfTrap.addLineToObjectList(()=>new FlipWall({color:'yellow', state:'off'}), 'x', 1, 3, 4)
    
    roomRemoteSelfTrap.objectList.push(new DiscScanner({color: 'yellow', posX: 7, posY: 4}))
    roomRemoteSelfTrap.objectList.push(new Wall({posX:7, posY:5}))
    roomRemoteSelfTrap.objectList.push(new Wall({posX:8, posY:4}))
    roomRemoteSelfTrap.objectList.push(new Disc({color: 'yellow', posX: 8, posY: 5}))
    
    roomRemoteSelfTrap.objectList.push(new Box({posX: 4, posY: 7}))
    roomRemoteSelfTrap.objectList.push(new Disc({color: 'green', posX: 7, posY: 7}))
    
    roomRemoteSelfTrap.addLineToObjectList(()=>new FlipWall({color:'white', state:'off'}), 'y', 1, 2, 11)
    roomRemoteSelfTrap.addLineToObjectList(()=>new FlipWall({color:'green', state:'on'}), 'y', 1, 2, 12)
    roomRemoteSelfTrap.objectList.push(new RemoteBot({posX: 13, posY: 2}))

    roomRemoteSelfTrap.addLineToObjectList(()=>new FlipWall({color:'green', state:'off'}), 'y', 6, 8, 11)
    roomRemoteSelfTrap.objectList.push(new DiscScanner({color: 'green', posX: 13, posY: 7, state:'off'}))

    roomRemoteSelfTrap.objectList.push(new FlipWall({color:'white', state:'on', posX:11, posY:4}))
    roomRemoteSelfTrap.objectList.push(new FlipWall({color:'yellow', state:'on', posX:12, posY:4}))
    roomRemoteSelfTrap.objectList.push(new FlipWall({color:'green', state:'on', posX:13, posY:4}))
}})

export const secCEnd = roomRemoteSelfTrap

roomRemoteBoxShift.rightRoom = roomRemoteSelfTrap
roomRemoteSelfTrap.leftRoom = roomRemoteBoxShift
