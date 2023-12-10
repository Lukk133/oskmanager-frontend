const URL_MODULES = '/modules';

const defaultModulesParams = {
    roleId: 0
}

export default {
    state: {
        mdoules: [],
        modulesParams: defaultModulesParams
    },
    getters: {
        getModules: state => state.modules,
        getModulesParams: state => state.modulesParams
    },
    mutations: {
        setModules(state, data) {
            state.modules = data
        },
        setModulesParams(state, data) {
            state.modulesParams = data
        },
        initModulesParams(state) {
            state.modulesParams = defaultModulesParams
        }
    },
    actions: {
        listModules(state) {
            const params = state.getters.getModulesParams;
            axios.get(URL_MODULES, { params: params })
                .then(response => {
                    const modules = response.data.sort((a, b) => a.order - b.order)
                    state.commit("setModules", modules)
                })
        },
    }
}
