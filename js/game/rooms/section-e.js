import { DiscScanner, FlipWall, Disc, RemoteBot, Lever, PressurePlate, TeleportPad, Box, Conveyor, Wall, Pole } from "../game-objects.js";
import { Room } from "./room-class.js";
import { secDend } from "./section-d.js";

export const roomShoot1 = new Room({name:'roomShoot1', playerStartPos:{posX: 0, posY: 6}, loadObjects:()=>{
    localStorage.setItem('startedSectionE', 'yes')
    roomShoot1.addLineToObjectList(()=>new Wall({}), 'x', 0, 8, 0)
    roomShoot1.addLineToObjectList(()=>new Wall({}), 'x', 0, 7, 1)
    roomShoot1.addLineToObjectList(()=>new Wall({}), 'x', 0, 7, 2)
    roomShoot1.addLineToObjectList(()=>new Wall({}), 'x', 0, 7, 3)
    roomShoot1.addLineToObjectList(()=>new Wall({}), 'x', 6, 7, 4)
    roomShoot1.addLineToObjectList(()=>new Wall({}), 'x', 6, 7, 8)
    roomShoot1.addLineToObjectList(()=>new Wall({}), 'x', 0, 15, 9)
    
    roomShoot1.addLineToObjectList(()=>new Wall({}), 'y', 0, 4, 0)
    roomShoot1.addLineToObjectList(()=>new Wall({}), 'y', 8, 9, 0)
    roomShoot1.addLineToObjectList(()=>new Wall({}), 'y', 0, 3, 8)
    roomShoot1.addLineToObjectList(()=>new Wall({}), 'y', 0, 2, 9)
    roomShoot1.addLineToObjectList(()=>new Wall({}), 'y', 0, 2, 13)
    roomShoot1.addLineToObjectList(()=>new Wall({}), 'y', 0, 3, 14)
    roomShoot1.addLineToObjectList(()=>new Wall({}), 'y', 8, 9, 14)
    roomShoot1.addLineToObjectList(()=>new Wall({}), 'y', 0, 9, 15)
    
    roomShoot1.addLineToObjectList(()=>(new FlipWall({color:'red', state:'on'})), 'x', 10, 12, 1)
    roomShoot1.addLineToObjectList(()=>(new FlipWall({color:'red', state:'off'})), 'x', 9, 13, 3)

    roomShoot1.objectList.push(new Disc({color:'red', posX:11, posY:8}))
    roomShoot1.objectList.push(new DiscScanner({color:'red', posX:11, posY:8}))
}})
export const secEStart = roomShoot1

secDend.rightRoom = secEStart
secEStart.leftRoom = secDend

export const roomShoot2 = new Room({name:'roomShoot2', playerStartPos:{posX: 11, posY: 9}, loadObjects:()=>{
    roomShoot2.addLineToObjectList(()=>new Wall({}), 'x', 7, 15, 0)
    roomShoot2.addLineToObjectList(()=>new Wall({}), 'x', 7, 15, 1)
    roomShoot2.addLineToObjectList(()=>new Wall({}), 'x', 6, 15, 2)
    roomShoot2.addLineToObjectList(()=>new Wall({}), 'x', 6, 8, 3)
    roomShoot2.addLineToObjectList(()=>new Wall({}), 'x', 6, 8, 4)
    roomShoot2.addLineToObjectList(()=>new Wall({}), 'x', 0, 8, 6)
    roomShoot2.addLineToObjectList(()=>new Wall({}), 'x', 0, 8, 7)
    roomShoot2.addLineToObjectList(()=>new Wall({}), 'x', 0, 8, 8)
    roomShoot2.addLineToObjectList(()=>new Wall({}), 'x', 0, 9, 9)
    roomShoot2.addLineToObjectList(()=>new Wall({}), 'x', 13, 15, 9)
    
    roomShoot2.addLineToObjectList(()=>new Wall({}), 'y', 0, 9, 0)
    roomShoot2.addLineToObjectList(()=>new Wall({}), 'y', 0, 9, 1)
    roomShoot2.addLineToObjectList(()=>new Wall({}), 'y', 0, 9, 2)
    roomShoot2.addLineToObjectList(()=>new Wall({}), 'y', 0, 9, 3)
    roomShoot2.addLineToObjectList(()=>new Wall({}), 'y', 2, 9, 4)
    roomShoot2.addLineToObjectList(()=>new Wall({}), 'y', 0, 9, 14)
    roomShoot2.addLineToObjectList(()=>new Wall({}), 'y', 0, 9, 15)

    roomShoot2.addLineToObjectList(()=>(new FlipWall({color:'red', state:'off'})), 'x', 4, 6, 1)
    roomShoot2.addLineToObjectList(()=>(new Conveyor({color:'red', dir:'up'})), 'y', 2, 4, 5)
    roomShoot2.addLineToObjectList(()=>(new Conveyor({color:'red', dir:'right'})), 'x', 6, 8, 5)
    
    roomShoot2.objectList.push(new Lever({posX:12, posY:5, color:'red'}))
    roomShoot2.objectList.push(new Disc({posX:11, posY:3, color:'red'}))
}})

