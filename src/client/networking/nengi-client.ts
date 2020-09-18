import nengi from 'nengi'
import { nengiConfig } from '../../shared/nengi-config'
import { clientHooks } from './client-hooks'

export class NengiClient {
    public static instance: nengi.Client

    static init() {
        const instance = new nengi.Client(nengiConfig, 100)

        instance.on('connected', res => { console.log('connection?:', res) })
        instance.on('disconnected', () => { console.log('connnection closed') })

        // TODO add createhooks
        clientHooks(instance, () => { })

        NengiClient.instance = instance
    }
}