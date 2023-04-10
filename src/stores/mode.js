import { defineStore } from 'pinia'
import { modes } from '@/lib/controls'

const modeTypes = {
  blankControler: new modes.blankControler()
}

export const modeStore = defineStore('mode', {
  state: () => {
    return {
      mode: modeTypes.blankControler
    }
  },

  actions: {
    set(mode) {
      this.mode.onUnset()

      if (modeTypes[mode.name]) {
        this.mode = modeTypes[mode.name]
      } else {
        this.mode = modeTypes[mode.name] = new modes[mode.name]()
      }
    }
  }
})
