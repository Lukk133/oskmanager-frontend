import { createRouter, createWebHistory } from 'vue-router'

import Login from "./views/auth/Login.vue"
import Home from "./views/Home.vue"
import SchoolList from "./views/school/List.vue"
import SchoolCalendar from "./views/calendar/Calendar.vue"
import SchoolSettings from "./views/school/Settings.vue"
import StudentList from "./views/student/List.vue"
import InstructorList from "./views/instructor/List.vue"
import InstructorCreate from "./views/instructor/Create.vue"
import CarList from "./views/car/List.vue"
import InstructorShow from "./views/instructor/Show.vue"
import store from './store'


const routes = [
    {
        name: "Login",
        path: "/login",
        component: Login,
    },
    {
        name: "Home",
        path: "/home",
        component: Home,
        meta: { requiresAuth: true }
    },
    {
        name: "SchoolList",
        path: "/schools",
        component: SchoolList,
        meta: { requiresAuth: true }
    },
    {
        name: "SchoolSettings",
        path: "/:schoolId",
        component: SchoolSettings,
        meta: { requiresAuth: true }
    },
    {
        name: "SchoolCalendar",
        path: "/:schoolId/calendar",
        component: SchoolCalendar,
        meta: { requiresAuth: true }
    },
    {
        name: "StudentList",
        path: "/:schoolId/students",
        component: StudentList,
        meta: { requiresAuth: true }
    },
    {
        name: "InstructorCreate",
        path: "/:schoolId/instructors/create",
        component: InstructorCreate,
        meta: {
            requiresAuth: true,
        }
    },
    {
        name: "InstructorShow",
        path: "/:schoolId/instructors/:id",
        component: InstructorShow,
        meta: {
            requiresAuth: true,
        }
    },
    {
        name: "InstructorList",
        path: "/:schoolId/instructors",
        component: InstructorList,
        meta: {
            requiresAuth: true,
        }
    },
    {
        name: "CarList",
        path: "/:schoolId/cars",
        component: CarList,
        meta: { requiresAuth: true }
    },
    {
        name: "EmptyPage",
        path: "/"
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

router.beforeEach((to, from, next) => {
    if (from.name) {
        window.scrollTo(0, 0)
    }
    if (to.name === 'EmptyPage') {
        next('/login');
    }
    const token = localStorage.getItem('access_token');
    if (token) {
        store.commit('setIsAuthenticated', true);
    }
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = store.getters.getIsAuthenticated;

    if (requiresAuth && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }
})

export default router