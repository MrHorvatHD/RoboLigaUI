<template>
    <v-form ref="inputForm" v-model="valid">
        <v-row justify="center" align="center">
            <v-col cols="4">
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

            <v-col cols="4">
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
            <v-col cols="4">
                <v-btn color="primary" variant="text" @click="validate">
                    change teams
                </v-btn>
            </v-col>

        </v-row>
    </v-form>
</template>

<script setup>
import config from "~/config.json";
const {baseApiUrl} = useRuntimeConfig()

const {gameId} = useRoute().params
const props = defineProps(['teamsId'])
const emit = defineEmits(['snackBarEmit'])

const valid = ref(false)
const inputForm = ref(null)

const blueTeam = ref(String(props.teamsId[0]))
const redTeam = ref(String(props.teamsId[1]))

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


async function validate() {
    const {valid} = await inputForm.value.validate()

    if (valid) {
        const {data, error} = await useFetch(baseApiUrl + `/game/${gameId}/teams`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                "team_1": String(blueTeam.value),
                "team_2": String(redTeam.value)
            },
            credentials: 'include'
        });
        if (error.value) {
            emit('snackBarEmit', error.value, "error")
        } else if (data.value) {
            emit('snackBarEmit', "Teams changed successfully", "")
        }
    }
}
</script>

<style scoped>

</style>