
const URL_SCHOOLS = '/schools';

const defaultSchoolsParams = {
    name: ""
}

const defaultSchool = {
    name: "",
    code: "",
    location: {}
}

export default {
    state: {
        school: { ...defaultSchool },
        schools: [],
        schoolsParams: { ...defaultSchoolsParams }
    },
    getters: {
        getSchool: state => state.school,
        getSchools: state => state.schools,
        getSchoolsParams: state => state.schoolsParams
    },
    mutations: {
        setSchool(state, data) {
            state.school = data;
        },
        initSchool(state) {
            state.school = { ...defaultSchool };
        },
        setSchools(state, data) {
            state.schools = data
        },
        setSchoolsParams(state, data) {
            state.schoolsParams = data
        },
        initSchoolsParams(state) {
            state.schoolsParams = defaultSchoolsParams
        }
    },
    actions: {
        listSchools({ getters, commit }) {
            const params = getters.getSchoolsParams;
            axios.get(URL_SCHOOLS, { params: params })
                .then(response => {
                    const schools = response.data
                    commit("setSchools", schools)
                })
        },
        getSchool({ commit }, id) {
            axios.get(URL_SCHOOLS + `/${id}`)
                .then(response => {
                    const school = response.data
                    commit("setSchool", school)
                })
        },
        createSchool({ getters }) {
            const school = getters.getSchool
            return axios.post(URL_SCHOOLS, school)
        },
        async deleteSchool({ }, id) {
            await axios.delete(URL_SCHOOLS + `/${id}`)
                .then(response => {
                    console.log(response)
                })
        }
    }
}
