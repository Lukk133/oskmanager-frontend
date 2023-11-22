import { createStore } from 'vuex'

import notifications from './modules/notifications'

export default createStore({
    plugins: [
    ],
    modules: {
        notifications,
    },
})
