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

        {{pending}}
        {{error}}
        {{games}}

        <v-row v-if="pending" justify="center" align="center">
            <v-col cols="4" class="text-button text-grey-lighten-1 myFont">
                <v-progress-circular indeterminate color="primary"/>
                <p>Loading games</p>
            </v-col>
        </v-row>

        <span v-else-if="games && games.length > 0">

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
                <v-icon icon="mdi-controller-off" size="x-large"/>
                <p>{{!pending && !error ? 'No games available' : 'Error while fetching games' }}</p>
            </v-col>
        </v-row>


    </v-container>

</template>


<script setup>

import NewGameModal from "~/components/landingPage/newGameModal.vue";
import GameCard from "~/components/landingPage/GameCard.vue";

import config from "~/config.json"
import {useAuthStore} from "~/stores/auth";
import {useLazyFetch} from "#app";

const {baseApiUrl} = useRuntimeConfig()
let dialog = ref(false)
const auth = useAuthStore()

const {data: games, refresh, pending, error} = useLazyFetch(baseApiUrl + `/game/`, {
    method: 'GET',
    default: () => [],
    immediate: false,
})
refresh()

const myGames = computed(() => {
    return games.value.filter(g => auth.getMyGames.includes(g)) || []
})

const otherGames = computed(() => {
    return games.value.filter(g => !auth.getMyGames.includes(g)) || []
})

auth.resetGameState(games.value)


</script>

<style scoped>
img {
    width: 25vmin;
}


</style>