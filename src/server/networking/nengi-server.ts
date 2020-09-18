import { EventEmitter } from 'events'
import nengi from 'nengi'
import { nengiConfig } from '../../shared/nengi-config'
import { serverHooks } from './server-hooks'

export class NengiServer {
    public static instance: nengi.Instance

    static init() {
        // TODO Parameterize port
        console.log('Initializing Nengi Server')
        const instance = new nengi.Instance(nengiConfig, { port: 8000 })
        // Register server hooks on the instance
        serverHooks(instance)

        instance.on('connect', ({ client, callback }) => {
            console.log('Client Connected')
            console.log(client)
            callback({ accepted: true, text: 'Welcome!' })
        })

        instance.on('disconnect', client => {
            console.log('Client Disconnected')
        })
        NengiServer.instance = instance
    }
}