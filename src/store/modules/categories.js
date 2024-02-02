const URL_CATEGORIES = "/categories";

export default {
    state: {
        categories: [],
    },
    getters: {
        getCategories: (state) => state.categories,
    },
    mutations: {
        setCategories(state, data) {
            state.categories = data;
        },
    },
    actions: {
        listCategories({ commit }) {
            axios
                .get(URL_CATEGORIES)
                .then((response) => {
                    const categories = response.data;
                    commit("setCategories", categories);
                })
                .catch((error) => {
                    console.error("Error fetching categories:", error);
                });
        },
    },
};
