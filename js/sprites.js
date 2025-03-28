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
	//pc case
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
	start_button_off_pc: new Sprite('./images/case-pc/start-button-off.png'),
	start_button_on_pc: new Sprite('./images/case-pc/start-button-on.png'),
	
	//mobile case
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
	start_button_off_mobile: new Sprite('./images/case-mobile/start-button-off.png'),
	start_button_on_mobile: new Sprite('./images/case-mobile/start-button-on.png'),

	screen_shine: new Sprite('./images/case-pc/screen-shine.png'),
	
	//menu
	restart_option: new Sprite('./images/game/menu/restart-option.png'),
	restart_option_text: new Sprite('./images/game/menu/restart-option-text.png'),
	controls_option: new Sprite('./images/game/menu/controls-option.png'),
	controls_option_text: new Sprite('./images/game/menu/controls-option-text.png'),
	controls_screen: new Sprite('./images/game/menu/controls-screen.png'),
	levels_option: new Sprite('./images/game/menu/levels-option.png'),
	levels_option_text: new Sprite('./images/game/menu/levels-option-text.png'),
	reset_save_option: new Sprite('./images/game/menu/reset-save-option.png'),
	reset_save_screen: new Sprite('./images/game/menu/reset-save-screen.png'),
	reset_save_option_text: new Sprite('./images/game/menu/reset-save-option-text.png'),
	section_a_option: new Sprite('./images/game/menu/section-a-option.png'),
	section_b_option: new Sprite('./images/game/menu/section-b-option.png'),
	section_c_option: new Sprite('./images/game/menu/section-c-option.png'),
	section_d_option: new Sprite('./images/game/menu/section-d-option.png'),
	selected_option: new Sprite('./images/game/menu/selected-option.png'),
	blocked_option: new Sprite('./images/game/menu/blocked-option.png'),

	//game
	background: new Sprite('./images/game/background.png'),
	box: new Sprite('./images/game/box.png'),
	controls_eject_disc: new Sprite('./images/game/controls-eject-disc.png'),
	controls_eject_disc_remote: new Sprite('./images/game/controls-eject-disc-remote.png'),
	controls_move_remote_bot: new Sprite('./images/game/controls-move-remote-bot.png'),
	controls_pull_box: new Sprite('./images/game/controls-pull-box.png'),
	controls_push_box: new Sprite('./images/game/controls-push-box.png'),
	controls_pointer: new Sprite('./images/game/controls-pointer.png'),
	controls_cancel: new Sprite('./images/game/controls-cancel.png'),
	controls_shoot: new Sprite('./images/game/controls-shoot.png'),
	controls_teleport: new Sprite('./images/game/controls-teleport.png'),
	disc_bot_left: new Sprite('./images/game/disc-bot-left.png'),
	disc_bot_right: new Sprite('./images/game/disc-bot-right.png'),
	disc_trap: new Sprite('./images/game/disc-trap.png'),
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
	wall: new Sprite('./images/game/wall.png'),
	floppy_white_item: new Sprite('./images/game/floppy-white-item.png'),
	floppy_white_selected: new Sprite('./images/game/floppy-white-selected.png'),
	background_debug: new Sprite('./images/game/background-debug.png'),
	lever_blue_off: new Sprite('./images/game/lever-blue-off.png'),
	lever_blue_on: new Sprite('./images/game/lever-blue-on.png'),
	lever_green_off: new Sprite('./images/game/lever-green-off.png'),
	lever_green_on: new Sprite('./images/game/lever-green-on.png'),
	lever_purple_off: new Sprite('./images/game/lever-purple-off.png'),
	lever_purple_on: new Sprite('./images/game/lever-purple-on.png'),
	lever_white_off: new Sprite('./images/game/lever-white-off.png'),
	lever_white_on: new Sprite('./images/game/lever-white-on.png'),
	inventory_frame: new Sprite('./images/game/inventory-frame.png'),
	disc_trap_on_white: new Sprite('./images/game/disc-trap-on-white.png'),
	disc_trap_off_white: new Sprite('./images/game/disc-trap-off-white.png'),
	plate_blue_off: new Sprite('./images/game/plate-blue-off.png'),
	plate_blue_on: new Sprite('./images/game/plate-blue-on.png'),
	plate_green_off: new Sprite('./images/game/plate-green-off.png'),
	plate_green_on: new Sprite('./images/game/plate-green-on.png'),
	plate_purple_off: new Sprite('./images/game/plate-purple-off.png'),
	plate_purple_on: new Sprite('./images/game/plate-purple-on.png'),
	plate_yellow_off: new Sprite('./images/game/plate-yellow-off.png'),
	plate_yellow_on: new Sprite('./images/game/plate-yellow-on.png'),
	plate_white_off: new Sprite('./images/game/plate-white-off.png'),
	plate_white_on: new Sprite('./images/game/plate-white-on.png'),
	pointer_left: new Sprite('./images/game/pointer-left.png'),
	pointer_right: new Sprite('./images/game/pointer-right.png'),
	pointer_down: new Sprite('./images/game/pointer-down.png'),
	pointer_up: new Sprite('./images/game/pointer-up.png'),
	pole_blue_off: new Sprite('./images/game/pole-blue-off.png'),
	pole_blue_on: new Sprite('./images/game/pole-blue-on.png'),
	pole_green_off: new Sprite('./images/game/pole-green-off.png'),
	pole_green_on: new Sprite('./images/game/pole-green-on.png'),
	pole_purple_off: new Sprite('./images/game/pole-purple-off.png'),
	pole_purple_on: new Sprite('./images/game/pole-purple-on.png'),
	pole_yellow_off: new Sprite('./images/game/pole-yellow-off.png'),
	pole_yellow_on: new Sprite('./images/game/pole-yellow-on.png'),
	pole_white_off: new Sprite('./images/game/pole-white-off.png'),
	pole_white_on: new Sprite('./images/game/pole-white-on.png'),
	red_projectile_left: new Sprite('./images/game/red-projectile-left.png'),
	red_projectile_right: new Sprite('./images/game/red-projectile-right.png'),
	red_projectile_down: new Sprite('./images/game/red-projectile-down.png'),
	red_projectile_up: new Sprite('./images/game/red-projectile-up.png'),
	teleport_pad_blue_on: new Sprite('./images/game/teleport-pad-blue-on.png'),
	teleport_pad_blue_off: new Sprite('./images/game/teleport-pad-blue-off.png'),
	teleport_pad_white_on: new Sprite('./images/game/teleport-pad-white-on.png'),
	teleport_pad_white_off: new Sprite('./images/game/teleport-pad-white-off.png'),
	teleport_pad_purple_on: new Sprite('./images/game/teleport-pad-purple-on.png'),
	teleport_pad_purple_off: new Sprite('./images/game/teleport-pad-purple-off.png'),
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
	conveyor_white_right_0: new Sprite('./images/game/conveyor-white-right-0.png'),
	conveyor_white_right_1: new Sprite('./images/game/conveyor-white-right-1.png'),
	conveyor_white_right_2: new Sprite('./images/game/conveyor-white-right-2.png'),
	conveyor_white_right_3: new Sprite('./images/game/conveyor-white-right-3.png'),
	conveyor_white_left_0: new Sprite('./images/game/conveyor-white-left-0.png'),
	conveyor_white_left_1: new Sprite('./images/game/conveyor-white-left-1.png'),
	conveyor_white_left_2: new Sprite('./images/game/conveyor-white-left-2.png'),
	conveyor_white_left_3: new Sprite('./images/game/conveyor-white-left-3.png'),
	conveyor_white_down_0: new Sprite('./images/game/conveyor-white-down-0.png'),
	conveyor_white_down_1: new Sprite('./images/game/conveyor-white-down-1.png'),
	conveyor_white_down_2: new Sprite('./images/game/conveyor-white-down-2.png'),
	conveyor_white_down_3: new Sprite('./images/game/conveyor-white-down-3.png'),
	conveyor_white_up_0: new Sprite('./images/game/conveyor-white-up-0.png'),
	conveyor_white_up_1: new Sprite('./images/game/conveyor-white-up-1.png'),
	conveyor_white_up_2: new Sprite('./images/game/conveyor-white-up-2.png'),
	conveyor_white_up_3: new Sprite('./images/game/conveyor-white-up-3.png'),
	conveyor_blue_right_0: new Sprite('./images/game/conveyor-blue-right-0.png'),
	conveyor_blue_right_1: new Sprite('./images/game/conveyor-blue-right-1.png'),
	conveyor_blue_right_2: new Sprite('./images/game/conveyor-blue-right-2.png'),
	conveyor_blue_right_3: new Sprite('./images/game/conveyor-blue-right-3.png'),
	conveyor_blue_left_0: new Sprite('./images/game/conveyor-blue-left-0.png'),
	conveyor_blue_left_1: new Sprite('./images/game/conveyor-blue-left-1.png'),
	conveyor_blue_left_2: new Sprite('./images/game/conveyor-blue-left-2.png'),
	conveyor_blue_left_3: new Sprite('./images/game/conveyor-blue-left-3.png'),
	conveyor_blue_down_0: new Sprite('./images/game/conveyor-blue-down-0.png'),
	conveyor_blue_down_1: new Sprite('./images/game/conveyor-blue-down-1.png'),
	conveyor_blue_down_2: new Sprite('./images/game/conveyor-blue-down-2.png'),
	conveyor_blue_down_3: new Sprite('./images/game/conveyor-blue-down-3.png'),
	conveyor_blue_up_0: new Sprite('./images/game/conveyor-blue-up-0.png'),
	conveyor_blue_up_1: new Sprite('./images/game/conveyor-blue-up-1.png'),
	conveyor_blue_up_2: new Sprite('./images/game/conveyor-blue-up-2.png'),
	conveyor_blue_up_3: new Sprite('./images/game/conveyor-blue-up-3.png'),
	conveyor_green_right_0: new Sprite('./images/game/conveyor-green-right-0.png'),
	conveyor_green_right_1: new Sprite('./images/game/conveyor-green-right-1.png'),
	conveyor_green_right_2: new Sprite('./images/game/conveyor-green-right-2.png'),
	conveyor_green_right_3: new Sprite('./images/game/conveyor-green-right-3.png'),
	conveyor_green_left_0: new Sprite('./images/game/conveyor-green-left-0.png'),
	conveyor_green_left_1: new Sprite('./images/game/conveyor-green-left-1.png'),
	conveyor_green_left_2: new Sprite('./images/game/conveyor-green-left-2.png'),
	conveyor_green_left_3: new Sprite('./images/game/conveyor-green-left-3.png'),
	conveyor_green_down_0: new Sprite('./images/game/conveyor-green-down-0.png'),
	conveyor_green_down_1: new Sprite('./images/game/conveyor-green-down-1.png'),
	conveyor_green_down_2: new Sprite('./images/game/conveyor-green-down-2.png'),
	conveyor_green_down_3: new Sprite('./images/game/conveyor-green-down-3.png'),
	conveyor_green_up_0: new Sprite('./images/game/conveyor-green-up-0.png'),
	conveyor_green_up_1: new Sprite('./images/game/conveyor-green-up-1.png'),
	conveyor_green_up_2: new Sprite('./images/game/conveyor-green-up-2.png'),
	conveyor_green_up_3: new Sprite('./images/game/conveyor-green-up-3.png'),
	conveyor_purple_right_0: new Sprite('./images/game/conveyor-purple-right-0.png'),
	conveyor_purple_right_1: new Sprite('./images/game/conveyor-purple-right-1.png'),
	conveyor_purple_right_2: new Sprite('./images/game/conveyor-purple-right-2.png'),
	conveyor_purple_right_3: new Sprite('./images/game/conveyor-purple-right-3.png'),
	conveyor_purple_left_0: new Sprite('./images/game/conveyor-purple-left-0.png'),
	conveyor_purple_left_1: new Sprite('./images/game/conveyor-purple-left-1.png'),
	conveyor_purple_left_2: new Sprite('./images/game/conveyor-purple-left-2.png'),
	conveyor_purple_left_3: new Sprite('./images/game/conveyor-purple-left-3.png'),
	conveyor_purple_down_0: new Sprite('./images/game/conveyor-purple-down-0.png'),
	conveyor_purple_down_1: new Sprite('./images/game/conveyor-purple-down-1.png'),
	conveyor_purple_down_2: new Sprite('./images/game/conveyor-purple-down-2.png'),
	conveyor_purple_down_3: new Sprite('./images/game/conveyor-purple-down-3.png'),
	conveyor_purple_up_0: new Sprite('./images/game/conveyor-purple-up-0.png'),
	conveyor_purple_up_1: new Sprite('./images/game/conveyor-purple-up-1.png'),
	conveyor_purple_up_2: new Sprite('./images/game/conveyor-purple-up-2.png'),
	conveyor_purple_up_3: new Sprite('./images/game/conveyor-purple-up-3.png'),
	conveyor_yellow_right_0: new Sprite('./images/game/conveyor-yellow-right-0.png'),
	conveyor_yellow_right_1: new Sprite('./images/game/conveyor-yellow-right-1.png'),
	conveyor_yellow_right_2: new Sprite('./images/game/conveyor-yellow-right-2.png'),
	conveyor_yellow_right_3: new Sprite('./images/game/conveyor-yellow-right-3.png'),
	conveyor_yellow_left_0: new Sprite('./images/game/conveyor-yellow-left-0.png'),
	conveyor_yellow_left_1: new Sprite('./images/game/conveyor-yellow-left-1.png'),
	conveyor_yellow_left_2: new Sprite('./images/game/conveyor-yellow-left-2.png'),
	conveyor_yellow_left_3: new Sprite('./images/game/conveyor-yellow-left-3.png'),
	conveyor_yellow_down_0: new Sprite('./images/game/conveyor-yellow-down-0.png'),
	conveyor_yellow_down_1: new Sprite('./images/game/conveyor-yellow-down-1.png'),
	conveyor_yellow_down_2: new Sprite('./images/game/conveyor-yellow-down-2.png'),
	conveyor_yellow_down_3: new Sprite('./images/game/conveyor-yellow-down-3.png'),
	conveyor_yellow_up_0: new Sprite('./images/game/conveyor-yellow-up-0.png'),
	conveyor_yellow_up_1: new Sprite('./images/game/conveyor-yellow-up-1.png'),
	conveyor_yellow_up_2: new Sprite('./images/game/conveyor-yellow-up-2.png'),
	conveyor_yellow_up_3: new Sprite('./images/game/conveyor-yellow-up-3.png'),
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
