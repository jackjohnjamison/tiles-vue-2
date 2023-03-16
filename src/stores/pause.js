import { defineStore } from 'pinia'

export const pauseStore = defineStore('pause', {
  state: () => {
    return { isPaused: false }
  },

  actions: {
    toggle() {
      this.isPaused = !this.isPaused
    }
  }
})