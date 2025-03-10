import { preloadImg } from './image-store.js';

const sprites = [
    
    '/handheld/images/case-pc/case-pc.png',
    '/handheld/images/case-pc/circle-button-off.png',
    '/handheld/images/case-pc/circle-button-on.png',
    '/handheld/images/case-pc/cross-button-off.png',
    '/handheld/images/case-pc/cross-button-on.png',
    '/handheld/images/case-pc/down-button-off.png',
    '/handheld/images/case-pc/down-button-on.png',
    '/handheld/images/case-pc/left-button-off.png',
    '/handheld/images/case-pc/left-button-on.png',
    '/handheld/images/case-pc/right-button-off.png',
    '/handheld/images/case-pc/right-button-on.png',
    '/handheld/images/case-pc/screen-shine.png',
    '/handheld/images/case-pc/square-button-off.png',
    '/handheld/images/case-pc/square-button-on.png',
    '/handheld/images/case-pc/triangle-button-off.png',
    '/handheld/images/case-pc/triangle-button-on.png',
    '/handheld/images/case-pc/up-button-off.png',
    '/handheld/images/case-pc/up-button-on.png',

    '/handheld/images/game/background.png',
    '/handheld/images/game/box.png',
    '/handheld/images/game/disc-bot-left.png',
    '/handheld/images/game/disc-bot-right.png',
    '/handheld/images/game/disc-trap.png',
    '/handheld/images/game/drill-down.png',
    '/handheld/images/game/drill-left.png',
    '/handheld/images/game/drill-right.png',
    '/handheld/images/game/drill-up.png',
    '/handheld/images/game/floppy-green-item.png',
    '/handheld/images/game/floppy-green-selected.png',
    '/handheld/images/game/floppy-green-description.png',
    '/handheld/images/game/floppy-purple-description.png',
    '/handheld/images/game/floppy-red-description.png',
    '/handheld/images/game/inventory-frame.png',
    '/handheld/images/game/floppy-null-selected.png',
    '/handheld/images/game/floppy-purple-item.png',
    '/handheld/images/game/floppy-purple-selected.png',
    '/handheld/images/game/floppy-red-item.png',
    '/handheld/images/game/floppy-red-selected.png',
    '/handheld/images/game/floppy-yellow-item.png',
    '/handheld/images/game/floppy-yellow-selected.png',
    '/handheld/images/game/red-bricks-off.png',
    '/handheld/images/game/red-bricks-on.png',
    '/handheld/images/game/red-scan.png',
    '/handheld/images/game/remote-bot-left.png',
    '/handheld/images/game/remote-bot-right.png',
    '/handheld/images/game/teleport-pad.png',
    '/handheld/images/game/teleport-controls.png',
    '/handheld/images/game/wall.png',
    '/handheld/images/game/eject-disc-controls.png',
    '/handheld/images/game/drill-controls.png',
    '/handheld/images/game/white-scan.png',
    '/handheld/images/game/floppy-white-item.png',
    '/handheld/images/game/white-wall-on.png',
    '/handheld/images/game/floppy-white-selected.png',
    '/handheld/images/game/white-wall-off.png',
    '/handheld/images/game/background-debug.png',
    '/handheld/images/game/button-off-white.png',
    '/handheld/images/game/button-on-white.png',
    '/handheld/images/game/blue-wall-off.png',
    '/handheld/images/game/button-off-blue.png',
    '/handheld/images/game/blue-wall-on.png',
    '/handheld/images/game/button-on-blue.png',
    '/handheld/images/game/inventory-frame.png',
    '/handheld/images/game/green-scan.png',
    '/handheld/images/game/green-wall-on.png',
    '/handheld/images/game/push-box-controls.png',
    '/handheld/images/game/green-wall-off.png',
    '/handheld/images/game/disc-trap-on-white.png',
    '/handheld/images/game/disc-trap-off-white.png',
    '/handheld/images/game/yellow-scan.png',
    '/handheld/images/game/yellow-wall-on.png',
    '/handheld/images/game/move-remote-bot-controls.png',
    '/handheld/images/game/yellow-wall-off.png',
    '/handheld/images/game/plate-off-blue.png',
    '/handheld/images/game/plate-on-blue.png',
    '/handheld/images/game/plate-off-green.png',
    '/handheld/images/game/plate-on-green.png',
    '/handheld/images/game/plate-off-white.png',
    '/handheld/images/game/plate-on-white.png',
    '/handheld/images/game/pull-box-controls.png',
    '/handheld/images/game/remote-eject-disc-controls.png',
]

await Promise.all(
    sprites.map(preloadImg)
)
