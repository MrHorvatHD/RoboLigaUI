import {useAuthStore} from "~/stores/auth";

export default defineNuxtPlugin(nuxtApp => {
    return {
        provide: {
            promptPassword: (gameId) => {
                const auth = useAuthStore()
                const newPassword = window.prompt("Please enter the game's password:");
                if (newPassword) {
                    auth.addGame({game_id: gameId, password: newPassword})
                }
            }
        }
    }
})
