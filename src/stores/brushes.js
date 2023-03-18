import { defineStore } from 'pinia'

export const brushStore = defineStore('brush', {
  state: () => {
    return { 
      selectedTileSet: null,
      currentBrush: null,
    }
  },

  actions: {
    setSelectedTileSet(tileSet) {
      this.selectedTileSet = tileSet
    },

    setBrush() {

    },
  }
})