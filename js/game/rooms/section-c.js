import { Disc, DiscScanner, FlipWall, TeleportPad } from "../game-objects.js"
import { Room } from "./room-class.js"
import { roomRemoteBot4 } from "./section-b.js"

// introduces teleport pads
export const roomTeleport1 = new Room({name:'roomTeleport1', playerStartPos:{posX: 0, posY:4}})

roomRemoteBot4.rightRoom = roomTeleport1
roomTeleport1.leftRoom = roomRemoteBot4

roomTeleport1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 0)
roomTeleport1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 1)
roomTeleport1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 8, 15, 2)
roomTeleport1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 7, 7)
roomTeleport1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 8)
roomTeleport1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'x', 0, 15, 9)

roomTeleport1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 3, 0)
roomTeleport1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 5, 9, 0)
roomTeleport1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 2, 1)
roomTeleport1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 6, 9, 1)
roomTeleport1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 7)
roomTeleport1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 9, 8)
roomTeleport1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 3, 14)
roomTeleport1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 7, 9, 14)
roomTeleport1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 0, 4, 15)
roomTeleport1.addLineToObjectList(()=>({sprite:'wall', renderLayer:'wall', tags:['block']}), 'y', 6, 9, 15)

roomTeleport1.addLineToObjectList(()=>new FlipWall({color:'white', state:'off'}), 'y', 3, 5, 1)
roomTeleport1.objectList.push(new Disc({posX: 3, posY: 3, color:'white'}))
roomTeleport1.objectList.push(new DiscScanner({posX: 5, posY: 4, color:'white'}))
roomTeleport1.objectList.push(new Disc({posX: 3, posY: 5, color:'purple'}))

roomTeleport1.objectList.push(new TeleportPad({posX: 10, posY: 5, state:'off', color:'white'}))
roomTeleport1.objectList.push(new DiscScanner({posX: 12, posY: 5, color:'purple'}))
roomTeleport1.addLineToObjectList(()=>new FlipWall({color:'purple', state:'on'}), 'y', 4, 6, 14)