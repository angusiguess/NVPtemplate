import { EventEmitter } from 'events'
import nengi from 'nengi'
import { nengiConfig } from '../../shared/nengi-config'
import { serverHooks } from './server-hooks'
import { LoginNotice } from '../../shared/messages/LoginNotice'
import { ServerPlayer } from '../entities/player.server'

export class NengiServer {
    instance!: nengi.Instance
    entities: Map<any, any> = new Map()
    isRunning = false

    constructor() { }

    start(port: number) {
        // TODO Parameterize port
        console.log('Initializing Nengi Server')
        const instance = new nengi.Instance(nengiConfig, { port })
        // Register server hooks on the instance
        serverHooks(instance)

        this.entities = new Map()

        instance.on('connect', ({ client, callback }) => {
            console.log('Client Connected')
            console.log(client)
            callback({ accepted: true, text: 'Welcome!' }) // just send their identity packet here, no separate message

            const entity = new ServerPlayer()
            instance.addEntity(entity)
            if(entity.nid) {
                this.entities.set(entity.nid, entity)
            }
            client.entity = entity

            client.view = {
                x: entity.x,
                y: entity.y,
                halfWidth: 700,
                halfHeight: 500,
            }
            console.log(client.view, {entity})


            instance.message(new LoginNotice(`whoa there pilgrim, looks like you're loggin in`), client)
        })

        instance.on('disconnect', client => {
            // If we remove this after removeEntity it sticks around in state
            this.entities.delete(client.entity.nid)
            instance.removeEntity(client.entity)
            console.log('Client Disconnected')
        })

        instance.on('command::PlayerInput', ({ command, client }) => {
            const { up, down, left, right, delta } = command
            const { entity } = client
            const speed = 200
            if (up) {
                entity.y -= speed * delta
            }
            if (down) {
                entity.y += speed * delta
            }
            if (left) {
                entity.x -= speed * delta
            }
            if (right) {
                entity.x += speed * delta
            }
        })
        
        this.instance = instance
        this.isRunning = true
    }

    update(delta, now) {
        if(this.isRunning) {
            this.instance.emitCommands()

            this.entities.forEach(entity => {
                if(entity.update) {
                    entity.update(delta)
                }
            })

            this.instance.update()
        }
    }
}
