import { Box, Disc, DiscScanner, FlipWall, PressurePlate } from '../game-objects.js'
import { player } from '../player.js'
import { Room } from './room-class.js'
import { secAEnd } from './section-a.js'

//roomPushBox1 Introduces disc abilities; movable boxes and pressure plates
export const roomPushBox1 = new Room({name:'roomPushBox1', playerStartPos:{posX: 0, posY:5}, loadObjects(){
    localStorage.setItem('startedSectionB', 'yes')
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
}})
export const secBStart = roomPushBox1

secAEnd.rightRoom = roomPushBox1
roomPushBox1.leftRoom = secAEnd

//roomPushBox2 continues box and plate concept
export const roomPushBox2 = new Room({name:'roomPushBox2', playerStartPos:{posX: 0, posY:5}, loadObjects(){
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
}})

roomPushBox1.rightRoom = roomPushBox2
roomPushBox2.leftRoom = roomPushBox1

//roomPullBox; introduces ability to pull boxes and pressure plates
export const roomPullBox = new Room({name:'roomPullBox', playerStartPos:{posX: 12, posY:0}, loadObjects(){
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
}})

roomPushBox2.downRoom = roomPullBox
roomPullBox.upRoom = roomPushBox2

//roomBoxPlates
export const roomBoxPlates = new Room({name:'roomBoxPlates', playerStartPos:{posX: 0, posY:7}, loadObjects(){
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
}})
export const secBEnd = roomBoxPlates

roomPullBox.rightRoom = roomBoxPlates
roomBoxPlates.leftRoom = roomPullBox