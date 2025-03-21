import { firstRoom, room2Levers, roomDisc1, roomDisc2, roomDiscLever, room2Discs } from "./section-a.js"
import { roomBoxPlates, roomPullBox, roomPushBox1, roomPushBox2 } from "./section-b.js"
import { roomRemoteBot1, roomRemoteBot3, roomRemoteBot4, roomRemoteDisc, roomRemotePushBox, roomRemoteWallShift } from "./section-c.js"
import { roomConveyor1, roomConveyor2, roomConveyor3, roomConveyor4, roomPlatesBoxConv } from "./section-d.js"
import { roomTeleport1, roomTeleport2 } from "./section-e.js"

export const debugRoom = roomPlatesBoxConv

export const sectionARooms = [
    firstRoom,
    room2Levers,
    roomDisc1,
    roomDisc2,
    roomDiscLever,
    room2Discs,
    roomPushBox1,
    roomPushBox2,
    roomPullBox,
    roomBoxPlates,
]
export const sectionBRooms = [
    roomRemoteBot1,
    roomRemoteDisc,
    roomRemoteWallShift,
    roomRemotePushBox,
    roomRemoteBot3,
    roomRemoteBot4,
]
export const sectionCRooms = [
    roomConveyor1,
    roomConveyor2,
    roomConveyor3,
    roomConveyor4,
    roomPlatesBoxConv,
]
export const sectionDRooms = [
    roomTeleport1,
    roomTeleport2,
]

export const allRooms = {
    //A
    [firstRoom.name]: firstRoom,
    [room2Levers.name]: room2Levers,
    [roomDisc1.name]: roomDisc1,
    [roomDisc2.name]: roomDisc2,
    [roomDiscLever.name]: roomDiscLever,
    [room2Discs.name]: room2Discs,
    [roomPushBox1.name]: roomPushBox1,
    [roomPushBox2.name]: roomPushBox2,
    [roomPullBox.name]: roomPullBox,
    [roomBoxPlates.name]: roomBoxPlates,
    //B
    [roomRemoteBot1.name]: roomRemoteBot1,
    [roomRemoteDisc.name]: roomRemoteDisc,
    [roomRemoteWallShift.name]: roomRemoteWallShift,
    [roomRemotePushBox.name]: roomRemotePushBox,
    [roomRemoteBot3.name]: roomRemoteBot3,
    [roomRemoteBot4.name]: roomRemoteBot4,
    //C
    [roomConveyor1.name]: roomConveyor1,
    [roomConveyor2.name]: roomConveyor2,
    [roomConveyor3.name]: roomConveyor3,
    [roomConveyor4.name]: roomConveyor4,
    [roomPlatesBoxConv.name]: roomPlatesBoxConv,
    //D
    [roomTeleport1.name]: roomTeleport1,
    [roomTeleport2.name]: roomTeleport2,
}