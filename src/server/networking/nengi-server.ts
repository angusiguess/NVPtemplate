import { EventEmitter } from 'events'
import nengi from 'nengi'
import { nengiConfig } from '../../shared/nengi-config'
import { serverHooks } from './server-hooks'
import { LoginNotice } from '../../shared/messages/LoginNotice'

export class NengiServer {
    public static instance: nengi.Instance

    static update(delta, tick, now) {
        NengiServer.instance.emitCommands()
        NengiServer.instance.update()
    }

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
            instance.message(new LoginNotice('whoa there pilgrim, looks like you\'re loggin in'), client)
        })

        instance.on('disconnect', client => {
            console.log('Client Disconnected')
        })
        NengiServer.instance = instance
    }
}