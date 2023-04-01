import { defineStore } from 'pinia'
import { noop } from '@/lib/constants'

export const mouseActionStore = defineStore('mouseActionStore', {
  state: () => {
    return {
      actionOne: noop,
      actionTwo: noop,
      hoverState: noop
    }
  },

  actions: {
    setMouseAction({ actionOne = noop, actionTwo = noop, hoverState = noop }) {
      this.actionOne = actionOne
      this.actionTwo = actionTwo
      this.hoverState = hoverState
    },

    unsetMouseAction() {
      this.actionOne = noop
      this.actionTwo = noop
      this.hoverState = noop
    }
  }
})
