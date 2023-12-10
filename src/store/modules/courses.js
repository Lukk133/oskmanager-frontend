const URL_COURSES = '/courses';

const defaultCourse = {
    courseTypeId: 0,
    studentId: 0,
    mainInstructorId: 0,
    date: new Date()
};

const defaultCoursesParams = {
    schoolId: 0,
    mainInstructorId: 0,
    studentFullName: ""
};

const defaultCoursesPagination = {
    page: 1,
    size: 10
};

export default {
    state: {
        course: { ...defaultCourse },
        courses: [],
        coursesParams: { ...defaultCoursesParams },
        coursesPagination: { ...defaultCoursesPagination },
    },
    getters: {
        getCourse: state => state.course,
        getCourses: state => state.courses,
        getCoursesParams: state => state.coursesParams,
        getCoursesPagination: state => state.coursesPagination,
    },
    mutations: {
        setCourse(state, data) {
            state.course = data;
        },
        initCourse(state) {
            state.course = { ...defaultCourse };
        },
        setCourses(state, data) {
            state.courses = data;
        },
        setCoursesParams(state, params) {
            state.coursesParams = params;
        },
        initCoursesParams(state) {
            state.coursesParams = { ...defaultCoursesParams };
        },
        setCoursesPagination(state, pagination) {
            state.coursesPagination = pagination;
        },
        initCoursesPagination(state) {
            state.coursesPagination = { ...defaultCoursesPagination };
        },
    },
    actions: {
        listCourses({ commit, state }) {
            const params = {
                ...state.coursesParams,
                page: state.coursesPagination.page - 1,
                size: state.coursesPagination.size,
            };
            console.log(params)
            console.log("params")
            axios.get(URL_COURSES, { params })
                .then(response => {
                    const data = response.data.content;
                    commit("setCourses", data);
                });
        },
        createCourse({ getters }) {
            const course = getters.getCourse;
            return axios.post(URL_COURSES, course);
        },
        async deleteCourse({ }, id) {
            await axios.delete(`${URL_COURSES}/${id}`)
                .then(response => {
                    console.log(response);
                });
        }
    }
}
