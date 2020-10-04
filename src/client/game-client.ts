import PlayerInput from "../shared/commands/PlayerInput"
import { InputManager } from "./input/input"
import { NengiClient } from "./networking/nengi-client"
import GameRenderer from "./rendering/game-renderer"

export default class GameClient {

	constructor() {
	}

	update(delta: number, now: number) {
		NengiClient.instance.readNetworkAndEmit()
        NengiClient.update(delta, now)
        GameRenderer.instance.update(delta, now)

		//TODO: move elsewhere
        const { up, down, left, right } = InputManager.instance.frameState
        NengiClient.instance.addCommand(new PlayerInput(up, down, left, right, delta))
        InputManager.instance.releaseKeys()
	}
}
