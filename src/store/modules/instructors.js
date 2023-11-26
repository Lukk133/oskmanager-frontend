const URL_INSTRUCTORS = '/instructors';

const defaultInstructorsParams = {
    name: "",
    schoolId: 0
}
const defaultInstructor = {
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    schoolId: 0,
    cousreTypeId: 0
}
export default {
    state: {
        instructor: { ...defaultInstructor },
        instructors: [],
        instructorsParams: { ...defaultInstructorsParams }
    },
    getters: {
        getInstructor: state => state.instructor,
        getInstructors: state => state.instructors,
        getInstructorsParams: state => state.instructorsParams
    },
    mutations: {
        setInstructor(state, data) {
            state.instructor = data;
        },
        initInstructor(state) {
            state.instructor = { ...defaultInstructor }
        },
        setInstructors(state, data) {
            state.instructors = data;
        },
        setInstructorsParams(state, data) {
            state.instructorsParams = data;
        },
        initInstructorsParams(state) {
            state.instructorsParams = { ...defaultInstructorsParams };
        }
    },
    actions: {
        listInstructors({ commit, getters }) {
            const params = getters.getInstructorsParams;
            params.size = 100;
            axios.get(URL_INSTRUCTORS, { params: params })
                .then(response => {
                    const instructors = response.data.content;
                    commit("setInstructors", instructors);
                });
        },
        createInstructor({ getters }) {
            const instructor = getters.getInstructor;
            instructor.password = "password"
            return axios.post(URL_INSTRUCTORS, instructor)
        },
        async deleteInstructor({ }, id) {
            await axios.delete(`${URL_INSTRUCTORS}/${id}`)
                .then(response => {
                    console.log(response);
                });
        }
    }
}