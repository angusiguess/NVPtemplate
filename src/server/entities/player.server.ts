import { SharedPlayer } from "../../shared/entities/player.shared";

export class ServerPlayer extends SharedPlayer {
	constructor() {
		super()

		setInterval(() => {
			this.x += Math.random() * 10 - 5
			this.y += Math.random() * 10 - 5
		}, 1000)
	}
}
