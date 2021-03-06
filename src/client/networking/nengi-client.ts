import nengi from 'nengi'
import { nengiConfig } from '../../shared/nengi-config'
import { clientHooks } from './client-hooks'
import { LoginNotice } from '../../shared/messages/LoginNotice'
import { createHooks } from '../hooks/entity-create-hooks'
import { InputManager } from '../input/input';
import PlayerInput from '../../shared/commands/PlayerInput';

export class NengiClient {
    public static instance: nengi.Client

    static update(delta: number, now: number) {
        NengiClient.instance.update()
    }

    static state = {}

    static init() {
        const instance = new nengi.Client(nengiConfig, 100)

        instance.on('connected', res => { console.log('connection?:', res) })
        instance.on('disconnected', () => { console.log('connnection closed') })

        instance.on('message::LoginNotice', (message: LoginNotice) => {
            console.log(`Server MOTD: ${ message.text }`)
        })

        // TODO add real state
        clientHooks(instance, createHooks(this.state))

        NengiClient.instance = instance
    }
}
