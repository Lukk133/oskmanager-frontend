const URL_LOCATIONS = '/locations';

const defaultLocationsParams = {
    address: "",
    cityId: 0,
}

const defaultLocationsPagination = {
    page: 1,
    size: 5
}

const defaultLocation = {
    address: "",
    cityId: 0,
}

export default {
    state: {
        location: { ...defaultLocation },
        locations: [],
        locationsParams: { ...defaultLocationsParams },
        locationsPagination: { ...defaultLocationsPagination },
        locationsTotalElements: 0,
        locationsTotalPages: 0
    },
    getters: {
        getLocation: state => state.location,
        getLocationId: state => state.location.id,

        getLocations: state => state.locations,
        getLocationsParams: state => state.locationsParams,
        getLocationsPagination: state => state.locationsPagination,
        getLocationsTotalElements: state => state.locationsTotalElements,
        getLocationsTotalPages: state => state.locationsTotalPages,
    },
    mutations: {
        setLocation(state, data) {
            state.location = data;
        },
        initLocation(state) {
            state.location = { ...defaultLocation }
        },
        setLocationAddress(state, data) {
            state.location.address = data
        },
        setLocations(state, data) {
            state.locations = data;
        },
        setLocationsParams(state, data) {
            state.locationsParams = data;
        },
        initLocationsParams(state) {
            state.locationsParams = { ...defaultLocationsParams };
        },
        setLocationsPagination(state, data) {
            state.locationsPagination = data;
        },
        initLocationsPagination(state) {
            state.locationsPagination = { ...defaultLocationsPagination };
        },
        setLocationsTotalElements(state, data) {
            state.locationsTotalElements = data;
        },
        setLocationsTotalPages(state, data) {
            state.locationsTotalPages = data;
        }
    },
    actions: {
        async listLocations({ commit, getters }) {
            let params = getters.getLocationsParams;
            const pagination = getters.getLocationsPagination;
            params.size = pagination.size
            params.page = pagination.page - 1
            console.log(params)
            await axios.get(URL_LOCATIONS, { params: params })
                .then(response => {
                    const data = response.data;
                    commit("setLocations", data.content);
                    commit("setLocationsTotalPages", data.totalPages);
                    commit("setLocationsTotalElements", data.totalElements);
                });
        },
        getLocation({ commit }, id) {
            axios.get(`${URL_LOCATIONS}/${id}`)
                .then(response => {
                    const location = response.data
                    commit("setLocation", location)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        async createLocation({ getters }) {
            const location = getters.getLocation;
            return axios.post(URL_LOCATIONS, location)
        },
        async deleteLocation({ }, id) {
            await axios.delete(`${URL_LOCATIONS}/${id}`)
                .then(response => {
                    console.log(response);
                });
        }
    }
}
