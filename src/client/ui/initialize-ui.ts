import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import logger from '../../shared/logger'
import Overlay from './components/overlay.vue'
import { devToolsStateModule } from './state/dev-tools-state'

Vue.config.productionTip = false
Vue.use(Vuex)

export class GameUI {
	private static _instance: GameUI
	static get instance() {
		if(!GameUI._instance) {
			GameUI._instance = new GameUI()
		}
		return GameUI._instance
	}

	vueApp: Vue
	store: Store<any>

	private constructor() {
		logger.log('### Initializing UI')
		this.store = new Vuex.Store({
			modules: {
				devTools: devToolsStateModule(),
			},
			state: { },
			getters: { },
			actions: { },
			mutations: { },
		})

		this.vueApp = new Vue({
			render: (stuff) => stuff(Overlay),
			store: this.store,
			mounted() {
				logger.log('### UI initialized!')
			}
		})
	}

	mountToElement(elementSelector: string) {
		this.vueApp.$mount(elementSelector)
	}
}
