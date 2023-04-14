<template>
    <v-container fluid class="ma-0 pa-0">
        <v-row justify="center" align="center">
            <ControlPanel :game_on="gameState.game_on" :game_paused="gameState.game_paused"
                          :teamsId="[teamBlueId,teamRedId]"></ControlPanel>
        </v-row>

        <v-row justify="center" align="center" no-gutters>
            <v-col cols="5">
                <Score orientation="left" :team="gameState.teams[teamBlueId]"/>
            </v-col>
            <v-col cols="2">
                <Clock :time-left="gameState.time_left"></Clock>
            </v-col>
            <v-col cols="5">
                <Score orientation="right" :team="gameState.teams[teamRedId]"/>
            </v-col>

        </v-row>

        <v-row justify="center" align="center">
            <v-col cols="10">
                <div ref="canvasDiv" class="text-center">
                    <MyCanvas :gameState="gameState" :canvasWidth="canvasWidth"/>
                </div>
            </v-col>
        </v-row>
    </v-container>

</template>

<script setup>
import ControlPanel from "~/components/gamePage/ControlPanel.vue";
import Clock from "~/components/gamePage/Clock.vue";
import Score from "~/components/gamePage/Score.vue";
import MyCanvas from "~/components/gamePage/MyCanvas.vue";

const {gameId} = useRoute().params
const {baseApiUrl} = useRuntimeConfig()

const def_team = {
    "id": 0,
    "color": "red",
    "name": "Placeholder",
    "score": 0,
    "fuel": 25,
    "charging": true
}

const {data: gameState, refresh} = await useFetch(baseApiUrl + `/game/${gameId}`, {
    method: 'GET'
})

if (!gameState.value) {
    throw createError({statusCode: 404, statusMessage: 'Game does not exist!', fatal: true})
}

const teams = gameState.value.teams
const teamBlueId = Object.values(teams).find(t => t.color === 'blue').id
const teamRedId = Object.values(teams).find(t => t.color === 'red').id

const canvasDiv = ref(null)
let canvasWidth = ref(600)

let intervalId;
onMounted(() => {

    intervalId = setInterval(() => {
        canvasWidth.value = canvasDiv.value.clientWidth
        canvasWidth.value = Math.min(canvasWidth.value, window.innerHeight)
        refresh()
    }, 100);

})

onUnmounted(() => {
    clearInterval(intervalId)
})

</script>

<style scoped>

</style>