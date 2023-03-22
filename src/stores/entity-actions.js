import { defineStore } from 'pinia'

export const entityActionStore = defineStore('entityAction', {
  state: () => {
    return {
      action: 'addNpc',
      mapName: 'windows',
      destinationIndex: { x: 0, y: 0 },
      travelX: null,
      travelY: null
    }
  },

  actions: {}
})
