import { DiscScanner, FlipWall, Disc, RemoteBot, Lever, PressurePlate, TeleportPad, Box, Conveyor } from "../game-objects.js";
import { Room } from "./room-class.js";
import { secDend } from "./section-d.js";

export const roomShoot1 = new Room({name:'roomShoot1', playerStartPos:{posX: 0, posY: 6}, loadObjects:()=>{
    localStorage.setItem('startedSectionE', 'yes')
    roomShoot1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 8, 0)
    roomShoot1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 7, 1)
    roomShoot1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 7, 2)
    roomShoot1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 7, 3)
    roomShoot1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 6, 7, 4)
    roomShoot1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 6, 7, 8)
    roomShoot1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 9)
    
    roomShoot1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 4, 0)
    roomShoot1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 8, 9, 0)
    roomShoot1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 3, 8)
    roomShoot1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 2, 9)
    roomShoot1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 2, 13)
    roomShoot1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 3, 14)
    roomShoot1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 8, 9, 14)
    roomShoot1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 15)
    
    roomShoot1.addLineToObjectList(()=>(new FlipWall({color:'red', state:'on'})), 'x', 10, 12, 1)
    roomShoot1.addLineToObjectList(()=>(new FlipWall({color:'red', state:'off'})), 'x', 9, 13, 3)

    roomShoot1.objectList.push(new Disc({color:'red', posX:11, posY:8}))
    roomShoot1.objectList.push(new DiscScanner({color:'red', posX:11, posY:8}))
}})
export const secEStart = roomShoot1

secDend.rightRoom = secEStart
secEStart.leftRoom = secDend


export const roomShoot2 = new Room({name:'roomShoot2', playerStartPos:{posX: 11, posY: 9}, loadObjects:()=>{
    roomShoot2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 0)
    roomShoot2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 1)
    roomShoot2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 2, 8, 2)
    roomShoot2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 2, 8, 4)
    roomShoot2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 8, 5)
    roomShoot2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 8, 6)
    roomShoot2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 8, 7)
    roomShoot2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 8, 8)
    roomShoot2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 9, 9)
    roomShoot2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 13, 15, 9)
    
    roomShoot2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 1, 0)
    roomShoot2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 5, 9, 0)
    roomShoot2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 14)
    roomShoot2.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 15)

    roomShoot2.addLineToObjectList(()=>(new FlipWall({color:'red', state:'off'})), 'y', 2, 4, 1)
    roomShoot2.addLineToObjectList(()=>(new Conveyor({color:'red', dir:'left'})), 'x', 2, 4, 3)
    roomShoot2.addLineToObjectList(()=>(new Conveyor({color:'red', dir:'right'})), 'x', 6, 8, 3)
    
    
    roomShoot2.objectList.push(new Lever({posX:12, posY:3, color:'red'}))
    roomShoot2.objectList.push(new Disc({posX:12, posY:7, color:'red'}))
}})

roomShoot1.upRoom = roomShoot2
roomShoot2.downRoom = roomShoot1