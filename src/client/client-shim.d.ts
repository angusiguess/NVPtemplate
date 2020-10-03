declare namespace joypad {
	function on(eventName: string, callback: function)
	let instances: Array<any>
	function set(settings: any)
	function vibrate(gamepad: any, options: any)

	interface eventListener {
		on(eventName: string, callback: function)
	}
}
