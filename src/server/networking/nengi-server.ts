import { EventEmitter } from 'events'
import nengi from 'nengi'
import { nengiConfig } from '../../shared/nengi-config'
import { serverHooks } from './server-hooks'
import { LoginNotice } from '../../shared/messages/LoginNotice'
import { Player } from '../../shared/entities/Player'

export class NengiServer {
    public static instance: nengi.Instance

    public static entities: Map<any, any>

    static update(delta, tick, now) {
        NengiServer.instance.emitCommands()

        this.entities.forEach(entity => {
        })

        NengiServer.instance.update()
    }

    static init() {
        // TODO Parameterize port
        console.log('Initializing Nengi Server')
        const instance = new nengi.Instance(nengiConfig, { port: 8000 })
        // Register server hooks on the instance
        serverHooks(instance)

        NengiServer.entities = new Map()

        instance.on('connect', ({ client, callback }) => {
            console.log('Client Connected')
            console.log(client)
            callback({ accepted: true, text: 'Welcome!' })

            const entity = new Player()
            instance.addEntity(entity)
            if(entity.nid) {
                NengiServer.entities.set(entity.nid, entity)
            }
            client.entity = entity

            instance.message(new LoginNotice('whoa there pilgrim, looks like you\'re loggin in'), client)
        })

        instance.on('disconnect', client => {
            // If we remove this after removeEntity it sticks around in state
            NengiServer.entities.delete(client.entity.nid)
            instance.removeEntity(client.entity)
            console.log('Client Disconnected')
        })
        NengiServer.instance = instance
    }
}