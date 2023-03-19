import { defineStore } from 'pinia'
import { tileTypes } from "@/lib/game/map"

export const brushStore = defineStore('brush', {
  state: () => {
    return {
      selectedTileSetKey: Object.keys(tileTypes)[0],
      selectedTileSet: null,
      currentBrush: null,
    }
  },

  actions: {
    setSelectedTileSet(tileSetKey) {
      this.selectedTileSet = tileTypes[tileSetKey]
    },

    setSelectedTileSetKey(tileSetKey) {
      this.selectedTileSetKey = tileSetKey
    },

    setBrush() {

    },
  }
})