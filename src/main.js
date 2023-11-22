import { createApp } from 'vue'
import MainLayout from './views/Main.vue'
import router from './routes.js'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'


import store from './store/index.js'
import customThemes from './plugins/colors.ts'

import "./bootstrap"



const customLightTheme = customThemes.customLightTheme;

const vuetify = createVuetify({
    theme: {
        defaultTheme: 'customLightTheme',
        themes: {
            customLightTheme,
        }
    }
})

console.log(vuetify)

const app = createApp(MainLayout);
app.use(vuetify).use(store).use(router).mount('#app')
