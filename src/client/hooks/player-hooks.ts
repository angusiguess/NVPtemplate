import GameRenderer from "../rendering/game-renderer"

export default function(state) {
    return {
        create({ data, entity }) {
            GameRenderer.instance.addPlayer()
        },
        delete({ nid, graphics }) {
        },
        watch: {
        }
    }
}