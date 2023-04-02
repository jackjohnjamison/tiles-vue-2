import { defineStore } from 'pinia'
import { noop } from '@/lib/constants'

export const modeStore = defineStore('mode', {
  state: () => {
    return {
      modeName: undefined,

      onFrameControls: noop,
      effectsFunctions: noop,

      onMouseMove: noop,
      onMouseUp: noop,
      mouseActionOne: noop,
      mouseActionTwo: noop,

      onUnset: noop
    }
  },

  actions: {
    set({
      modeName,
      onFrameControls = noop,
      effectsFunctions = noop,
      onMouseMove = noop,
      onMouseUp = noop,
      mouseActionOne = noop,
      mouseActionTwo = noop,
      onUnset = noop
    }) {
      this.onUnset()

      this.modeName = modeName
      this.onFrameControls = onFrameControls
      this.effectsFunctions = effectsFunctions
      this.onMouseMove = onMouseMove
      this.onMouseUp = onMouseUp
      this.mouseActionOne = mouseActionOne
      this.mouseActionTwo = mouseActionTwo
      this.onUnset = onUnset
    },

    setMouseAction({
      onMouseMove = noop,
      onMouseUp = noop,
      mouseActionOne = noop,
      mouseActionTwo = noop
    }) {
      this.onMouseMove = onMouseMove
      this.onMouseUp = onMouseUp
      this.mouseActionOne = mouseActionOne
      this.mouseActionTwo = mouseActionTwo
    }
  }
})
