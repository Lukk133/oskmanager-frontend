const URL_MODELS = '/models';

const defaultModelsParams = {
    brandId: 0
}

export default {
    state: {
        models: [],
        modelsParams: { ...defaultModelsParams }
    },
    getters: {
        getModels: state => state.models,
        getModelsParams: state => state.modelsParams,
    },
    mutations: {
        setModels(state, data) {
            state.models = data;
        },
        setModelsParams(state, data) {
            state.modelsParams = data;
        },
        initModelsParams(state) {
            state.modelsParams = { ...defaultModelsParams }
        }
    },
    actions: {
        listModels({ commit, getters }) {
            const params = getters.getModelsParams
            axios.get(URL_MODELS, { params: params })
                .then(response => {
                    console.log(response)
                    const models = response.data;
                    commit("setModels", models);
                })
                .catch(error => {
                    console.error('Error fetching models:', error);
                });
        },
    }
}