roomShoot1.upRoom = roomShoot2
roomShoot2.downRoom = roomShoot1

export const roomShoot3 = new Room({name:'roomShoot3', playerStartPos:{posX: 5, posY: 9}, loadObjects:()=>{
    roomShoot3.addLineToObjectList(()=>new Wall({}), 'x', 0, 15, 0)
    roomShoot3.addLineToObjectList(()=>new Wall({}), 'x', 0, 3, 9)
    roomShoot3.addLineToObjectList(()=>new Wall({}), 'x', 0, 9, 4)
    roomShoot3.addLineToObjectList(()=>new Wall({}), 'x', 13, 15, 4)
    roomShoot3.addLineToObjectList(()=>new Wall({}), 'x', 0, 9, 5)
    roomShoot3.addLineToObjectList(()=>new Wall({}), 'x', 13, 15, 5)
    roomShoot3.addLineToObjectList(()=>new Wall({}), 'x', 0, 3, 6)
    roomShoot3.addLineToObjectList(()=>new Wall({}), 'x', 0, 3, 7)
    roomShoot3.addLineToObjectList(()=>new Wall({}), 'x', 0, 3, 8)
    roomShoot3.addLineToObjectList(()=>new Wall({}), 'x', 7, 15, 9)
    
    roomShoot3.addLineToObjectList(()=>new Wall({}), 'y', 0, 1, 15)
    roomShoot3.addLineToObjectList(()=>new Wall({}), 'y', 0, 9, 15)

    roomShoot3.addLineToObjectList(()=>(new FlipWall({color:'red', state:'off'})), 'y', 1, 3, 2)
    roomShoot3.addLineToObjectList(()=>(new FlipWall({color:'green', state:'on'})), 'y', 1, 3, 4)

    roomShoot3.addLineToObjectList(()=>(new FlipWall({color:'red', state:'on'})), 'x', 10, 12, 4)
    roomShoot3.addLineToObjectList(()=>(new FlipWall({color:'red', state:'on'})), 'x', 10, 12, 5)

    roomShoot3.objectList.push(new DiscScanner({posX:11, posY:1, color:'green'}))
    roomShoot3.objectList.push(new Disc({posX:11, posY:1, color:'green'}))
    roomShoot3.objectList.push(new Box({posX:13, posY:2, color:'red'}))
    roomShoot3.objectList.push(new DiscScanner({posX:11, posY:8, color:'red'}))
    roomShoot3.objectList.push(new Disc({posX:11, posY:8, color:'red'}))
    roomShoot3.objectList.push(new PressurePlate({posX:13, posY:7, color:'red'}))
}})

roomShoot2.upRoom = roomShoot3
roomShoot3.downRoom = roomShoot2

export const roomShoot4 = new Room({name:'roomShoot4', playerStartPos:{posX: 15, posY: 2}, loadObjects:()=>{
    roomShoot4.addLineToObjectList(()=>new Wall({}), 'x', 0, 15, 0)
    roomShoot4.addLineToObjectList(()=>new Wall({}), 'x', 0, 15, 8)
    roomShoot4.addLineToObjectList(()=>new Wall({}), 'x', 0, 15, 9)
    
    roomShoot4.addLineToObjectList(()=>new Wall({}), 'y', 0, 4, 0)
    roomShoot4.addLineToObjectList(()=>new Wall({}), 'y', 8, 9, 0)
    roomShoot4.addLineToObjectList(()=>new Wall({}), 'y', 0, 4, 1)
    roomShoot4.addLineToObjectList(()=>new Wall({}), 'y', 0, 4, 2)
    roomShoot4.addLineToObjectList(()=>new Wall({}), 'y', 4, 8, 8)
    roomShoot4.addLineToObjectList(()=>new Wall({}), 'y', 0, 1, 9)
    roomShoot4.addLineToObjectList(()=>new Wall({}), 'y', 3, 8, 9)
    roomShoot4.addLineToObjectList(()=>new Wall({}), 'y', 5, 8, 10)
    roomShoot4.addLineToObjectList(()=>new Wall({}), 'y', 5, 9, 14)
    roomShoot4.addLineToObjectList(()=>new Wall({}), 'y', 4, 9, 15)
    
    roomShoot4.objectList.push(new DiscScanner({posX:3, posY:2, color:'red'}))
    
    roomShoot4.addLineToObjectList(()=>(new FlipWall({color:'green', state:'on'})), 'y', 5, 7, 1)
    roomShoot4.addLineToObjectList(()=>(new FlipWall({color:'red', state:'on'})), 'y', 5, 7, 2)
    roomShoot4.addLineToObjectList(()=>(new FlipWall({color:'red', state:'off'})), 'y', 5, 7, 4)
    roomShoot4.objectList.push(new Conveyor({posX:3, posY:4, color:'white', dir:'up'}))
    roomShoot4.objectList.push(new Wall({posX:4, posY:4}))
    
    roomShoot4.addLineToObjectList(()=>(new Conveyor({color:'red', dir:'right'})), 'y', 1, 3, 8)
    roomShoot4.objectList.push(new Box({posX:9, posY:2}))

    roomShoot4.objectList.push(new Disc({posX:12, posY:2, color:'red'}))
    roomShoot4.objectList.push(new Disc({posX:12, posY:6, color:'green'}))
    roomShoot4.objectList.push(new DiscScanner({posX:6, posY:6, color:'green'}))
}})

