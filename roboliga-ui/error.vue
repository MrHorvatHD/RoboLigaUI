<template>
    <v-container class="text-center content">
        <v-row justify="center" align="center" >
            <v-col class="text-h1 myFont">
                {{ error.statusCode }}
            </v-col>
        </v-row>
        <v-row>
            <v-col class="text-h5 myFont">
                {{ error.message }}
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn variant="plain" @click="handleClearError" color="primary" class="myFont"> Return to Home</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
const props = defineProps(['error'])

const handleClearError = () => {
    clearError({redirect: '/'})
}
</script>

<style scoped>
.content {
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.myFont {
    font-family: 'Consolas', sans-serif !important;
    color: #393536;
}
</style>