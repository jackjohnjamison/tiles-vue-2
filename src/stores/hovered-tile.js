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
      hoveredEntity: null
    }
  },

  actions: {
    updateHoveredTile(mousePosition) {
      this.tileIndexPrevious = JSON.stringify(this.tileIndex)
      this.tileIndex = findHoveredTile(mousePosition)

      if (this.tileIndex) {
        const { player, entityMap } = scene
        this.pathToTile = findPath(player.tileIndex, this.tileIndex)

        const { x, y } = this.tileIndex
        this.hoveredEntity = entityMap.entities[x][y]?.entity
      } else {
        this.tileIsHovered = false
        this.pathToTile = []
      }

      if (JSON.stringify(this.tileIndex) !== this.tileIndexPrevious) {
        scene.requestRedrawEffects()
      }
    }
  }
})
