<template>
    <v-card :to="`/game/${gameId}`" color="secondary" class="myFont">
        <v-card-title>{{ gameId }}</v-card-title>
        <v-card-text>
            <div class="text-blue-darken-1">{{gameState.teams[teamBlueId].name}}</div>
            <div class="text-red-darken-1">{{gameState.teams[teamRedId].name}}</div>
        </v-card-text>
    </v-card>
</template>

<script setup>
const {baseApiUrl} = useRuntimeConfig()
const props = defineProps(['gameId'])

const {data: gameState,} = await useFetch(baseApiUrl + `/game/${props.gameId}`, {
    method: 'GET',
    pick: ["teams"]
})


const teams = gameState.value.teams
const teamBlueId = Object.values(teams).find(t => t.color === 'blue').id
const teamRedId = Object.values(teams).find(t => t.color === 'red').id


</script>

<style scoped>

</style>