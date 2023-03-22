import { defineStore } from 'pinia'
import { scene } from '@/lib/scene'
import { findPath } from '@/lib/find-path'
import { findHoveredTile } from '@/lib/map'

export const hoveredTileStore = defineStore('hoveredTile', {
  state: () => {
    return {
      tileIsHovered: false,
      tileIndex: { x: null, y: null },
      tileIndexPrevious: null,
      pathToTile: [],
      tileChangedThisFrame: true
    }
  },

  actions: {
    updateHoveredTile(mousePosition) {
      this.tileIndexPrevious = JSON.stringify(this.tileIndex)
      this.tileIndex = findHoveredTile(mousePosition)

      if (this.tileIndex) {
        const { player } = scene
        this.tileIsHovered = true
        this.pathToTile = findPath(player.tileIndex, this.tileIndex)
      } else {
        this.tileIsHovered = false
        this.pathToTile = []
      }

      this.tileChangedThisFrame = JSON.stringify(this.tileIndex) !== this.tileIndexPrevious
    }
  }
})
