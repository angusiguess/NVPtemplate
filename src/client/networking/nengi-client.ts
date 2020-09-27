import nengi from 'nengi'
import { nengiConfig } from '../../shared/nengi-config'
import { clientHooks } from './client-hooks'
import { LoginNotice } from '../../shared/messages/LoginNotice'

export class NengiClient {
    public static instance: nengi.Client

    static update(delta: number, now: number) {
        this.instance.update()
    }

    static init() {
        const instance = new nengi.Client(nengiConfig, 100)

        instance.on('connected', res => { console.log('connection?:', res) })
        instance.on('disconnected', () => { console.log('connnection closed') })

        instance.on('message::LoginNotice', (message: LoginNotice) => {
            console.log(`Server MOTD: ${ message.text }`)
        })

        // TODO add createhooks
        clientHooks(instance, () => { })

        NengiClient.instance = instance
    }
}
