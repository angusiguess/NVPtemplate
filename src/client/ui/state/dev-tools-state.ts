import logger from "../../../shared/logger"

export const devToolsStateModule = () => {
	logger.log('### Loading state module: dev tools')

	return {
		state: {

		},
		getters: { },
		actions: { },
		mutations: { },

		namespaced: true,
	}
}
