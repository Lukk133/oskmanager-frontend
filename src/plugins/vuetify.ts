import { ThemeDefinition, createVuetify } from 'vuetify'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'


import { pl } from 'vuetify/locale'

const customLightTheme: ThemeDefinition = {
    dark: false,
    colors: {
        "background": "#E8ECF4",
        "solitude": "#F5F7FA",
        "arsenic": "#41494E",
        "forsetGreen": "#2A9A2F",
        "atomic": "#3C4B52"
    }
}

const customThemes = { customLightTheme: customLightTheme }

const vuetify = createVuetify({
    locale: {
        locale: 'pl',
        fallback: 'pl',
        messages: { pl },
    },
    theme: {
        defaultTheme: 'customLightTheme',
        themes: {
            customLightTheme,
        }
    }
})

export default vuetify;
