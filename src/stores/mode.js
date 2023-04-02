import { defineStore } from 'pinia'
import { noop } from '@/lib/constants'

export const modeStore = defineStore('mode', {
  state: () => {
    return {
      modeName: undefined,

      onFrameControls: noop,
      effectsFunctions: noop,

      onMouseMove: noop,
      leftClickAction: noop,
      rightClickAction: noop,

      onUnset: noop
    }
  },

  actions: {
    set({
      modeName,
      onFrameControls = noop,
      effectsFunctions = noop,
      onMouseMove = noop,
      leftClickAction = noop,
      rightClickAction = noop,
      onUnset = noop
    }) {
      this.onUnset()

      this.modeName = modeName
      this.onFrameControls = onFrameControls
      this.effectsFunctions = effectsFunctions
      this.onMouseMove = onMouseMove
      this.leftClickAction = leftClickAction
      this.rightClickAction = rightClickAction
      this.onUnset = onUnset
    },

    setMouseAction({ onMouseMove = noop, leftClickAction = noop, rightClickAction = noop }) {
      this.onMouseMove = onMouseMove
      this.leftClickAction = leftClickAction
      this.rightClickAction = rightClickAction
    }
  }
})
