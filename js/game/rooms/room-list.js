import { firstRoom, room2Levers, roomDisc1, roomDisc2, roomDiscLever, room2Discs } from "./section-a.js"
import { roomBoxPlates, roomPullBox, roomPushBox1, roomPushBox2 } from "./section-b.js"
import { roomRemoteLever, roomRemoteBoxShift, roomRemoteSelfTrap, roomRemoteDisc, roomRemotePushBox, roomRemoteWallShift } from "./section-c.js"
import { roomConveyor1, roomConveyorDisc, roomConveyor3, roomConveyorTeleport, roomTeleport1, roomTeleport2, roomTeleportRemoteBot } from "./section-d.js"
import { roomShoot1, roomShoot2, roomShoot3, roomShoot4, roomShoot5, roomShoot6 } from "./section-e.js"
import { testRoom } from "./test-room.js"

export const debugRoom = roomShoot4

export const sectionARooms = [
    firstRoom,
    room2Levers,
    roomDisc1,
    roomDisc2,
    roomDiscLever,
    room2Discs,
]
export const sectionBRooms = [
    roomPushBox1,
    roomPushBox2,
    roomPullBox,
    roomBoxPlates,
]
export const sectionCRooms = [
    roomRemoteLever,
    roomRemoteDisc,
    roomRemoteWallShift,
    roomRemotePushBox,
    roomRemoteBoxShift,
    roomRemoteSelfTrap,
]
export const sectionDRooms = [
    roomTeleport1,
    roomTeleport2,
    roomTeleportRemoteBot,
    roomConveyor1,
    roomConveyorDisc,
    roomConveyor3,
    roomConveyorTeleport,
]
export const sectionERooms = [
    roomShoot1,
    roomShoot2,
    roomShoot3,
    roomShoot4,
    roomShoot5,
    roomShoot6,
]

export const allRooms = {
    //A
    [firstRoom.name]: firstRoom,
    [room2Levers.name]: room2Levers,
    [roomDisc1.name]: roomDisc1,
    [roomDisc2.name]: roomDisc2,
    [roomDiscLever.name]: roomDiscLever,
    [room2Discs.name]: room2Discs,
    //B
    [roomPushBox1.name]: roomPushBox1,
    [roomPushBox2.name]: roomPushBox2,
    [roomPullBox.name]: roomPullBox,
    [roomBoxPlates.name]: roomBoxPlates,
    //C
    [roomRemoteLever.name]: roomRemoteLever,
    [roomRemoteDisc.name]: roomRemoteDisc,
    [roomRemoteWallShift.name]: roomRemoteWallShift,
    [roomRemotePushBox.name]: roomRemotePushBox,
    [roomRemoteBoxShift.name]: roomRemoteBoxShift,
    [roomRemoteSelfTrap.name]: roomRemoteSelfTrap,
    //D
    [roomTeleport1.name]: roomTeleport1,
    [roomTeleport2.name]: roomTeleport2,
    [roomTeleportRemoteBot.name]: roomTeleportRemoteBot,
    [roomConveyor1.name]: roomConveyor1,
    [roomConveyorDisc.name]: roomConveyorDisc,
    [roomConveyorTeleport.name]: roomConveyorTeleport,
    //E
    [roomShoot1.name]: roomShoot1,
    [roomShoot2.name]: roomShoot2,
    [roomShoot3.name]: roomShoot3,
    [roomShoot4.name]: roomShoot4,
    [roomShoot5.name]: roomShoot5,
    [roomShoot6.name]: roomShoot6,
}