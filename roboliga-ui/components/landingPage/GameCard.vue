<template>
    <v-card :to="`/game/${gameId}`" color="secondary" class="myFont">
        <v-card-title class="pa-0">

            <v-toolbar color="secondary" density="compact" class="ma-0">

                <v-toolbar-title class="text-h6 ma-0">
                    {{ gameId }}
                </v-toolbar-title>

                <v-btn style="position: absolute; right: 0;" icon="mdi-delete-forever-outline" variant="text"
                       density="compact" color="grey-darken-2" @click.prevent="deleteCard"></v-btn>

            </v-toolbar>
        </v-card-title>
        <v-card-text>
            <div class="text-blue-darken-1">{{ gameState.teams[teamBlueId].name }}</div>
            <div class="text-red-darken-1">{{ gameState.teams[teamRedId].name }}</div>
        </v-card-text>
    </v-card>

    <v-snackbar
            v-model="snackbar"
            timeout="2500"
            :color="snackbarColor">
        {{ snackbarText }}
    </v-snackbar>

</template>

<script setup>
import {useFetch, useRuntimeConfig} from "#app";
import {useAuthStore} from "~/stores/auth";

const {$promptPassword} = useNuxtApp()

const {baseApiUrl} = useRuntimeConfig()
const auth = useAuthStore()
const props = defineProps(['gameId'])
const emit = defineEmits(['gameDeleted'])


const {data: gameState,} = await useFetch(baseApiUrl + `/game/${props.gameId}`, {
    method: 'GET',
    pick: ["teams"]
})


const teams = gameState.value.teams
const teamBlueId = Object.values(teams).find(t => t.color === 'blue').id
const teamRedId = Object.values(teams).find(t => t.color === 'red').id

const snackbar = ref(false)
const snackbarText = ref("")
const snackbarColor = ref("")

const deleteCard = async () => {

    const {data, error} = await useFetch(baseApiUrl + `/game/`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(`${props.gameId}:${auth.getPass(props.gameId)}`)
        },
    })

    if (error.value) {
        if (error.value.status === 401) {

            $promptPassword(props.gameId)

        } else {
            snackbar.value = true
            snackbarText.value = error.value
            snackbarColor.value = "error"
        }
    }

    if (data.value) {
        snackbar.value = true
        snackbarText.value = "Game deleted successfully"
        snackbarColor.value = ""

        emit('gameDeleted')
    }
}

</script>

<style scoped>

</style>