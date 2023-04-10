import { defineStore } from 'pinia'

export const modeStore = defineStore('mode', {
  state: () => {
    return {
      mode: null,
      modeType: null
    }
  },

  actions: {
    set(mode) {
      this.mode?.onUnset()

      this.modeType = mode.modeType
      this.mode = mode
      mode.set()
    }
  }
})
