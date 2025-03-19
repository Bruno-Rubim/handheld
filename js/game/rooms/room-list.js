import { firstRoom, room2Discs, room2Levers, roomBoxPlates, roomDisc1, roomDisc2, roomDiscLever, roomPullBox, roomPushBox1, roomPushBox2 } from "./section-a.js"
import { roomRemoteBot1, roomRemoteBot3, roomRemoteBot4, roomRemoteDisc, roomRemotePushBox, roomRemoteWallShift } from "./section-b.js"
import { roomTeleport1, roomTeleport2 } from "./section-d.js"
import { roomConveyor1, roomConveyor2, roomConveyor3, roomConveyor4, roomPlatesBoxConv } from "./section-c.js"

export const debugRoom = roomConveyor4

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