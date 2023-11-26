const URL_BRANDS = '/brands';

export default {
    state: {
        brands: [],
    },
    getters: {
        getBrands: state => state.brands,
    },
    mutations: {
        setBrands(state, data) {
            state.brands = data;
        },
    },
    actions: {
        listBrands({ commit }) {
            axios.get(URL_BRANDS)
                .then(response => {
                    const brands = response.data;
                    commit("setBrands", brands);
                })
                .catch(error => {
                    console.error('Error fetching brands:', error);
                });
        },
    }
}
