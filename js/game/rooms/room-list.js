import { firstRoom, room2Discs, room2Levers, roomBoxPlates, roomDisc1, roomDisc2, roomDiscLever, roomPullBox, roomPushBox1, roomPushBox2 } from "./section-a.js"
import { roomRemoteBot1, roomRemoteBot3, roomRemoteBot4, roomRemoteDisc, roomRemotePushBox, roomRemoteWallShift } from "./section-b.js"
import { roomTeleport1 } from "./section-c.js"
import { roomConveyor1, roomConveyor2, roomPlatesBoxConv } from "./section-d.js"

export const debugRoom = roomTeleport1

export const allRooms = {
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
    [roomConveyor1.name]: roomConveyor1,
    [roomConveyor2.name]: roomConveyor2, 
    [roomPlatesBoxConv.name]: roomPlatesBoxConv, 
    [roomRemoteBot1.name]: roomRemoteBot1, 
    [roomRemoteDisc.name]: roomRemoteDisc, 
    [roomRemoteWallShift.name]: roomRemoteWallShift, 
    [roomRemotePushBox.name]: roomRemotePushBox, 
    [roomRemoteBot3.name]: roomRemoteBot3, 
    [roomRemoteBot4.name]: roomRemoteBot4, 
    [roomTeleport1.name]: roomTeleport1,
}