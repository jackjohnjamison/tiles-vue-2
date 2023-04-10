import { defineStore } from 'pinia'
import { modes } from '@/lib/controls'

export const modeStore = defineStore('mode', {
  state: () => {
    return {
      mode: modes.blankControler
    }
  },

  actions: {
    set(mode) {
      this.mode.onUnset()

      this.mode = mode
      mode.set()
    }
  }
})
