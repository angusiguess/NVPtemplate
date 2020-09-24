import { Container, Sprite as PixiSprite } from "pixi.js";


export default class Sprite extends Container {
	sprite: PixiSprite
	
	constructor(spriteUrl: string) {
		super()

		this.sprite = PixiSprite.from(spriteUrl)
		this.sprite.pivot.set(0, 0)
		this.addChild(this.sprite)
	}
}
