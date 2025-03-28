import { firstRoom, room2Levers, roomDisc1, roomDisc2, roomDiscLever, room2Discs } from "./section-a.js"
import { roomBoxPlates, roomPullBox, roomPushBox1, roomPushBox2 } from "./section-b.js"
import { roomRemoteBot1, roomRemoteBot3, roomRemoteBot4, roomRemoteDisc, roomRemotePushBox, roomRemoteWallShift } from "./section-c.js"
import { roomConveyor1, roomConveyor2, roomConveyor3, roomConveyorTeleport, roomTeleport1, roomTeleport2, roomTeleport3 } from "./section-d.js"
import { testRoom } from "./test-room.js"

export const debugRoom = testRoom

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
    roomRemoteBot1,
    roomRemoteDisc,
    roomRemoteWallShift,
    roomRemotePushBox,
    roomRemoteBot3,
    roomRemoteBot4,
]
export const sectionDRooms = [
    roomTeleport1,
    roomTeleport2,
    roomTeleport3,
    roomConveyor1,
    roomConveyor2,
    roomConveyor3,
    roomConveyorTeleport,
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
    [roomRemoteBot1.name]: roomRemoteBot1,
    [roomRemoteDisc.name]: roomRemoteDisc,
    [roomRemoteWallShift.name]: roomRemoteWallShift,
    [roomRemotePushBox.name]: roomRemotePushBox,
    [roomRemoteBot3.name]: roomRemoteBot3,
    [roomRemoteBot4.name]: roomRemoteBot4,
    //D
    [roomTeleport1.name]: roomTeleport1,
    [roomTeleport2.name]: roomTeleport2,
    [roomTeleport3.name]: roomTeleport3,
    [roomConveyor1.name]: roomConveyor1,
    [roomConveyor2.name]: roomConveyor2,
    [roomConveyorTeleport.name]: roomConveyorTeleport,
}