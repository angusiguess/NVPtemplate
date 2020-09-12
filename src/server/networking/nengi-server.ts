import nengi from 'nengi'
import { nengiConfig } from '../../shared/nengi-config'

export class NengiServer {
    public static instance: nengi.Instance

    static init() {
        // TODO Parameterize port
        console.log('Initializing Nengi Server')
        NengiServer.instance = new nengi.Instance(nengiConfig, { port: 8000 })
    }
}