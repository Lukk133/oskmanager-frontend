const URL_USERS = "/users";

export default {
    state: {
        users: [],
        user: ""
    },
    getters: {
        getUsers: (state) => state.users,
        getUser: (state) => state.user,
    },
    mutations: {
        setUsers(state, data) {
            state.users = data;
        },
        setUser(state, data) {
            state.user = data;
        },
    },
    actions: {
        listUsers({ commit }) {
            axios
                .get(URL_USERS)
                .then((response) => {
                    const users = response.data;
                    console.log(response.data);
                    commit("setUsers", users);
                })
                .catch((error) => {
                    console.error("Error fetching users:", error);
                });
        },
        getLoggedUser({ commit }) {
            axios
                .get(`${URL_USERS}/get-actual`)
                .then((response) => {
                    const user = response.data;
                    console.log(response.data);
                    commit("setUser", user);
                })
                .catch((error) => {
                    console.error("Error fetching users:", error);
                });
        },
    },
};
