const URL_CARS = '/cars';

const defaultCarsParams = {
    schoolId: 0,
    categoryId: 0
};
const defaultCar = {
    brandId: 0,
    modelId: 0,
    gearboxId: 0,
    schoolId: 0,
    color: "",
    registration: "",
    vin: "",
};

export default {
    state: {
        car: { ...defaultCar },
        cars: [],
        carsParams: { ...defaultCarsParams }
    },
    getters: {
        getCar: state => state.car,
        getCars: state => state.cars,
        getCarsParams: state => state.carsParams
    },
    mutations: {
        setCar(state, data) {
            state.car = data;
        },
        initCar(state) {
            state.car = { ...defaultCar };
        },
        setCars(state, data) {
            state.cars = data;
        },
        setCarsParams(state, data) {
            state.carsParams = data;
        },
        initCarsParams(state) {
            state.carsParams = { ...defaultCarsParams };
        }
    },
    actions: {
        listCars({ commit, getters }) {
            const params = getters.getCarsParams;
            console.log(params)
            console.log("params")
            axios.get(URL_CARS, { params: params })
                .then(response => {
                    const cars = response.data;
                    commit("setCars", cars);
                });
        },
        createCar({ getters }) {
            const car = getters.getCar;
            return axios.post(URL_CARS, car);
        },
        async deleteCar({ }, id) {
            await axios.delete(`${URL_CARS}/${id}`)
                .then(response => {
                    console.log(response);
                });
        }
    }
}
