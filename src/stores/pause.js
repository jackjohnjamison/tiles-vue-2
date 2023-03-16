import { defineStore } from 'pinia'
import { renderLoop } from "@/lib/game/scene"

export const pauseStore = defineStore('pause', {
  state: () => {
    return { isPaused: false }
  },

  actions: {
    toggle() {
      const { stop, restart } = renderLoop;

      if(this.isPaused) {
        this.isPaused = false
        restart()
      } else {
        this.isPaused = true
        stop()
      }
    },

    unpause() {
      const { restart } = renderLoop;

      this.isPaused = false
      restart()
    },

    pause() {
      const { stop } = renderLoop;

      this.isPaused = true
      stop()
    }
  }
})