import playerHooks from './player-hooks'

export function createHooks(state) {
    return {
        'Player': playerHooks(state)
    }
}