import logger from "../../shared/logger"

export function clientHooks(client, hooks) {
    // additions to nengi client object
    client.hooks = hooks
    client.entities = new Map()
    client.graphicalEntities = new Map()

    // upgrade to being emitted events
    client.onConnect(res => {
        client.emit('connected', res)
    })

    client.onClose(() => {
        client.emit('disconnected')
    })

    // turn all network data into events
    client.readNetworkAndEmit = () => {
        const network = client.readNetwork()

        network.messages.forEach(message => {
            client.emit(`message::${message.protocol.name}`, message)
        })

        network.localMessages.forEach(localMessage => {
            client.emit(`message::${localMessage.protocol.name}`, localMessage)
        })

        network.entities.forEach(snapshot => {
            snapshot.createEntities.forEach(entity => {
                client.emit(`create::${entity.protocol.name}`, entity)
                client.emit(`create`, entity)
            })

            snapshot.updateEntities.forEach(update => {
                client.emit(`update`, update)
            })

            snapshot.deleteEntities.forEach(id => {
                client.emit(`delete`, id)
            })
        })

        network.predictionErrors.forEach(predictionErrorFrame => {
            client.emit(`predictionErrorFrame`, predictionErrorFrame)
        })
    }

    // create entities and invoke their hooks
    client.on('create', (data) => {
        // construct the entity (nengiConfig constructor)
        const name = data.protocol.name

        // construct the client entity (from hooks)
        const { constructor, hooks } = client.hooks[name]
        if (!constructor) {
            logger.error(`No constructor found for ${name}`)
            return
        }

        const entity = new constructor(data)
        Object.assign(entity, data)
        client.entities.set(entity.nid, entity)
        if(entity.sprite) {
            client.graphicalEntities.set(entity.nid, entity.sprite)
        }

        if (hooks) {
            const { graphics } = hooks.create({ data, entity })
            if (graphics) {
                Object.assign(graphics, data) //TODO: this is probably dangerous?
            }
            if (hooks.watch) {
                data.protocol.keys.forEach(prop => {
                    if (hooks.watch[prop]) {
                        hooks.watch[prop]({ value: data[prop], entity, graphics })
                    }
                })
            }
        }
    })

    // update entities and invoke their hooks
    client.on('update', (update) => {
        if (client.entityUpdateFilter && client.entityUpdateFilter(update)) {
            return
        }
        const entity = client.entities.get(update.nid)
        const name = entity.protocol.name
        if (entity) {
            // console.log(`[${update.nid}] updated ${update.prop} from ${entity[update.prop]} to ${update.value}`)
            entity[update.prop] = update.value
        } else {
            logger.warn(`Hooks tried to update an entity that did not exist: ${update.nid}`)
        }

        const graphics = client.graphicalEntities.get(update.nid)
        if (graphics) {
            graphics[update.prop] = update.value
        } else {
            logger.warn(`Hooks tried to update a graphical entity that did not exist: ${update.nid}`)
        }

        const { hooks } = client.hooks[name]
        if (hooks?.watch && hooks.watch[update.prop]) {
            hooks.watch[update.prop]({ id: update.id, value: update.value, entity, graphics })
        }
    })


    // delete entities and invoke their hooks
    client.on('delete', (nid) => {
        const entity = client.entities.get(nid)
        const graphics = client.graphicalEntities.get(nid)
        const name = graphics.protocol.name
        const { hooks } = client.hooks[name]
        hooks.delete({ nid, entity, graphics })

        if (client.entities.has(nid)) {
            client.entities.delete(nid)
        } else {
            logger.error(`Hooks tried to delete an entity that did not exist: ${nid}`)
        }

        if (client.graphicalEntities.has(nid)) {
            client.graphicalEntities.delete(nid)
        } else {
            logger.error(`Hooks tried to delete a graphical entity that did not exist: ${nid}`)
        }
    })
}
