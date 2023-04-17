<template>
    <div class="text-h5 text-md-h2 text-grey text-center myFont pt-2 pt-md-0">
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