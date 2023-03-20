import { defineStore } from 'pinia'

export const entityActionStore = defineStore('entityAction', {
  state: () => {
    return { action: 'addNpc' }
  },

  actions: {}
})
