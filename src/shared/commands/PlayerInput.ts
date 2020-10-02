import nengi from 'nengi'

class PlayerInput {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
    delta: number;
    
    constructor(up, down, left, right, delta) {
        this.up = up
        this.down = down
        this.left = left
        this.right = right
        this.delta = delta
    }

    static protocol = {
        up: nengi.Boolean,
        down: nengi.Boolean,
        left: nengi.Boolean,
        right: nengi.Boolean,
        delta: nengi.Number
    }
}

export default PlayerInput