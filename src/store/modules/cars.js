const URL_CARS = "/cars";

const defaultCarsParams = {
  schoolId: 0,
  categoryId: 0,
};
const defaultCarsPagination = {
  page: 1,
  size: 5,
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
    carsParams: { ...defaultCarsParams },
    carsPagination: { ...defaultCarsPagination },
    carsTotalElements: 0,
    carsTotalPages: 0,
  },
  getters: {
    getCar: (state) => state.car,
    getCars: (state) => state.cars,
    getCarsParams: (state) => state.carsParams,
    getCarsPagination: (state) => state.carsPagination,
    getCarsTotalElements: (state) => state.carsTotalElements,
    getCarsTotalPages: (state) => state.carsTotalPages,
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
    },
    setCarsPagination(state, data) {
      state.carsPagination = data;
    },
    initCarsPagination(state) {
      state.carsPagination = { ...defaultCarsPagination };
    },
    setCarsTotalElements(state, data) {
      state.carsTotalElements = data;
    },
    setCarsTotalPages(state, data) {
      state.carsTotalPages = data;
    },
  },
  actions: {
    async listCars({ commit, getters }) {
      let params = getters.getCarsParams;
      const pagination = getters.getCarsPagination;
      params.size = pagination.size;
      params.page = pagination.page - 1;
      console.log(params);
      console.log("params");
      await axios.get(URL_CARS, { params: params }).then((response) => {
        console.log(response);
        const data = response.data.content;
        console.log(data.totalElements);
        console.log(data.totalPages);
        commit("setCars", data);
        commit("setCarsTotalPages", response.data.totalPages);
        commit("setCarsTotalElements", response.data.totalElements);
      });
    },
    getCar({ commit }, id) {
      axios
        .get(`${URL_CARS}/${id}`)
        .then((response) => {
          const car = response.data;
          commit("setCar", car);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createCar({ getters }) {
      const car = getters.getCar;
      //   car.password = "password";
      return axios.post(URL_CARS, car);
    },
    async deleteCar({}, id) {
      await axios.delete(`${URL_CARS}/${id}`).then((response) => {
        console.log(response);
      });
    },
  },
};
