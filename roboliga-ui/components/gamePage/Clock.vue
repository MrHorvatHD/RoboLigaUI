<template>
    <div class="text-h2 text-grey text-center myFont">
        {{timeLeft}}
    </div>
</template>

<script setup>
const props = defineProps(['timeLeft'])

const timeLeft = computed(() => {
    const minutes = Math.floor(props.timeLeft / 60);
    const seconds = Math.floor(props.timeLeft - (minutes * 60));
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
})


</script>

<style scoped>

</style>