roomShoot3.leftRoom = roomShoot4
roomShoot4.rightRoom = roomShoot3

export const roomShoot5 = new Room({name:'roomShoot5', playerStartPos:{posX: 15, posY: 6}, loadObjects:()=>{
    roomShoot5.addLineToObjectList(()=>new Wall({}), 'x', 0, 15, 0)
    roomShoot5.addLineToObjectList(()=>new Wall({}), 'x', 0, 15, 9)
    
    roomShoot5.addLineToObjectList(()=>new Wall({}), 'y', 0, 1, 0)
    roomShoot5.addLineToObjectList(()=>new Wall({}), 'y', 5, 9, 0)
    roomShoot5.addLineToObjectList(()=>new Wall({}), 'y', 0, 4, 15)
    roomShoot5.addLineToObjectList(()=>new Wall({}), 'y', 8, 9, 15)
}})

// roomShoot4.leftRoom = roomShoot5
// roomShoot5.rightRoom = roomShoot4

export const roomShoot6 = new Room({name:'roomShoot6', playerStartPos:{posX: 15, posY: 4}, loadObjects:()=>{
    roomShoot6.addLineToObjectList(()=>new Wall({}), 'x', 0, 15, 0)
    roomShoot6.addLineToObjectList(()=>new Wall({}), 'x', 0, 5, 9)
    roomShoot6.addLineToObjectList(()=>new Wall({}), 'x', 9, 15, 9)
    
    roomShoot6.addLineToObjectList(()=>new Wall({}), 'y', 0, 9, 0)
    roomShoot6.addLineToObjectList(()=>new Wall({}), 'y', 0, 1, 15)
    roomShoot6.addLineToObjectList(()=>new Wall({}), 'y', 5, 9, 15)

    roomShoot6.addLineToObjectList(()=>new Wall({}), 'y', 0, 3, 9)
    roomShoot6.addLineToObjectList(()=>new Wall({}), 'x', 9, 10, 3)
    roomShoot6.addLineToObjectList(()=>new Pole({color:'red', state:'on'}), 'x', 11, 13, 3)
    roomShoot6.addLineToObjectList(()=>new Wall({}), 'x', 14, 15, 3)
    
    roomShoot6.addLineToObjectList(()=>new Pole({color:'red', state:'off'}), 'x', 1, 3, 3)
    roomShoot6.objectList.push(new DiscScanner({posX:2, posY:2, color:'red'}))
    roomShoot6.objectList.push(new Disc({posX:2, posY:1, color:'red'}))
    roomShoot6.addLineToObjectList(()=>new Wall({}), 'y', 0, 3, 4)
    
    roomShoot6.objectList.push(new DiscScanner({posX:2, posY:7, color:'green'}))
    roomShoot6.objectList.push(new Disc({posX:2, posY:7, color:'green'}))
    roomShoot6.addLineToObjectList(()=>new Wall({}), 'y', 0, 3, 4)
    
    roomShoot6.objectList.push(new Box({posX:5, posY:5}))
    roomShoot6.objectList.push(new PressurePlate({posX:5, posY:5, color:'white'}))
    roomShoot6.objectList.push(new PressurePlate({posX:9, posY:5, color:'blue'}))
    
    roomShoot6.addLineToObjectList(()=>new Wall({}), 'y', 7, 9, 5)
    roomShoot6.addLineToObjectList(()=>new FlipWall({color:'green', state:'on'}), 'x', 5, 9, 6)
    roomShoot6.addLineToObjectList(()=>new Conveyor({color:'white', dir:'up'}), 'x', 6, 8, 7)
    roomShoot6.addLineToObjectList(()=>new Conveyor({color:'blue', dir:'up'}), 'x', 6, 8, 8)
    roomShoot6.addLineToObjectList(()=>new Wall({}), 'y', 7, 9, 9)
}})

roomShoot5.leftRoom = roomShoot6
roomShoot6.rightRoom = roomShoot5