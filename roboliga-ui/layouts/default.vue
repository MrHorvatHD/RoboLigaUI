<template>
    <v-app theme="myThemeLight">
        <v-main >
            <slot/>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: "default"
}
</script>

<style>
.myFont {
    font-family: 'Consolas', sans-serif !important;
    color: #393536;
}
</style>