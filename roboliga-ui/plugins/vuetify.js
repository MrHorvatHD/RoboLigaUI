import { createVuetify} from "vuetify";
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const myThemeLight = {
    dark: false,
    colors: {
        //background: '#FFFFFF',
        //surface: '#FFFFFF',
        primary: '#0D47A1',
        //'primary-darken-1': '#3700B3',
        secondary: '#cff0fc',
        //'secondary-darken-1': '#018786',
        //error: '#B00020',
        //info: '#2196F3',
        //success: '#4CAF50',
        //warning: '#FB8C00',
    }
}

export default defineNuxtPlugin(nuxtApp => {
    const vuetify = createVuetify({
        ssr: true,
        components,
        directives,
        theme:{
            defaultTheme: "myThemeLight",
            themes: {
                myThemeLight,
            }
        }
    })
    nuxtApp.vueApp.use(vuetify)
})