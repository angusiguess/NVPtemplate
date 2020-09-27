import nengi from 'nengi'

export class LoginNotice {
    text: string

    static protocol = {
        text: nengi.UTF8String
    }

    constructor(text) {
        this.text = text
    }
}