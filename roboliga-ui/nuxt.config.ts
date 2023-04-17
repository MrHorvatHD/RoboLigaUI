// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            meta: [
                {name: "description", content: "User interface for FRI RoboLiga"}
            ],
            title: "RoboLiga",
        }
    },
    css: [
        "vuetify/lib/styles/main.sass",
        "@mdi/font/css/materialdesignicons.min.css"
    ],
    modules: [
        '@pinia/nuxt',
    ],
    runtimeConfig:{
        public: {
            baseApiUrl: 'http://192.168.0.3:8088',
            //baseApiUrl: 'http://localhost:8088',
        }
    },
    build: {
        transpile: ["vuetify"],
    },

})