<template>
    <v-form ref="inputForm" v-model="valid">
        <v-row justify="center" align="center">
            <v-col cols="6" md="4">
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

            <v-col cols="6" md="4">
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
            <v-col cols="12" md="4">

                <v-btn icon="mdi-swap-horizontal" variant="text" density="default"
                       color="primary" @click="swapTeams"></v-btn>

                <v-btn color="primary" variant="text" @click="validate">
                    change teams
                </v-btn>

            </v-col>

        </v-row>
    </v-form>
</template>

<script setup>
import {useAuthStore} from "~/stores/auth";

const {$promptPassword} = useNuxtApp()
const {baseApiUrl} = useRuntimeConfig()
const auth = useAuthStore()
const {gameId} = useRoute().params
const props = defineProps(['teamsId'])
const emit = defineEmits(['snackBarEmit'])

const valid = ref(false)
const inputForm = ref(null)

const {data: teams} = await useFetch(baseApiUrl + `/team`, {
    method: 'GET',
})

const blueTeam = ref(Object.values(teams.value).find(t => t.id === props.teamsId[0]).id)
const redTeam = ref(Object.values(teams.value).find(t => t.id === props.teamsId[1]).id)

const robotOptions1 = computed(() => {
    const options = teams.value.map((team) => ({
        value: team.id,
        display: team.name
    }))
    if (redTeam) {
        return options.filter((option) => option.value !== redTeam.value)
    }
    return options
})

const robotOptions2 = computed(() => {
    const options = teams.value.map((team) => ({
        value: team.id,
        display: team.name
    }))
    if (blueTeam) {
        return options.filter((option) => option.value !== blueTeam.value)
    }
    return options
})

const swapTeams = () => {
    const temp = redTeam.value
    redTeam.value = blueTeam.value
    blueTeam.value = temp
}

async function validate() {
    const {valid} = await inputForm.value.validate()

    if (valid) {
        const {data, error} = await useFetch(baseApiUrl + `/game/teams`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(`${gameId}:${auth.getPass(gameId)}`)
            },
            body: {
                "team_1": Number(blueTeam.value),
                "team_2": Number(redTeam.value)
            },
        });
        if (error.value) {
            if (error.value.status === 401) {

                $promptPassword(gameId)

            } else
                emit('snackBarEmit', error.value, "error")
        } else if (data.value) {
            emit('snackBarEmit', "Teams changed successfully", "")
        }
    }
}
</script>

<style scoped>

</style>