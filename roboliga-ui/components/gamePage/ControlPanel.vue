<template>
    <v-col class="text-center myFont">
        <v-btn @click="startStop" variant="text" color="primary">
            {{ !game_on ? 'Start' : 'Stop' }}
        </v-btn>

        <v-btn @click="playPause" variant="text" color="primary">
            {{ game_paused ? 'Play' : 'Pause' }}
        </v-btn>


        <v-btn variant="text" color="primary">
            edit
            <v-dialog
                    v-model="dialog"
                    activator="parent"
                    persistent
                    max-width="1000"

            >

                <EditGameModal @closeModal="dialog=false" :teamsId="teamsId"/>

            </v-dialog>
        </v-btn>
    </v-col>

    <v-snackbar
            v-model="snackbar"
            timeout="2500"
            color="error">
        {{ snackbarText }}

        <template v-slot:actions>
            <v-btn
                    color="white"
                    variant="text"
                    @click="snackbar = false">

                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script setup>
import EditGameModal from "~/components/gamePage/editGame/EditGameModal.vue";

const {baseApiUrl} = useRuntimeConfig()

const props = defineProps(['game_on', 'game_paused', 'teamsId'])
const {gameId} = useRoute().params
let dialog = ref(false)

const snackbar = ref(false)
const snackbarText = ref("")

const gamePass = "wearySeagull7"
const startStop = async () => {
    let ulrText = props.game_on ? "stop" : "start"

    const {error} = await useFetch(baseApiUrl + `/game/${gameId}/${ulrText}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    if (error.value) {
        snackbar.value = true
        snackbarText.value = `Error ${props.game_on ? 'stopping' : 'starting'} the game`
    }
}

const playPause = async () => {
    const {error} = await useFetch(baseApiUrl + `/game/${gameId}/pause`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'

        },
        credentials: 'include'
    });
    if (error.value) {
        snackbar.value = true
        snackbarText.value = `Error ${props.game_paused ? 'resuming' : 'pausing'} the game`
    }

}
</script>

<style scoped>

</style>