import { nengiConfig } from '../shared/nengi-config'
import { NengiServer } from './networking/nengi-server'

function highResolutionTimeStamp() {
    const time = process.hrtime()
    return time[0] * 1000 + time[1] / 1000000
}

let tick = 0
let previous = highResolutionTimeStamp()
const tickLengthMs = 1000 / nengiConfig.UPDATE_RATE

NengiServer.init()

NengiServer.instance.on('connect', async ({ client, callback }) => {
    console.log('Client Connected')
    console.log(client)
    callback({ accepted: true, text: 'Welcome!' })
})

NengiServer.instance.on('disconnect', client => {

})

const loop = function () {
    const now = highResolutionTimeStamp()
    if (previous + tickLengthMs <= now) {
        const delta = (now - previous) / 1000
        previous = now
        tick++
    }

    // Updates go here

    if (highResolutionTimeStamp() - previous < tickLengthMs - 4) {
        setTimeout(loop, 0)
    } else {
        setImmediate(loop)
    }
}

loop()