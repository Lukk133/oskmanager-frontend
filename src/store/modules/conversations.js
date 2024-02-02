const URL_CONVERSATIONS = "/conversations";

export default {
    state: {
        conversations: [],
        conversation: ""
    },
    getters: {
        getConversations: (state) => state.conversations,
        getConversation: (state) => state.conversation,
    },
    mutations: {
        setConversations(state, data) {
            state.conversations = data;
        },
        setConversation(state, data) {
            state.conversation = data;
        },
    },
    actions: {
        listConversations({ commit }) {
            axios
                .get(URL_CONVERSATIONS)
                .then((response) => {
                    const conversations = response.data;
                    console.log(response.data);
                    commit("setConversations", conversations);
                })
                .catch((error) => {
                    console.error("Error fetching conversations:", error);
                });
        },
    },
};
