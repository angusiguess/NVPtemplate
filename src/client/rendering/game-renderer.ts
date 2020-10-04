import { autoDetectRenderer, Renderer, Container, TilingSpriteRenderer } from 'pixi.js'
import Sprite from './sprite'

export default class GameRenderer {
	private static _instance: GameRenderer
	static get instance() {
		if(!GameRenderer._instance) {
			GameRenderer._instance = new GameRenderer()
		}
		return GameRenderer._instance
	}

	renderer!: Renderer
	canvas!: HTMLCanvasElement

	backgroundLayer: Container = new Container()

	private constructor() {

	}

	initialize(element: HTMLCanvasElement) {
		this.canvas = element

		this.renderer = autoDetectRenderer({
			width: element.clientWidth,
			height: element.clientHeight,
			view: this.canvas,
			antialias: false,
			resolution: 1,
		})
		this.renderer.backgroundColor = 0x000000

		window.addEventListener("resize", this.onResize.bind(this))

		this.createDummySprites()
	}

	update(delta: number, now: number) {
		this.renderer.render(this.backgroundLayer)
	}

	onResize() {
		this.renderer.resize(this.canvas.width, this.canvas.height)
	}

	createDummySprites() {
		let sprites: Sprite[] = []
		for(let x = 0; x <= 10; x++) {
			for(let y = 0; y <= 10; y++) {
				const derpySprite = new Sprite('./characters/eyeball_1.png')
				derpySprite.scale.set(2,2)
				derpySprite.position.set(300+x*25, 200+y*25)
				this.backgroundLayer.addChild(derpySprite)
				sprites.push(derpySprite)
			}
		}
		setInterval(() => {
			sprites.forEach((sprite) => {
				sprite.rotation += 0.2
			})
		}, 17)

	}
}
