import { defineStore } from 'pinia'
import { tileTypes } from "@/lib/game/map"

export const brushStore = defineStore('brush', {
  state: () => {
    return {
      selectedTileSet: null,
      currentBrush: null,
    }
  },

  actions: {
    setSelectedTileSet(tileSetKey) {
      this.selectedTileSet = tileTypes[tileSetKey]
    },

    setBrush() {

    },
  }
})