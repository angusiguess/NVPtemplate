import 'joypad.js'

export enum ControllerAxisDirection {
	LEFT = 'left',
	RIGHT = 'right',
	UP = 'top',
	DOWN = 'bottom',
}

export class ControllerManager {
	eventListener: joypad.eventListener
	currentController: any

	private static _instance: ControllerManager
	static get instance() {
		if(!ControllerManager._instance) {
			ControllerManager._instance = new ControllerManager()
		}
		return ControllerManager._instance
	}

	private constructor() {
		this.eventListener = joypad

		joypad.on('connect', (evt) => {
			this.currentController = evt.gamepad
		})
	}
}
