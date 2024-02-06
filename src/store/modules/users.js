const URL_USERS = "/users";

const defaultUsersParams = {
    schoolId: 0,
    userType: "INSTRUCTOR"
}

export default {
    state: {
        users: [],
        user: "",
        usersParams: { ...defaultUsersParams },
    },
    getters: {
        getUsers: (state) => state.users,
        getUser: (state) => state.user,
        getUsersParams: (state) => state.usersParams,
    },
    mutations: {
        setUsers(state, data) {
            state.users = data;
        },
        setUser(state, data) {
            state.user = data;
        },
        setUsersParams(state, data) {
            state.usersParams = data;
        },
        initUsersParams(state) {
            state.usersParams = { ...defaultUsersParams };
        },
    },
    actions: {
        listUsers({ commit, getters }) {
            const params = getters.getUsersParams
            params.fullName = params.fullName
            console.log(params);
            axios
                .get(`${URL_USERS}/available`, { params: params })
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
