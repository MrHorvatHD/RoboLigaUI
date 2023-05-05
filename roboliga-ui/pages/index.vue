<template>
    <v-container class="text-center">

        <v-row justify="center" align="center">
            <v-col>
                <img class="ma-auto" src="/Robo-liga-FRI-2023-logo-Dark.svg" alt="logo"/>
            </v-col>
        </v-row>

        <v-row justify="center" align="center">
            <v-col class="text-h2 myFont">
                {{ config.name }}
            </v-col>
        </v-row>
        <v-row>
            <v-col class="text-h5 myFont">
                User interface for RoboLiga competition
            </v-col>
        </v-row>

        <v-row>
            <v-col class="text-h5 myFont">
                <v-btn color="primary" :disabled="serverDown" @click="">
                    New Game
                    <v-dialog
                            v-model="dialog"
                            activator="parent"
                            persistent
                            max-width="800"
                    >
                        <NewGameModal @gameCreated="refresh" @closeModal="dialog=false"></NewGameModal>
                    </v-dialog>
                </v-btn>
            </v-col>
        </v-row>

        <span v-if="myGames.length > 0 || otherGames.length > 0 ">

            <!-- Games created by user -->
            <v-row>
                <v-col class="text-h6 myFont">
                    Created games
                </v-col>
                <v-divider/>
            </v-row>
            <v-row>
                <v-col v-for="game in myGames" :key="game" cols="6" md="4"
                       class="text-h5">
                    <GameCard :gameId="game" @gameDeleted="refresh"/>
                </v-col>
            </v-row>

            <!-- All possible games -->
            <v-row>
                <v-col class="text-h6 myFont">
                    Other games
                </v-col>
                <v-divider/>
            </v-row>

            <v-row>
                <v-col v-for="game in otherGames" :key="game" cols="6" md="4"
                       class="text-h5">
                    <GameCard :gameId="game" @gameDeleted="refresh"/>
                </v-col>
            </v-row>


        </span>
        <v-row v-else justify="center" align="center">
            <v-col cols="4" class="text-button text-grey-lighten-1 myFont">
                <v-icon :icon="serverDown ? 'mdi-server-off' : 'mdi-controller-off'" size="x-large"/>
                <p>{{serverDown ? 'No response from server' : 'No games available'}}</p>
            </v-col>
        </v-row>


    </v-container>

</template>


<script setup>

import NewGameModal from "~/components/landingPage/newGameModal.vue";
import GameCard from "~/components/landingPage/GameCard.vue";

import config from "~/config.json"
import {useAuthStore} from "~/stores/auth";

const {baseApiUrl} = useRuntimeConfig()
let dialog = ref(false)
const auth = useAuthStore()

const serverDown = ref(true)

const {data: games, refresh} = await useFetch(baseApiUrl + `/game/`, {
    method: 'GET',
    server: false,
    onResponse({ request, response, options }) {
        // Process the response data
        serverDown.value = false
        setTimeout(() => {
            auth.resetGameState(response._data)
        }, 500);

    },
    onResponseError({ request, response, options }) {
        // Handle the response errors
        serverDown.value = false
    },
    onRequest({ request, options }) {
        // Set the request headers
        serverDown.value = true
    },
    onRequestError({ request, options, error }) {
        // Handle the request errors
        serverDown.value = true
    },
})

const myGames = computed(() => {

    return !!games.value && games.value.filter(g => auth.getMyGames.includes(g)) || []
})

const otherGames = computed(() => {

    return !!games.value && games.value.filter(g => !auth.getMyGames.includes(g)) || []
})

</script>

<style scoped>
img {
    width: 25vmin;
}


</style>