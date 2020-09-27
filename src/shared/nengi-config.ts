import nengi from 'nengi'
import { LoginNotice } from './messages/LoginNotice'

export const nengiConfig = {
    UPDATE_RATE: 20,

    ID_BINARY_TYPE: nengi.UInt16,
    TYPE_BINARY_TYPE: nengi.UInt8,

    ID_PROPERTY_NAME: 'nid',
    TYPE_PROPERTY_NAME: 'ntype',

    USE_HISTORIAN: false,
    HISTORIAN_TICKS: 2,

    protocols: {
        entities: [
        ],
        localMessages: [],
        messages: [
            ['LoginNotice', LoginNotice]
        ],
        commands: [
        ],
        basics: []
    }
}
