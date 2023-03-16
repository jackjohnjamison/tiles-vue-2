import { defineStore } from 'pinia'
import { renderLoop } from "@/lib/game/scene"

export const pauseStore = defineStore('pause', {
  state: () => {
    return { isPaused: false }
  },

  actions: {
    unpause() {
      const { restart } = renderLoop;

      this.isPaused = false
      restart()
    },

    pause() {
      const { stop } = renderLoop;

      this.isPaused = true
      stop()
    },

    toggle() {
      if(this.isPaused) {
        this.unpause()
      } else {
        this.pause()
      }
    },
  }
})