const URL_CONVERSATIONS = "/conversations";

const defaultConversationsParams = {
    schoolId: 0,
    userId: 0,
}

export default {
    state: {
        conversations: [],
        conversation: "",
        conversationsParams: { ...defaultConversationsParams }
    },
    getters: {
        getConversations: (state) => state.conversations,
        getConversation: (state) => state.conversation,
        getConversationsParams: (state) => state.conversationsParams,
    },
    mutations: {
        setConversations(state, data) {
            state.conversations = data;
        },
        setConversation(state, data) {
            state.conversation = data;
        },
        setConversationsParams(state, data) {
            state.conversationsParams = data;
        },
    },
    actions: {
        listConversations({ commit, getters }) {
            const params = getters.getConversationsParams;

            console.log(params);
            axios
                .get(URL_CONVERSATIONS, { params })
                .then(response => {
                    const conversations = response.data;
                    console.log(response.data);
                    commit("setConversations", conversations);
                })
                .catch(error => {
                    console.error("Error fetching conversations:", error);
                });
        },
        createConversation({ commit }, params) {
            axios
                .post(URL_CONVERSATIONS, params)
                .then((response) => {
                    const conversations = response.data;
                    console.log(conversations);
                    //  return conversations
                })
                .catch((error) => {
                    console.error("Error fetching conversations:", error);
                    throw error;
                });
        },
    },
};
