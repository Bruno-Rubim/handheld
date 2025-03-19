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
	case_pc: new Sprite('./images/case-pc/case.png'),
	circle_button_off_pc: new Sprite('./images/case-pc/circle-button-off.png'),
	circle_button_on_pc: new Sprite('./images/case-pc/circle-button-on.png'),
	cross_button_off_pc: new Sprite('./images/case-pc/cross-button-off.png'),
	cross_button_on_pc: new Sprite('./images/case-pc/cross-button-on.png'),
	down_button_off_pc: new Sprite('./images/case-pc/down-button-off.png'),
	down_button_on_pc: new Sprite('./images/case-pc/down-button-on.png'),
	left_button_off_pc: new Sprite('./images/case-pc/left-button-off.png'),
	left_button_on_pc: new Sprite('./images/case-pc/left-button-on.png'),
	right_button_off_pc: new Sprite('./images/case-pc/right-button-off.png'),
	right_button_on_pc: new Sprite('./images/case-pc/right-button-on.png'),
	square_button_off_pc: new Sprite('./images/case-pc/square-button-off.png'),
	square_button_on_pc: new Sprite('./images/case-pc/square-button-on.png'),
	triangle_button_off_pc: new Sprite('./images/case-pc/triangle-button-off.png'),
	triangle_button_on_pc: new Sprite('./images/case-pc/triangle-button-on.png'),
	up_button_off_pc: new Sprite('./images/case-pc/up-button-off.png'),
	up_button_on_pc: new Sprite('./images/case-pc/up-button-on.png'),
	
	case_mobile: new Sprite('./images/case-mobile/case.png'),
	circle_button_off_mobile: new Sprite('./images/case-mobile/circle-button-off.png'),
	circle_button_on_mobile: new Sprite('./images/case-mobile/circle-button-on.png'),
	cross_button_off_mobile: new Sprite('./images/case-mobile/cross-button-off.png'),
	cross_button_on_mobile: new Sprite('./images/case-mobile/cross-button-on.png'),
	down_button_off_mobile: new Sprite('./images/case-mobile/down-button-off.png'),
	down_button_on_mobile: new Sprite('./images/case-mobile/down-button-on.png'),
	left_button_off_mobile: new Sprite('./images/case-mobile/left-button-off.png'),
	left_button_on_mobile: new Sprite('./images/case-mobile/left-button-on.png'),
	right_button_off_mobile: new Sprite('./images/case-mobile/right-button-off.png'),
	right_button_on_mobile: new Sprite('./images/case-mobile/right-button-on.png'),
	square_button_off_mobile: new Sprite('./images/case-mobile/square-button-off.png'),
	square_button_on_mobile: new Sprite('./images/case-mobile/square-button-on.png'),
	triangle_button_off_mobile: new Sprite('./images/case-mobile/triangle-button-off.png'),
	triangle_button_on_mobile: new Sprite('./images/case-mobile/triangle-button-on.png'),
	up_button_off_mobile: new Sprite('./images/case-mobile/up-button-off.png'),
	up_button_on_mobile: new Sprite('./images/case-mobile/up-button-on.png'),
	
	screen_shine: new Sprite('./images/case-pc/screen-shine.png'),
	
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
	inventory_frame: new Sprite('./images/game/inventory-frame.png'),
	floppy_null_selected: new Sprite('./images/game/floppy-null-selected.png'),
	floppy_purple_item: new Sprite('./images/game/floppy-purple-item.png'),
	floppy_purple_selected: new Sprite('./images/game/floppy-purple-selected.png'),
	floppy_red_item: new Sprite('./images/game/floppy-red-item.png'),
	floppy_red_selected: new Sprite('./images/game/floppy-red-selected.png'),
	floppy_yellow_item: new Sprite('./images/game/floppy-yellow-item.png'),
	floppy_yellow_selected: new Sprite('./images/game/floppy-yellow-selected.png'),
	scan_green: new Sprite('./images/game/scan-green.png'),
	scan_purple: new Sprite('./images/game/scan-purple.png'),
	scan_red: new Sprite('./images/game/scan-red.png'),
	scan_white: new Sprite('./images/game/scan-white.png'),
	scan_yellow: new Sprite('./images/game/scan-yellow.png'),
	remote_bot_left: new Sprite('./images/game/remote-bot-left.png'),
	remote_bot_right: new Sprite('./images/game/remote-bot-right.png'),
	teleport_pad: new Sprite('./images/game/teleport-pad.png'),
	teleport_controls: new Sprite('./images/game/teleport-controls.png'),
	wall: new Sprite('./images/game/wall.png'),
	eject_disc_controls: new Sprite('./images/game/eject-disc-controls.png'),
	drill_controls: new Sprite('./images/game/drill-controls.png'),
	floppy_white_item: new Sprite('./images/game/floppy-white-item.png'),
	floppy_white_selected: new Sprite('./images/game/floppy-white-selected.png'),
	background_debug: new Sprite('./images/game/background-debug.png'),
	lever_white_off: new Sprite('./images/game/lever-white-off.png'),
	lever_white_on: new Sprite('./images/game/lever-white-on.png'),
	lever_blue_off: new Sprite('./images/game/lever-blue-off.png'),
	lever_blue_on: new Sprite('./images/game/lever-blue-on.png'),
	lever_green_off: new Sprite('./images/game/lever-green-off.png'),
	lever_green_on: new Sprite('./images/game/lever-green-on.png'),
	inventory_frame: new Sprite('./images/game/inventory-frame.png'),
	push_box_controls: new Sprite('./images/game/push-box-controls.png'),
	disc_trap_on_white: new Sprite('./images/game/disc-trap-on-white.png'),
	disc_trap_off_white: new Sprite('./images/game/disc-trap-off-white.png'),
	move_remote_bot_controls: new Sprite('./images/game/move-remote-bot-controls.png'),
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
	wall_blue_off: new Sprite('./images/game/wall-blue-off.png'),
	wall_blue_on: new Sprite('./images/game/wall-blue-on.png'),
	wall_green_on: new Sprite('./images/game/wall-green-on.png'),
	wall_green_off: new Sprite('./images/game/wall-green-off.png'),
	wall_purple_on: new Sprite('./images/game/wall-purple-on.png'),
	wall_purple_off: new Sprite('./images/game/wall-purple-off.png'),
	wall_red_on: new Sprite('./images/game/wall-red-on.png'),
	wall_red_off: new Sprite('./images/game/wall-red-off.png'),
	wall_white_on: new Sprite('./images/game/wall-white-on.png'),
	wall_white_off: new Sprite('./images/game/wall-white-off.png'),
	wall_yellow_on: new Sprite('./images/game/wall-yellow-on.png'),
	wall_yellow_off: new Sprite('./images/game/wall-yellow-off.png'),
	conveyor_right_0_white: new Sprite('./images/game/conveyor-right-0-white.png'),
	conveyor_right_1_white: new Sprite('./images/game/conveyor-right-1-white.png'),
	conveyor_right_2_white: new Sprite('./images/game/conveyor-right-2-white.png'),
	conveyor_right_3_white: new Sprite('./images/game/conveyor-right-3-white.png'),
	conveyor_left_0_white: new Sprite('./images/game/conveyor-left-0-white.png'),
	conveyor_left_1_white: new Sprite('./images/game/conveyor-left-1-white.png'),
	conveyor_left_2_white: new Sprite('./images/game/conveyor-left-2-white.png'),
	conveyor_left_3_white: new Sprite('./images/game/conveyor-left-3-white.png'),
	conveyor_down_0_white: new Sprite('./images/game/conveyor-down-0-white.png'),
	conveyor_down_1_white: new Sprite('./images/game/conveyor-down-1-white.png'),
	conveyor_down_2_white: new Sprite('./images/game/conveyor-down-2-white.png'),
	conveyor_down_3_white: new Sprite('./images/game/conveyor-down-3-white.png'),
	conveyor_up_0_white: new Sprite('./images/game/conveyor-up-0-white.png'),
	conveyor_up_1_white: new Sprite('./images/game/conveyor-up-1-white.png'),
	conveyor_up_2_white: new Sprite('./images/game/conveyor-up-2-white.png'),
	conveyor_up_3_white: new Sprite('./images/game/conveyor-up-3-white.png'),
	conveyor_right_0_blue: new Sprite('./images/game/conveyor-right-0-blue.png'),
	conveyor_right_1_blue: new Sprite('./images/game/conveyor-right-1-blue.png'),
	conveyor_right_2_blue: new Sprite('./images/game/conveyor-right-2-blue.png'),
	conveyor_right_3_blue: new Sprite('./images/game/conveyor-right-3-blue.png'),
	conveyor_left_0_blue: new Sprite('./images/game/conveyor-left-0-blue.png'),
	conveyor_left_1_blue: new Sprite('./images/game/conveyor-left-1-blue.png'),
	conveyor_left_2_blue: new Sprite('./images/game/conveyor-left-2-blue.png'),
	conveyor_left_3_blue: new Sprite('./images/game/conveyor-left-3-blue.png'),
	conveyor_down_0_blue: new Sprite('./images/game/conveyor-down-0-blue.png'),
	conveyor_down_1_blue: new Sprite('./images/game/conveyor-down-1-blue.png'),
	conveyor_down_2_blue: new Sprite('./images/game/conveyor-down-2-blue.png'),
	conveyor_down_3_blue: new Sprite('./images/game/conveyor-down-3-blue.png'),
	conveyor_up_0_blue: new Sprite('./images/game/conveyor-up-0-blue.png'),
	conveyor_up_1_blue: new Sprite('./images/game/conveyor-up-1-blue.png'),
	conveyor_up_2_blue: new Sprite('./images/game/conveyor-up-2-blue.png'),
	conveyor_up_3_blue: new Sprite('./images/game/conveyor-up-3-blue.png'),
	conveyor_right_0_green: new Sprite('./images/game/conveyor-right-0-green.png'),
	conveyor_right_1_green: new Sprite('./images/game/conveyor-right-1-green.png'),
	conveyor_right_2_green: new Sprite('./images/game/conveyor-right-2-green.png'),
	conveyor_right_3_green: new Sprite('./images/game/conveyor-right-3-green.png'),
	conveyor_left_0_green: new Sprite('./images/game/conveyor-left-0-green.png'),
	conveyor_left_1_green: new Sprite('./images/game/conveyor-left-1-green.png'),
	conveyor_left_2_green: new Sprite('./images/game/conveyor-left-2-green.png'),
	conveyor_left_3_green: new Sprite('./images/game/conveyor-left-3-green.png'),
	conveyor_down_0_green: new Sprite('./images/game/conveyor-down-0-green.png'),
	conveyor_down_1_green: new Sprite('./images/game/conveyor-down-1-green.png'),
	conveyor_down_2_green: new Sprite('./images/game/conveyor-down-2-green.png'),
	conveyor_down_3_green: new Sprite('./images/game/conveyor-down-3-green.png'),
	conveyor_up_0_green: new Sprite('./images/game/conveyor-up-0-green.png'),
	conveyor_up_1_green: new Sprite('./images/game/conveyor-up-1-green.png'),
	conveyor_up_2_green: new Sprite('./images/game/conveyor-up-2-green.png'),
	conveyor_up_3_green: new Sprite('./images/game/conveyor-up-3-green.png'),
}

const spriteArr = Object.values(sprites)
const promises = spriteArr.map((sprite) => sprite.load())
await Promise.all(promises)

export default sprites

export function findSprite(spriteName) {
	const sprite = sprites[spriteName.replaceAll('-', '_')]
	if (!sprite) {
		throw new Error(`Sprite ${spriteName} not found`)
	}
	return sprite
}
