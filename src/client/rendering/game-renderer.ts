import { autoDetectRenderer, Renderer, Container } from 'pixi.js'
import Sprite from './sprite'

export default class GameRenderer {
	private static _instance: GameRenderer
	static get instance() {
		if(!GameRenderer._instance) {
			GameRenderer._instance = new GameRenderer()
		}
		return GameRenderer._instance
	}

	renderer: Renderer
	canvas: HTMLCanvasElement

	backgroundLayer: Container = new Container()

	private constructor() {

	}

	initialize(element: HTMLCanvasElement) {
		this.canvas = element

		this.renderer = autoDetectRenderer({
			width: element.width,
			height: element.height,
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
		const derpySprite = new Sprite('./characters/eyeball_1.png')
		derpySprite.position.set(100, 100)
		this.backgroundLayer.addChild(derpySprite)
		setInterval(() => {
			derpySprite.rotation += 0.2
		}, 17)
	}
}
