import nengi from 'nengi'
import { nengiConfig } from '../../shared/nengi-config'

export class ServerNengi {
    public static instance: nengi.Instance

    static init() {
        // TODO Parameterize port
        ServerNengi.instance = new nengi.Instance(nengiConfig, { port: 8000 })
    }
}