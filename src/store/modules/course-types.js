import axios from "axios";

const URL_COURSE_TYPES = '/course-types';

const defaultCourseTypesParams = {
    schoolId: 0
}
const defaultCourseType = {
    name: "",
    estimatedTime: 0,
    cost: 0,
    gearboxId: 0,
    categoryId: 0,
    schoolId: 0,
}

export default {
    state: {
        courseType: { ...defaultCourseType },
        courseTypes: [],
        courseTypesParams: { ...defaultCourseTypesParams }
    },
    getters: {
        getCourseType: state => state.courseType,
        getCourseTypes: state => state.courseTypes,
        getCourseTypesParams: state => state.courseTypesParams
    },
    mutations: {
        setCourseType(state, data) {
            state.courseType = data;
        },
        initCourseType(state) {
            state.courseType = { ...defaultCourseType };
        },
        setCourseTypes(state, data) {
            state.courseTypes = data;
        },
        setCourseTypesParams(state, data) {
            state.courseTypesParams = data
        },
        initCourseTypesParams(state) {
            state.courseType = { ...defaultCourseTypesParams };
        },
    },
    actions: {
        listCourseTypes({ commit, getters }) {
            const params = getters.getCourseTypesParams
            axios.get(URL_COURSE_TYPES, { params: params })
                .then(response => {
                    const courseTypes = response.data
                    commit("setCourseTypes", courseTypes)
                })
        },
        createCourseType({ getters }) {
            const courseType = getters.getCourseType
            return axios.post(URL_COURSE_TYPES, courseType)
        },
        async deleteCourseType({ }, id) {
            await axios.delete(`${URL_COURSE_TYPES}/${id}`)
                .then(response => {
                    console.log(response)
                })
        }
    }
}
