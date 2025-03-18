class Sound {
	constructor(src) {
		this.src = src
		this.audio = new Audio()
	}
	load() {
		const { src, audio } = this
		return new Promise((done, fail) => {
			audio.oncanplaythrough = () => done(audio)
			audio.onerror = fail
			audio.src = src
			audio.load()
		})
	}
}

const sounds = {
    error: new Audio('./sounds/error.mp3'),
    lever_on: new Audio('./sounds/lever-on.mp3'),
    lever_off: new Audio('./sounds/lever-off.mp3'),
    plate_on: new Audio('./sounds/plate-on.mp3'),
    plate_off: new Audio('./sounds/plate-off.mp3'),
    scan_on: new Audio('./sounds/scan-on.mp3'),
    scan_off: new Audio('./sounds/scan-off.mp3'),
}

const soundArr = Object.values(sounds)
const promises = soundArr.map((sound) => sound.load())
await Promise.all(promises)

export default sounds

export function findSound(soundName) {
	const sound = sounds[soundName.replaceAll('-', '_')]
	if (!sound) {
		throw new Error(`Sound ${soundName} not found`)
	}
	return sound
}