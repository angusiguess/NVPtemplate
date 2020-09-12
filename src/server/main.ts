import { nengiConfig } from '../shared/nengi-config'
import { ServerNengi } from './networking/server-nengi'

function highResolutionTimeStamp() {
    const time = process.hrtime()
    return time[0] * 1000 + time[1] / 1000000
}

let tick = 0
let previous = highResolutionTimeStamp()
const tickLengthMs = 1000 / nengiConfig.UPDATE_RATE

ServerNengi.init()

ServerNengi.instance.on('connect', async ({ client, data, callback }) => {
    console.log('Client Connected')
    console.log(client)
    console.log(data)
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