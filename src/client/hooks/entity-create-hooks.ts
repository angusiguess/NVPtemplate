import { ClientPlayerHooks, ClientPlayer } from '../entities/player.client'

export function createHooks(state) {
    return {
        'SharedPlayer': {
            constructor: ClientPlayer,
            hooks: ClientPlayerHooks(state),
        }
    }
}
