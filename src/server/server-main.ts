import { nengiConfig } from '../shared/nengi-config'
import { highResolutionTimeStamp } from '../shared/utilities/timing'
import GameServer from './game-server'
import { NengiServer } from './networking/nengi-server'

function go() {
    const NUMBER_OF_GAME_SERVERS = 10
    const STARTING_PORT = 4050

    const gameServers: GameServer[] = []

    let tick = 0
    let previous = highResolutionTimeStamp()
    const tickLengthMs = 1000 / nengiConfig.UPDATE_RATE

    for(let i = 0; i <= NUMBER_OF_GAME_SERVERS; i++) {
        const gameServer = new GameServer()
        gameServers.push(gameServer)
        gameServer.openConnectionListener(STARTING_PORT + i)
    }

    console.log(`### Initialized ${NUMBER_OF_GAME_SERVERS} game servers on ports ${STARTING_PORT} - ${STARTING_PORT + NUMBER_OF_GAME_SERVERS - 1}.`)

    const loop = function () {
        const now = highResolutionTimeStamp()
        let delta
        if (previous + tickLengthMs <= now) {
            delta = (now - previous) / 1000
            previous = now
            tick++
        }

        gameServers.forEach((gameServer) => {
            gameServer.update(delta, now)
        })

        if (highResolutionTimeStamp() - previous < tickLengthMs - 4) {
            setTimeout(loop, 0)
        } else {
            setImmediate(loop)
        }

    }

    loop()
}

go()
