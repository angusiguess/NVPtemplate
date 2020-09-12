import nengi from 'nengi'
import { nengiConfig } from '../../shared/nengi-config'

export class ClientNengi {
    public static instance: nengi.Client

    static init() {
        ClientNengi.instance = new nengi.Client(nengiConfig, 100)
    }
}