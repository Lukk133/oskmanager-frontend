import { createRouter, createWebHistory } from 'vue-router'

import Home from "./views/Home.vue"



const routes = [
    {
        name: "Home",
        path: "/home",
        component: Home,
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
    if (to.name == 'EmptyPage') {
        next("home")
    } else {
        next()
    }
})

export default router