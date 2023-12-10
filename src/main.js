import { createApp } from 'vue'
import MainLayout from './views/Main.vue'
import router from './routes.js'
import store from './store/index.js'

import "./bootstrap"

import moment from 'moment-timezone';

import vuetify from './plugins/vuetify'


moment.tz.setDefault("Europe/Warsaw");






const app = createApp(MainLayout);
app.config.globalProperties.$moment = moment;
app.use(vuetify).use(store).use(router).mount('#app')


import Ctd from "../src/components/ui/table/Ctd.vue"
import Ctr from "../src/components/ui/table/Ctr.vue"
import Icon from "../src/components/ui/icons/Icon.vue"

app.component('Ctd', Ctd)
app.component('Ctr', Ctr)
app.component('Icon', Icon)