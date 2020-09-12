import nengi from 'nengi'
import { nengiConfig } from '../../shared/nengi-config'

export class NengiClient {
    public static instance: nengi.Client

    static init() {
        NengiClient.instance = new nengi.Client(nengiConfig, 100)
    }
}