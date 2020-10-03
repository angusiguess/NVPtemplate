import nengi, { Client } from 'nengi'
import { nengiConfig } from '../shared/nengi-config'
import { NengiClient } from './networking/nengi-client'
import GameRenderer from './rendering/game-renderer'
import { GameUI } from './ui/initialize-ui'
import GameClient from './game-client'
import logger from '../shared/logger'

function highResolutionTimeStamp() {
    return performance.now()
}

NengiClient.init()
const wsAddress = `ws://localhost:${4050 + ~~(Math.random()*5)}`
NengiClient.instance.connect(wsAddress)
logger.log(`### Connecting to ${wsAddress}`)

const state = {}

// Update loop
window.onload = () => {
    logger.log('### Window loaded')
    GameUI.instance.mountToElement("#game-ui")
    GameRenderer.instance.initialize(<HTMLCanvasElement>document.getElementById("main-canvas"))
    let previous = highResolutionTimeStamp()

    const client = new GameClient()

    const loop = () => {
        const now = highResolutionTimeStamp()
        const delta = (now - previous) / 1000
        previous = now
        client.update(delta, now)
        window.requestAnimationFrame(loop)
    }

    loop()
}
