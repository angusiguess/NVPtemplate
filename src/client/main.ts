import nengi, { Client } from 'nengi'
import { nengiConfig } from '../shared/nengi-config'
import { ClientNengi } from './networking/client-nengi'

function highResolutionTimeStamp() {
    const time = process.hrtime()
    return time[0] * 1000 + time[1] / 1000000
}

ClientNengi.init()

ClientNengi.instance.on('connected', res => { console.log('connection?:', res) })
ClientNengi.instance.on('disconnected', () => { console.log('connnection closed') })

ClientNengi.instance.connect('ws://localhost:8000')

// Update loop
export function startGame() {
    let previous = highResolutionTimeStamp()

    const loop = () => {
        const now = highResolutionTimeStamp()
        const delta = (now - previous) / 1000
        previous = now
    }

}

ClientNengi.instance.readNetworkAndEmit()
ClientNengi.instance.update()