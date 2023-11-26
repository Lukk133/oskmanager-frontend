const URL_GEARBOXES = '/gearboxes';

export default {
    state: {
        gearboxes: [],
    },
    getters: {
        getGearboxes: state => state.gearboxes,
    },
    mutations: {
        setGearboxes(state, data) {
            state.gearboxes = data;
        },
    },
    actions: {
        listGearboxes({ commit }) {
            axios.get(URL_GEARBOXES)
                .then(response => {
                    const gearboxes = response.data;
                    commit("setGearboxes", gearboxes);
                })
                .catch(error => {
                    console.error('Error fetching gearboxes:', error);
                });
        },
    }
}
