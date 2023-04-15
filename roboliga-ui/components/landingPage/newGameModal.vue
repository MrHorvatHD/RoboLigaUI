<template>
    <v-card class="myFont">
        <v-toolbar color="secondary">
            <v-btn icon @click="emit('closeModal')">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Create new game</v-toolbar-title>

        </v-toolbar>
        <v-card-text>
            <v-container class="text-center" fluid>
                <v-row justify="center" align="center">
                    <v-col cols="6">
                        <v-select
                                v-model="blueTeam"
                                label="Blue team"
                                variant="underlined"
                                color="blue-lighten-1"
                                :items="robotOptions1"
                                item-title="display"
                                item-value="value"
                        ></v-select>
                    </v-col>
                    <v-col cols="6">
                        <v-select
                                v-model="redTeam"
                                label="Red team"
                                variant="underlined"
                                color="red-lighten-1"
                                :items="robotOptions2"
                                item-title="display"
                                item-value="value"
                        ></v-select>
                    </v-col>
                </v-row>
                <v-row v-if="gameData">
                    <v-col class="text-body-1 myFont">
                        ID: "{{ gameData.game_id }}"<br>
                        Password: "{{ gameData.password }}"
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-btn block color="primary" @click="create">
                create
            </v-btn>
        </v-card-actions>

    </v-card>

    <v-snackbar
            v-model="snackbar"
            timeout="2500"
            :color="snackbarColor">
        {{ snackbarText }}
    </v-snackbar>

</template>

<script setup>
import config from "~/config.json"
import {useAuthStore} from "~/stores/auth";

const {baseApiUrl} = useRuntimeConfig()
const auth = useAuthStore()
const emit = defineEmits(['gameCreated', 'closeModal'])

const snackbar = ref(false)
const snackbarText = ref("")
const snackbarColor = ref("")

const blueTeam = ref("")
const redTeam = ref("")
const gameData = ref(null)

const robotOptions1 = computed(() => {
    const options = Object.keys(config.robots).map((key) => ({
        value: key,
        display: config.robots[key]
    }))
    if (redTeam) {
        return options.filter((option) => option.value !== redTeam.value)
    }
    return options
})

const robotOptions2 = computed(() => {
    const options = Object.keys(config.robots).map((key) => ({
        value: key,
        display: config.robots[key]
    }))
    if (blueTeam) {
        return options.filter((option) => option.value !== blueTeam.value)
    }
    return options
})


async function create() {
    const {data, error} = await useFetch(baseApiUrl + `/game/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({
            "team_1": blueTeam.value,
            "team_2": redTeam.value
        })
    })
    if (error.value) {
        snackbar.value = true
        snackbarText.value = error.value
        snackbarColor.value = "error"
    }
    if (data.value) {
        snackbar.value = true
        snackbarText.value = "Game created successfully"
        snackbarColor.value = ""

        auth.addGame(data.value)

        gameData.value = data.value
        emit('gameCreated')
    }
}

</script>

<style scoped>

</style>