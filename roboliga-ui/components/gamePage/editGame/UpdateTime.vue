<template>
    <v-form ref="inputForm" v-model="valid">
        <v-row justify="center" align="center">
            <v-col cols="8">
                <v-text-field
                        v-model="time"
                        label="Time"
                        variant="underlined"
                        :rules="numberRules"
                        color="primary"
                ></v-text-field>
            </v-col>
            <v-col cols="4">
                <v-btn color="primary" variant="text" @click="validate">
                    update time
                </v-btn>
            </v-col>

        </v-row>
    </v-form>
</template>

<script setup>
const {baseApiUrl} = useRuntimeConfig()

const {gameId} = useRoute().params
const emit = defineEmits(['snackBarEmit'])

const valid = ref(false)
const inputForm = ref(null)

const time = ref("180")

const numberRules = [
    v => v.length > 0 || 'This field may not be empty',
    v => Number.isInteger(Number(v)) || 'The value must be an integer number',
    //v => v >= 0 || 'The value must be greater or equal to zero'
]

async function validate() {
    const {valid} = await inputForm.value.validate()

    if (valid) {
        const {data, error} = await useFetch(baseApiUrl + `/game/time`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {"game_time": Number(time.value)},
            credentials: 'include'
        });

        if (error.value) {
            emit('snackBarEmit', error.value, "error")
        } else if (data.value) {
            emit('snackBarEmit', "Time changed successfully", "")
        }
    }
}
</script>

<style scoped>

</style>