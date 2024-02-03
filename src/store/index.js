import { createStore } from 'vuex'

import notifications from './modules/notifications'
import auth from './modules/auth'
import students from './modules/students'
import instructors from './modules/instructors'
import schools from './modules/schools'
import modules from './modules/modules'
import gearboxes from './modules/gearboxes'
import categories from './modules/categories'
import coursesTypes from './modules/course-types'
import brands from './modules/brands'
import models from './modules/models'
import cars from './modules/cars'
import courses from './modules/courses'
import fileInfos from './modules/fileInfos'
import rides from './modules/rides'
import calendar from './modules/calendar'
import locations from './modules/locations'
import converations from './modules/conversations'
import users from './modules/users'
import messages from './modules/messages'

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
        cars,
        courses,
        fileInfos,
        rides,
        calendar,
        locations,
        converations,
        users,
        messages
    },
})
