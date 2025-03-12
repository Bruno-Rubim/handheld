class Sprite {
	constructor(src) {
		this.src = src
		this.img = new Image()
	}
	load() {
		const { src, img } = this
		return new Promise((done, fail) => {
			img.onload = () => done(img)
			img.onerror = fail
			img.src = src
		})
	}
}

const sprites = {
	case_pc: new Sprite('./images/case-pc/case-pc.png'),
	circle_button_off: new Sprite('./images/case-pc/circle-button-off.png'),
	circle_button_on: new Sprite('./images/case-pc/circle-button-on.png'),
	cross_button_off: new Sprite('./images/case-pc/cross-button-off.png'),
	cross_button_on: new Sprite('./images/case-pc/cross-button-on.png'),
	down_button_off: new Sprite('./images/case-pc/down-button-off.png'),
	down_button_on: new Sprite('./images/case-pc/down-button-on.png'),
	left_button_off: new Sprite('./images/case-pc/left-button-off.png'),
	left_button_on: new Sprite('./images/case-pc/left-button-on.png'),
	right_button_off: new Sprite('./images/case-pc/right-button-off.png'),
	right_button_on: new Sprite('./images/case-pc/right-button-on.png'),
	screen_shine: new Sprite('./images/case-pc/screen-shine.png'),
	square_button_off: new Sprite('./images/case-pc/square-button-off.png'),
	square_button_on: new Sprite('./images/case-pc/square-button-on.png'),
	triangle_button_off: new Sprite('./images/case-pc/triangle-button-off.png'),
	triangle_button_on: new Sprite('./images/case-pc/triangle-button-on.png'),
	up_button_off: new Sprite('./images/case-pc/up-button-off.png'),
	up_button_on: new Sprite('./images/case-pc/up-button-on.png'),
	background: new Sprite('./images/game/background.png'),
	box: new Sprite('./images/game/box.png'),
	disc_bot_left: new Sprite('./images/game/disc-bot-left.png'),
	disc_bot_right: new Sprite('./images/game/disc-bot-right.png'),
	disc_trap: new Sprite('./images/game/disc-trap.png'),
	drill_down: new Sprite('./images/game/drill-down.png'),
	drill_left: new Sprite('./images/game/drill-left.png'),
	drill_right: new Sprite('./images/game/drill-right.png'),
	drill_up: new Sprite('./images/game/drill-up.png'),
	floppy_green_item: new Sprite('./images/game/floppy-green-item.png'),
	floppy_green_selected: new Sprite('./images/game/floppy-green-selected.png'),
	floppy_green_description: new Sprite('./images/game/floppy-green-description.png'),
	floppy_purple_description: new Sprite('./images/game/floppy-purple-description.png'),
	floppy_red_description: new Sprite('./images/game/floppy-red-description.png'),
	inventory_frame: new Sprite('./images/game/inventory-frame.png'),
	floppy_null_selected: new Sprite('./images/game/floppy-null-selected.png'),
	floppy_purple_item: new Sprite('./images/game/floppy-purple-item.png'),
	floppy_purple_selected: new Sprite('./images/game/floppy-purple-selected.png'),
	floppy_red_item: new Sprite('./images/game/floppy-red-item.png'),
	floppy_red_selected: new Sprite('./images/game/floppy-red-selected.png'),
	floppy_yellow_item: new Sprite('./images/game/floppy-yellow-item.png'),
	floppy_yellow_selected: new Sprite('./images/game/floppy-yellow-selected.png'),
	red_bricks_off: new Sprite('./images/game/red-bricks-off.png'),
	red_bricks_on: new Sprite('./images/game/red-bricks-on.png'),
	scan_red: new Sprite('./images/game/scan-red.png'),
	remote_bot_left: new Sprite('./images/game/remote-bot-left.png'),
	remote_bot_right: new Sprite('./images/game/remote-bot-right.png'),
	teleport_pad: new Sprite('./images/game/teleport-pad.png'),
	teleport_controls: new Sprite('./images/game/teleport-controls.png'),
	wall: new Sprite('./images/game/wall.png'),
	eject_disc_controls: new Sprite('./images/game/eject-disc-controls.png'),
	drill_controls: new Sprite('./images/game/drill-controls.png'),
	scan_white: new Sprite('./images/game/scan-white.png'),
	floppy_white_item: new Sprite('./images/game/floppy-white-item.png'),
	white_wall_on: new Sprite('./images/game/white-wall-on.png'),
	floppy_white_selected: new Sprite('./images/game/floppy-white-selected.png'),
	white_wall_off: new Sprite('./images/game/white-wall-off.png'),
	background_debug: new Sprite('./images/game/background-debug.png'),
	button_off_white: new Sprite('./images/game/button-off-white.png'),
	button_on_white: new Sprite('./images/game/button-on-white.png'),
	button_off_blue: new Sprite('./images/game/button-off-blue.png'),
	button_on_blue: new Sprite('./images/game/button-on-blue.png'),
	button_off_green: new Sprite('./images/game/button-off-green.png'),
	button_on_green: new Sprite('./images/game/button-on-green.png'),
	blue_wall_off: new Sprite('./images/game/blue-wall-off.png'),
	blue_wall_on: new Sprite('./images/game/blue-wall-on.png'),
	inventory_frame: new Sprite('./images/game/inventory-frame.png'),
	scan_green: new Sprite('./images/game/scan-green.png'),
	green_wall_on: new Sprite('./images/game/green-wall-on.png'),
	push_box_controls: new Sprite('./images/game/push-box-controls.png'),
	green_wall_off: new Sprite('./images/game/green-wall-off.png'),
	disc_trap_on_white: new Sprite('./images/game/disc-trap-on-white.png'),
	disc_trap_off_white: new Sprite('./images/game/disc-trap-off-white.png'),
	scan_yellow: new Sprite('./images/game/scan-yellow.png'),
	yellow_wall_on: new Sprite('./images/game/yellow-wall-on.png'),
	move_remote_bot_controls: new Sprite('./images/game/move-remote-bot-controls.png'),
	yellow_wall_off: new Sprite('./images/game/yellow-wall-off.png'),
	plate_off_blue: new Sprite('./images/game/plate-off-blue.png'),
	plate_on_blue: new Sprite('./images/game/plate-on-blue.png'),
	plate_off_green: new Sprite('./images/game/plate-off-green.png'),
	plate_on_green: new Sprite('./images/game/plate-on-green.png'),
	plate_off_white: new Sprite('./images/game/plate-off-white.png'),
	plate_on_white: new Sprite('./images/game/plate-on-white.png'),
	pull_box_controls: new Sprite('./images/game/pull-box-controls.png'),
	remote_eject_disc_controls: new Sprite('./images/game/remote-eject-disc-controls.png'),
	remote_bot_disc_controls: new Sprite('./images/game/remote-bot-disc-controls.png'),
	teleport_pad_on_white: new Sprite('./images/game/teleport-pad-on-white.png'),
	teleport_pad_off_white: new Sprite('./images/game/teleport-pad-off-white.png'),
	red_wall_on: new Sprite('./images/game/red-wall-on.png'),
	red_wall_off: new Sprite('./images/game/red-wall-off.png'),
}

const spriteArr = Object.values(sprites)
const promises = spriteArr.map((sprite) => sprite.load())
await Promise.all(promises)

export default sprites

export function findSprite(name) {
	const sprite = sprites[name.replaceAll('-', '_')]
	if (!sprite) {
		throw new Error(`Sprite ${name} not found`)
	}
	return sprite
}
