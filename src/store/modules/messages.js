const URL_MESSAGES = "/messages";

export default {
    state: {
        messages: [],
        message: ""
    },
    getters: {
        getMessages: (state) => state.messages,
        getMessage: (state) => state.message,
    },
    mutations: {
        setMessages(state, data) {
            state.messages = data;
        },
        setMessage(state, data) {
            state.message = data;
        },
    },
    actions: {
        listMessages({ commit }, params) {
            console.log(params);
            axios
                .get(URL_MESSAGES, { params: params })
                .then((response) => {
                    const messages = response.data;
                    console.log(messages);
                    commit("setMessages", messages);
                })
                .catch((error) => {
                    console.error("Error fetching messages:", error);
                });
        },
        sendMessage({ commit }, params) {
            console.log(params);
            axios
                .post(URL_MESSAGES, params)
                .then((response) => {
                    const messages = response.data;
                    console.log(messages);
                    commit("setMessages", messages);
                })
                .catch((error) => {
                    console.error("Error fetching messages:", error);
                });
        },
    },
};
