import { defineStore } from 'pinia'

export const hoveredTileStore = defineStore('hoveredTile', {
  state: () => {
    return {
      tileIndex: { x: null, y: null }
    }
  },

  actions: {
    updateHoveredTile({ x, y }) {
      this.tileIndex.x = x
      this.tileIndex.y = y
    }
  }
})
