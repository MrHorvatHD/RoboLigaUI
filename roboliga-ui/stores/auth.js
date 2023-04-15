import {defineStore} from "pinia";

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        games:{}
    }),
    getters: {
        getPass: (state) => {
            return (gameId) => {
                return state.games[gameId] || 'no-pass'
            }
        }
    },
    actions: {
        addGame(game) {
            this.games[game.game_id] = game.password
        }
    }
})
