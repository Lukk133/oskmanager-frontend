const URL_STUDENTS = "/students";

const defaultStudent = {
    name: "",
    lastName: "",
    email: "",
    pesel: "",
    pkk: "",
    phoneNumber: "",
    schoolId: 0,
};

const defaultStudentsParams = {
    name: "",
    fullName: "",
    schoolId: 0,
};
const defaultStudentsPagination = {
    page: 1,
    size: 5,
};

export default {
    state: {
        student: { ...defaultStudent },
        students: [],
        studentsParams: { ...defaultStudentsParams },
        studentsPagination: { ...defaultStudentsPagination },
        studentsTotalElements: 0,
        studentsTotalPages: 0,
    },
    getters: {
        getStudent: (state) => state.student,
        getStudents: (state) => state.students,
        getStudentsParams: (state) => state.studentsParams,
        getStudentsPagination: (state) => state.studentsPagination,
        getStudentsTotalElements: (state) => state.studentsTotalElements,
        getStudentsTotalPages: (state) => state.studentsTotalPages,
    },
    mutations: {
        setStudent(state, data) {
            state.student = data;
        },
        initStudent(state) {
            state.student = { ...defaultStudent };
        },
        setStudents(state, data) {
            state.students = data;
        },
        setStudentsParams(state, data) {
            state.studentsParams = data;
        },
        initStudentsParams(state) {
            state.studentsParams = { ...defaultStudentsParams };
        },
        setStudentsPagination(state, data) {
            state.studentsPagination = data;
        },
        initStudentsPagination(state) {
            state.studentsPagination = { ...defaultStudentsPagination };
        },
        setStudentsTotalElements(state, data) {
            state.studentsTotalElements = data;
        },
        setStudentsTotalPages(state, data) {
            state.studentsTotalPages = data;
        },
    },
    actions: {
        async listStudents({ commit, getters }) {
            const params = getters.getStudentsParams;
            const pagination = getters.getStudentsPagination;
            params.size = pagination.size;
            params.page = pagination.page - 1;
            await axios.get(URL_STUDENTS, { params: params }).then((response) => {
                const students = response.data.content;
                console.log(response.data.totalPages);
                commit("setStudents", students);
                commit("setStudentsTotalPages", response.data.totalPages);
                commit("setStudentsTotalElements", response.data.totalElements);
            });
        },
        createStudent(state) {
            const student = state.getters.getStudent;
            return axios.post(URL_STUDENTS, student);
        },
        async deleteStudent(state, id) {
            await axios.delete(URL_STUDENTS + `/${id}`).then((response) => {
                console.log(response);
            });
        },
    },
};
