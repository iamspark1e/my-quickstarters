import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: null
  }),
  getters: {},
  actions: {
    login(payload) {
      this.user = payload
    },
    logout(payload) {
      this.user = null
    }
  }
})