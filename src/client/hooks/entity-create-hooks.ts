import { ClientPlayerHooks } from '../entities/player.client'

export function createHooks(state) {
    return {
        'SharedPlayer': ClientPlayerHooks(state)
    }
}
