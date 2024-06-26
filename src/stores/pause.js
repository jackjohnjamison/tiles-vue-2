import { defineStore } from 'pinia'
import { renderLoop } from '@/lib/scene'
import { defaultMapTitle, defaultMapSize } from '@/lib/constants'

export const pauseStore = defineStore('pause', {
  state: () => {
    return {
      isPaused: false,
      mapTitle: defaultMapTitle,
      xTiles: defaultMapSize,
      yTiles: defaultMapSize
    }
  },

  actions: {
    unpause() {
      const { restart } = renderLoop

      this.isPaused = false
      restart()
    },

    pause() {
      const { stop } = renderLoop

      this.isPaused = true
      stop()
    },

    toggle() {
      if (this.isPaused) {
        this.unpause()
      } else {
        this.pause()
      }
    }
  }
})
