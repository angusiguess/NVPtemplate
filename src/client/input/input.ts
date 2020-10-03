import { ControllerAxisDirection, ControllerManager } from "./controller-manager"

export interface InputState {
    up: boolean
    down: boolean
    left: boolean
    right: boolean
    interact: boolean
    mouseX?: number
    mouseY?: number
    mouseDown: boolean

}

export class InputManager {
    currentState: InputState
    frameState: InputState

    private static _instance: InputManager
	static get instance() {
		if(!InputManager._instance) {
			InputManager._instance = new InputManager()
		}
		return InputManager._instance
	}

	private constructor() {
        this.currentState = {
            up: false,
            down: false,
            left: false,
            right: false,
            interact: false,
            mouseX: 0,
            mouseY: 0,
            mouseDown: false
        }

        this.frameState = {
            up: false,
            down: false,
            left: false,
            right: false,
            interact: false,
            mouseDown: false,
        }

        document.addEventListener('contextmenu', (event) =>
            // prevents right click from showing the context menu
            event.preventDefault()
        )

        document.addEventListener('keydown', (event) => {
            if (event.keyCode === 87 || event.keyCode === 38) {
                this.currentState.up = true
                this.frameState.up = true
            }
            if (event.keyCode === 65 || event.keyCode === 37) {
                this.currentState.left = true
                this.frameState.left = true
            }
            if (event.keyCode === 83 || event.keyCode === 40) {
                this.currentState.down = true
                this.frameState.down = true
            }
            if (event.keyCode === 68 || event.keyCode === 39) {
                this.currentState.right = true
                this.frameState.right = true
            }
        })

        document.addEventListener('keyup', (event) => {
            if (event.keyCode === 87 || event.keyCode === 38) {
                this.currentState.up = false
            }
            if (event.keyCode === 65 || event.keyCode === 37) {
                this.currentState.left = false
            }
            if (event.keyCode === 83 || event.keyCode === 40) {
                this.currentState.down = false
            }
            if (event.keyCode === 68 || event.keyCode === 39) {
                this.currentState.right = false
            }
        })

        document.addEventListener('mousemove', (event) => {
            this.currentState.mouseX = event.clientX
            this.currentState.mouseY = event.clientY
        })

        document.addEventListener('pointerdown', (event) => {
            this.currentState.mouseDown = true
            this.frameState.mouseDown = true
        })

        document.addEventListener('mouseup', (event) => {
            this.currentState.mouseDown = false
        })

        ControllerManager.instance.eventListener.on('button_press', (evt) => {
            //TODO: Map to actual buttons; requires keybinding/button-binding to really make sense. For now just interact because it's the only button.
            this.currentState.interact = true
            this.frameState.interact = true
        })
        
        ControllerManager.instance.eventListener.on('axis_move', (evt) => {
            const { detail } = evt
            switch(detail.directionOfMovement) {
                case ControllerAxisDirection.UP:
                    this.frameState.up = true
                    break
                case ControllerAxisDirection.DOWN:
                    this.frameState.down = true
                    break
                case ControllerAxisDirection.LEFT:
                    this.frameState.left = true
                    break
                case ControllerAxisDirection.RIGHT:
                    this.frameState.right = true
                    break
            }
        })
    }

    releaseKeys() {
        this.frameState.up = this.currentState.up
        this.frameState.left = this.currentState.left
        this.frameState.down = this.currentState.down
        this.frameState.right = this.currentState.right
        this.frameState.interact = this.currentState.interact
        this.frameState.mouseDown = this.currentState.mouseDown
    }
}
