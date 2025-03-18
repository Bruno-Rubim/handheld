//test room
export let testRoom = new Room({name:'testRoom', playerStartPos:{posX: 2, posY: 3}})
testRoom.rightRoom = null

testRoom.objectList.push(new Disc({color:'red', posX: 1, posY: 1,}))
testRoom.objectList.push(new Disc({color:'purple', posX: 2, posY: 1,}))
testRoom.objectList.push(new Disc({color:'green', posX: 3, posY: 1}))
testRoom.objectList.push(new Disc({color:'yellow', posX: 4, posY: 1}))
testRoom.objectList.push(new Disc({color:'white', posX: 5, posY: 1}))

testRoom.objectList.push(new Box({posX: 9, posY: 6}))

testRoom.objectList.push(new DiscTrap({posX: 11, posY: 6}))

testRoom.objectList.push(new PressurePlate({color: 'green', posX: 3, posY: 6,}))
testRoom.objectList.push(new DiscScanner({color: 'red', posX: 2, posY: 6,}))
testRoom.objectList.push(new Lever({color: 'white', posX: 9, posY: 2,}))
testRoom.objectList.push(new PressurePlate({color: 'white', posX: 4, posY: 4,}))
testRoom.objectList.push(new DiscScanner({color: 'white', posX: 4, posY: 6,}))
testRoom.objectList.push(new Lever({posX: 5, posY: 6,color: 'blue'}))
testRoom.objectList.push(new TeleportPad({posX: 6, posY: 6, color: 'white'}))
testRoom.objectList.push(new RemoteBot({posX: 7, posY: 6, disc:null}))

testRoom.objectList.push(new Conveyor({posX: 6, posY: 3, dir:'right'}))
testRoom.objectList.push(new Conveyor({posX: 7, posY: 3, dir:'down'}))
testRoom.objectList.push(new Conveyor({posX: 7, posY: 4, dir:'left'}))
testRoom.objectList.push(new Conveyor({posX: 6, posY: 4, dir:'up'}))


testRoom.addLineToObjectList(()=>new FlipWall({color:'white', state:'on'}), 'y', 2, 7, 12)
// testRoom.addLineToObjectList(()=>new FlipWall({color:'red', state:'on', layer:'player'}), 'y', 2, 7, 13)
// testRoom.addLineToObjectList(()=>new FlipWall({color:'blue', state:'on', layer:'player'}), 'y', 2, 7, 14)
// testRoom.addLineToObjectList(()=>new FlipWall({color:'green', state:'on', layer:'player'}), 'y', 2, 7, 15)

testRoom.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 0)
testRoom.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 9)
testRoom.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 0)
testRoom.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 2, 15)
testRoom.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 7, 9, 15)