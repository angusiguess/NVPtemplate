import nengi from 'nengi'
import { LoginNotice } from './messages/LoginNotice'
import { SharedPlayer } from './entities/player.shared'
import PlayerInput from './commands/PlayerInput';

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
            ['SharedPlayer', SharedPlayer]
        ],
        localMessages: [],
        messages: [
            ['LoginNotice', LoginNotice]
        ],
        commands: [
            ['PlayerInput', PlayerInput]
        ],
        basics: []
    }
}
