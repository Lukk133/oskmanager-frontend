const URL_INSTRUCTORS = "/instructors";

const defaultInstructorsParams = {
    name: "",
    schoolId: 0,
    categoryId: 0,
    avatarId: 0,
    carId: 0,
};

const defaultInstructorsPagination = {
    page: 1,
    size: 5,
};

const defaultInstructor = {
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    schoolId: 0,
    categoryId: 0,
};
export default {
    state: {
        instructor: { ...defaultInstructor },
        instructors: [],
        instructorsParams: { ...defaultInstructorsParams },
        instructorsPagination: { ...defaultInstructorsPagination },
        instructorsTotalElements: 0,
        instructorsTotalPages: 0,
    },
    getters: {
        getInstructor: (state) => state.instructor,
        getInstructors: (state) => state.instructors,
        getInstructorsParams: (state) => state.instructorsParams,
        getInstructorsPagination: (state) => state.instructorsPagination,
        getInstructorsTotalElements: (state) => state.instructorsTotalElements,
        getInstructorsTotalPages: (state) => state.instructorsTotalPages,
    },
    mutations: {
        setInstructor(state, data) {
            state.instructor = data;
        },
        initInstructor(state) {
            state.instructor = { ...defaultInstructor };
        },
        setInstructors(state, data) {
            state.instructors = data;
        },
        setInstructorsParams(state, data) {
            state.instructorsParams = data;
        },
        initInstructorsParams(state) {
            state.instructorsParams = { ...defaultInstructorsParams };
        },
        setInstructorsPagination(state, data) {
            state.instructorsPagination = data;
        },
        initInstructorsPagination(state) {
            state.instructorsPagination = { ...defaultInstructorsPagination };
        },
        setInstructorsTotalElements(state, data) {
            state.instructorsTotalElements = data;
        },
        setInstructorsTotalPages(state, data) {
            state.instructorsTotalPages = data;
        },
    },
    actions: {
        async listInstructors({ commit, getters }) {
            let params = getters.getInstructorsParams;
            const pagination = getters.getInstructorsPagination;
            params.size = pagination.size;
            params.page = pagination.page - 1;
            await axios.get(URL_INSTRUCTORS, { params: params }).then((response) => {
                const data = response.data;
                commit("setInstructors", data.content);
                commit("setInstructorsTotalPages", data.totalPages);
                commit("setInstructorsTotalElements", data.totalElements);
            });
        },
        getInstructor({ commit }, id) {
            axios
                .get(`${URL_INSTRUCTORS}/${id}`)
                .then((response) => {
                    const instructor = response.data;
                    commit("setInstructor", instructor);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        createInstructor({ getters }) {
            const instructor = getters.getInstructor;
            console.log(instructor);
            instructor.password = "password";
            return axios.post(URL_INSTRUCTORS, instructor);
        },
        async deleteInstructor({ }, id) {
            await axios.delete(`${URL_INSTRUCTORS}/${id}`).then((response) => {
                console.log(response);
            });
        },
    },
};
