const URL_MESSAGES = "/messages";

const defaultMessagesParams = {
    conversationId: 0,
}

export default {
    state: {
        messages: [],
        message: "",
        messagesParams: { ...defaultMessagesParams }
    },
    getters: {
        getMessages: (state) => state.messages,
        getMessage: (state) => state.message,
        getMessagesParams: (state) => state.messagesParams,
    },
    mutations: {
        setMessages(state, data) {
            state.messages = data;
        },
        setMessage(state, data) {
            state.message = data;
        },
        setMessagesParams(state, data) {
            state.messagesParams = data;
        },
    },
    actions: {
        listMessages({ commit, getters }) {
            const params = getters.getMessagesParams;
            axios
                .get(URL_MESSAGES, { params })
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
