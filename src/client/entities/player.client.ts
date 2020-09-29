import { SharedPlayer } from "../../shared/entities/player.shared";
import GameRenderer from "../rendering/game-renderer"
import Sprite from "../rendering/sprite";

export class ClientPlayer extends SharedPlayer {
	sprite: Sprite

	constructor(entityData) {
		super()

		Object.assign(this, entityData)

		this.sprite = new Sprite('./characters/eyeball_1.png')
		this.sprite.position.set(this.x, this.y)
	}
}

export function ClientPlayerHooks(state) {
    return {
        create({ data, entity }) {
			const player = new ClientPlayer(entity)
			GameRenderer.instance.backgroundLayer.addChild(player.sprite)
        },
        delete({ nid, entity, graphics }) {
			GameRenderer.instance.backgroundLayer.removeChild(graphics)
        },
        watch: {
			// propName: ({ value, entity, graphics }) => {
			// 	// do thing
			// },
			x: ({ value, entity, graphics }) => {
				if(graphics) {
					graphics.rotation += 5
					console.log(graphics.rotation)
				}
				// do thing
			},
        }
    }
}
