import nengi, { Client } from 'nengi'
import { nengiConfig } from '../shared/nengi-config'
import { NengiClient } from './networking/nengi-client'
import GameRenderer from './rendering/game-renderer'

function highResolutionTimeStamp() {
    return performance.now()
}

NengiClient.init()
NengiClient.instance.on('connected', res => { console.log('connection?:', res) })
NengiClient.instance.on('disconnected', () => { console.log('connnection closed') })
NengiClient.instance.connect('ws://localhost:8000')
GameRenderer.instance.initialize(<HTMLCanvasElement>document.getElementById("main-canvas"))

// Update loop
window.onload = () => {
    console.log('window loaded')
    let previous = highResolutionTimeStamp()

    const loop = () => {
        const now = highResolutionTimeStamp()
        const delta = (now - previous) / 1000
        previous = now
        NengiClient.instance.readNetwork()
        NengiClient.instance.update()
        GameRenderer.instance.update(delta, now)
        window.requestAnimationFrame(loop)
    }

    loop()
}
