import nengi from 'nengi'
import { v4 as uuidv4 } from 'uuid'

type uuid = string

export class SharedPlayer {
    nid?: number
    id: uuid
    x: number
    y: number

    static protocol = {
        id: { type: nengi.ASCIIString },
        x: {type: nengi.Int16 },
        y: {type : nengi.Int16 },
    }

    constructor() {
        this.id = uuidv4()
        this.x = 20
        this.y = 20
    }
}
