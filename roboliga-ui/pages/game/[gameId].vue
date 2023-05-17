<template>
    <v-container fluid class="ma-0 pa-0">
        <v-row justify="center" align="center">

            <v-btn style="position: absolute; left: 0;" icon="mdi-arrow-left" variant="plain"
                   color="primary" size="x-large" density="compact" :ripple="false" @click="navigateTo('/')"></v-btn>

            <ControlPanel :game_on="gameState.game_on" :game_paused="gameState.game_paused"
                          :teamsId="[teamBlueId,teamRedId]"></ControlPanel>
        </v-row>

        <v-row justify="center" align="center" no-gutters>
            <v-col cols="5" md="5">
                <Score orientation="left" :team="gameState.teams[teamBlueId]" :maxFuel="gameState.robot_time"
                       :key="iterBlue"/>
            </v-col>
            <v-col cols="2" md="2">
                <Clock :time-left="gameState.time_left"></Clock>
            </v-col>
            <v-col cols="5" md="5">
                <Score orientation="right" :team="gameState.teams[teamRedId]" :maxFuel="gameState.robot_time"
                       :key="iterRed"/>
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
import {navigateTo} from "#app";

const {gameId} = useRoute().params
const {baseApiUrl} = useRuntimeConfig()

let iterBlue = ref(0)
let iterRed = ref(0)

const {data: gameState, refresh} = await useFetch(baseApiUrl + `/game/${gameId}`, {
    method: 'GET',
})

if (!gameState.value) {
    throw createError({statusCode: 404, statusMessage: 'Game does not exist!', fatal: true})
}

let prevBlue = {
    id: 0,
    score: 0,
    charging: false,
    fuel: 25
}

let prevRed = {
    id: 0,
    score: 0,
    charging: false,
    fuel: 25
}

const teamBlueId = ref(Object.values(gameState.value.teams).find(t => t.color === 'blue').id)
const teamRedId = ref(Object.values(gameState.value.teams).find(t => t.color === 'red').id)

const updateTeams = () => {

    const btI = Object.values(gameState.value.teams).find(t => t.color === 'blue')
    const rtI = Object.values(gameState.value.teams).find(t => t.color === 'red')

    teamBlueId.value = btI && btI.id || 0
    teamRedId.value = rtI && rtI.id || 0

    const blueTeam = gameState.value.teams[teamBlueId.value]
    const redTeam = gameState.value.teams[teamRedId.value]

    // check blue
    // -------------------------------------------------------------------------
    let changedBlue = false
    if (teamBlueId.value !== prevBlue.id) {
        prevBlue.id = teamBlueId.value
        changedBlue = true
    } else if (blueTeam.score !== prevBlue.score) {
        prevBlue.score = blueTeam.score
        changedBlue = true
    }
    if (blueTeam.charging !== prevBlue.charging) {
        prevBlue.charging = blueTeam.charging
        changedBlue = true
    } else if (blueTeam.fuel !== prevBlue.fuel) {
        prevBlue.fuel = blueTeam.fuel
        changedBlue = true
    }
    if (changedBlue)
        iterBlue.value += iterBlue.value < 10000 ? 1 : -10000

    // check red
    // -------------------------------------------------------------------------
    let changedRed = false
    if (teamRedId.value !== prevRed.id) {
        prevRed.id = teamRedId.value
        changedRed = true
    } else if (redTeam.score !== prevRed.score) {
        prevRed.score = redTeam.score
        changedRed = true
    }
    if (redTeam.charging !== prevRed.charging) {
        prevRed.charging = redTeam.charging
        changedRed = true
    } else if (redTeam.fuel !== prevRed.fuel) {
        prevRed.fuel = redTeam.fuel
        changedRed = true
    }

    if (changedRed)
        iterRed.value += iterRed.value < 10000 ? 1 : -10000
}

const canvasDiv = ref(null)
let canvasWidth = ref(600)

let intervalId;
onMounted(() => {

    intervalId = setInterval(() => {
        canvasWidth.value = canvasDiv.value.clientWidth
        canvasWidth.value = Math.min(canvasWidth.value, window.innerHeight)
        refresh()
        updateTeams()
    }, 100);

})

onUnmounted(() => {
    clearInterval(intervalId)
})

</script>

<style scoped>

</style>