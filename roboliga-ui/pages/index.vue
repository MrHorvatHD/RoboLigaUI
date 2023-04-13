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

        <v-row v-if="games">
            <v-col v-for="game in games" :key="game" cols="6" md="4" class="text-h5">
                <GameCard :gameId="game"/>
            </v-col>
        </v-row>
        <v-row v-else justify="center" align="center">
            <v-col cols="4" class="text-button text-grey-lighten-1 myFont">
                <v-icon icon="mdi-controller-off" size="x-large"/>
                <p>No games available</p>
            </v-col>
        </v-row>


        <v-row>
            <v-col class="text-h5 myFont">
                <v-btn color="primary">
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

    </v-container>

</template>


<script setup>

import NewGameModal from "~/components/landingPage/newGameModal.vue";
import GameCard from "~/components/landingPage/GameCard.vue";

import config from "~/config.json"

const {baseApiUrl} = useRuntimeConfig()
let dialog = ref(false)

const {data: games, refresh} = await useFetch(baseApiUrl + `/game/`, {
    method: 'GET'
})

</script>

<style scoped>
img {
    width: 25vmin;
}


</style>