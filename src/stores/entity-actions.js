import { defineStore } from 'pinia'

export const entityActionStore = defineStore('entityAction', {
  state: () => {
    return {
      action: 'addNpc',
      mapName: 'windows',
      destinationX: 0,
      destinationY: 0
    }
  }
})
