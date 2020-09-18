interface Command {
    tick: number,
    client: any,
    commands: [any]
}

export function serverHooks(instance) {
    instance.onConnect((client, data, callback) => {
        instance.emit('connect', { client, data, callback })
    })

    instance.onDisconnect(client => {
        instance.emit('disconnect', client)
    })

    instance.emitCommands = () => {
        let cmd: Command
        while (cmd = instance.getNextCommand()) {
            const tick = cmd.tick
            const client = cmd.client

            for (let i = 0; i < cmd.commands.length; i++) {
                const command = cmd.commands[i]
                instance.emit(`command::${command.protocol.name}`, { command, client, tick })
            }
        }
    }
}