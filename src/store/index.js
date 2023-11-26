import { createStore } from 'vuex'

import notifications from './modules/notifications'
import auth from './modules/auth'
import students from './modules/students'
import instructors from './modules/instructors'
import schools from './modules/schools'
import modules from './modules/modules'
import gearboxes from './modules/gearboxes'
import categories from './modules/categories'
import coursesTypes from './modules/courseTypes'
import brands from './modules/brands'
import models from './modules/models'
import cars from './modules/cars'

export default createStore({
    plugins: [
    ],
    modules: {
        notifications,
        auth,
        schools,
        students,
        instructors,
        modules,
        gearboxes,
        categories,
        coursesTypes,
        brands,
        models,
        cars
    },
})
