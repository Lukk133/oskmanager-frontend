export default {
    state: {
        showEror: false,
        errors: [],
        error: "",
        showMessage: false,
        messages: [],
        message: "",

    },
    getters: {
        getShowError: state => state.showError,
        getErrors: state => state.errors,
        getError: state => state.error,
        getShowMessage: state => state.showMessage,
        getMessages: state => state.messages,
        getMessage: state => state.message
    },
    mutations: {
        setShowError(state, data) {
            state.showError = data;
        },
        setErrors(state, data) {
            state.errors = data;
        },
        setError(state, data) {
            state.error = data;
        },
        setShowMessage(state, data) {
            state.showMessage = data;
        },
        setMessages(state, data) {
            state.messages = data;
        },
        setMessage(state, data) {
            state.message = data;
        }
    },
    actions: {
        showError(state, error) {
            console.log("showinf")
            console.log(error)
            state.commit("setShowError", true);
            state.commit("setError", error);
        },
        showMessage(state, message) {
            state.commit("setShowMessage", true);
            state.commit("setMessage", message);
        },
    }
}
