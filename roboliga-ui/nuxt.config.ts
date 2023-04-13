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
    runtimeConfig:{
        public: {
            baseApiUrl: 'http://localhost:8088',
        }
    },
    build: {
        transpile: ["vuetify"],
    },

})