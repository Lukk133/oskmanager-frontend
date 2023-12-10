import axios from 'axios';
import moment from 'moment-timezone';

const URL_RIDES = '/rides';

const defaultRidesParams = {
    schoolId: 0,
    instructorId: 0,
    instructorsIds: [],
    dates: [],
};

const defaultRidesPagination = {
    page: 1,
    size: 5
};


const defaultRide = {
    id: 0,
    startDate: moment(),
    endDate: moment(),
    note: '',
    startPlace: '',
    course: '',
    instructor: '',
    car: '',
    schoolId: 0,
    instructorId: 0
};

export default {
    state: {
        ride: { ...defaultRide },
        rides: [],
        ridesParams: { ...defaultRidesParams },
        ridesPagination: { ...defaultRidesPagination },
        ridesTotalElements: 0,
        ridesTotalPages: 0
    },
    getters: {
        getRide: state => state.ride,
        getRides: state => state.rides,
        getRidesParams: state => state.ridesParams,
        getRidesPagination: state => state.ridesPagination,
        getRidesTotalElements: state => state.ridesTotalElements,
        getRidesTotalPages: state => state.ridesTotalPages
    },
    mutations: {
        setRide(state, data) {
            state.ride = data;
        },
        initRide(state) {
            state.ride = { ...defaultRide };
        },
        setRides(state, data) {
            state.rides = data;
        },
        setRidesParams(state, data) {
            state.rideParams = { ...data };
        },
        initRidesParams(state) {
            state.ridesParams = { ...defaultRidesParams };
        },
        setRidesPagination(state, data) {
            state.ridesPagination = { ...data };
        },
        initRidesPagination(state) {
            state.ridesPagination = { ...defaultRidesPagination };
        },
        setRidesTotalElements(state, data) {
            state.ridesTotalElements = data;
        },
        setRidesTotalPages(state, data) {
            state.ridesTotalPages = data;
        }
    },
    actions: {
        listRides({ commit, getters }) {
            const params = { ...getters.getRidesParams };
            axios.get(URL_RIDES, {
                params
            })
                .then(response => {
                    const rides = response.data;
                    rides.map(ride => {
                        const [year, month, day, hour, minutes] = ride.startDate
                        ride.startDate = moment([year, month - 1, day, hour, minutes]).tz("Europe/Warsaw");
                        const [endYear, endMonth, endDay, endHour, endMinutes] = ride.endDate
                        ride.endDate = moment([endYear, endMonth - 1, endDay, endHour, endMinutes]).tz("Europe/Warsaw");
                    })
                    console.log(rides)
                    commit("setRides", rides)
                })
                .catch(error => console.error(error));
        },
        getRide({ commit }, id) {
            axios.get(`${URL_RIDES}/${id}`)
                .then(response => {
                })
                .catch(error => console.error(error));
        },
        createRide({ getters }) {
            const ride = getters.getRide;
            ride.startDate = moment(ride.startDate).tz("Europe/Warsaw").format("YYYY-MM-DDTHH:mm:ss[Z]");
            ride.endDate = moment(ride.endDate).tz("Europe/Warsaw").format("YYYY-MM-DDTHH:mm:ss[Z]");
            return axios.post(URL_RIDES, ride);
        },
        updateRide({ getters }) {
            const ride = getters.getRide;
            const id = ride.id;
            console.log(ride)
            ride.startDate = moment(ride.startDate).tz("Europe/Warsaw").format("YYYY-MM-DDTHH:mm:ss[Z]");
            ride.endDate = moment(ride.endDate).tz("Europe/Warsaw").format("YYYY-MM-DDTHH:mm:ss[Z]");
            console.log(ride)
            console.log("start UPDAING")
            return axios.put(`${URL_RIDES}/${id}`, ride);
        },
        destroyRide({ }, id) {
            return axios.delete(`${URL_RIDES}/${id}`);
        }
    }
};
