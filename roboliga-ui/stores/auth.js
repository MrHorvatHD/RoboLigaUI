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
        },
        getMyGames: (state) => {
            return Object.keys(state.games)
        }
    },
    actions: {
        addGame(game) {
            this.games[game.game_id] = game.password
        },
        // remove gone games from state
        resetGameState(currentGames) {
            this.games = Object.fromEntries(
                Object.entries(this.games).filter(([key, value]) => currentGames.includes(key))
            );

        }
    },
    persist: true
})
