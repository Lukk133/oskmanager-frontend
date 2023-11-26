
const URL_STUDENTS = '/students';

const defaultStudent = {
    name: "",
    lastName: "",
    email: "",
    pesel: "",
    pkk: "",
    phoneNumber: "",
    schoolId: 0
}

const defaultStudentsParams = {
    name: "",
    schoolId: 0
}

export default {
    state: {
        student: { ...defaultStudent },
        students: [],
        studentsParams: { ...defaultStudentsParams }
    },
    getters: {
        getStudent: state => state.student,
        getStudents: state => state.students,
        getStudentsParams: state => state.studentsParams
    },
    mutations: {
        setStudent(state, data) {
            state.student = data;
        },
        initStudent(state) {
            state.student = { ...defaultStudent };
        },
        setStudents(state, data) {
            state.students = data
        },
        setStudentsParams(state, data) {
            state.studentsParams = data
        },
        initStudentsParams(state) {
            state.studentsParams = { ...defaultStudentsParams }
        }
    },
    actions: {
        listStudents(state) {
            const params = state.getters.getStudentsParams;
            params.size = 100
            axios.get(URL_STUDENTS, { params: params })
                .then(response => {
                    const students = response.data.content
                    state.commit("setStudents", students)
                })
        },
        createStudent(state) {
            const student = state.getters.getStudent;
            student.password = "password"
            return axios.post(URL_STUDENTS, student)
        },
        async deleteStudent(state, id) {
            await axios.delete(URL_STUDENTS + `/${id}`)
                .then(response => {
                    console.log(response)
                })
        }
    }
}
