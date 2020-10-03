import { NengiServer } from "./networking/nengi-server";


export default class GameServer {
	nengiServer: NengiServer

	constructor() {
		this.nengiServer = new NengiServer()
	}

	update(delta: number, now: number) {
		this.nengiServer.update(delta, now)
	}

	openConnectionListener(port: number) {
		this.nengiServer.start(port)
	}
}
