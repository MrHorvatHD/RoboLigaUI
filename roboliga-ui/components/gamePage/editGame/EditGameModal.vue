<template>
    <v-card class="myFont">
        <v-toolbar color="secondary">
            <v-btn icon @click="emit('closeModal')">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Game settings</v-toolbar-title>

        </v-toolbar>
        <v-card-text>

            <v-container class="text-center">

                <UpdateTeams :teamsId="teamsId" @snackBarEmit="openSnackbar"/>

                <UpdateScore :teamsId="teamsId" @snackBarEmit="openSnackbar"/>

                <UpdateTime @snackBarEmit="openSnackbar"/>

            </v-container>
        </v-card-text>
    </v-card>


    <v-snackbar
            v-model="snackbar"
            timeout="2500"
            :color="snackbarColor">
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
import UpdateTeams from "~/components/gamePage/editGame/UpdateTeams.vue";
import UpdateScore from "~/components/gamePage/editGame/UpdateScore.vue";
import UpdateTime from "~/components/gamePage/editGame/UpdateTime.vue";

const emit = defineEmits(['closeModal'])
defineProps(['teamsId'])

const snackbar = ref(false)
const snackbarText = ref("")
const snackbarColor = ref("")

const openSnackbar = (text, color) => {
    snackbar.value = true
    snackbarText.value = text
    snackbarColor.value = color
}

</script>

<style scoped>

</style>