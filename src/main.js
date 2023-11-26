import { createApp } from 'vue'
import MainLayout from './views/Main.vue'
import router from './routes.js'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'


import store from './store/index.js'
import customThemes from './plugins/colors.ts'

import "./bootstrap"

import moment from 'moment'


const customLightTheme = customThemes.customLightTheme;

const vuetify = createVuetify({
    theme: {
        defaultTheme: 'customLightTheme',
        themes: {
            customLightTheme,
        }
    }
})


const app = createApp(MainLayout);
app.config.globalProperties.$moment = moment;
app.use(vuetify).use(store).use(router).mount('#app')
