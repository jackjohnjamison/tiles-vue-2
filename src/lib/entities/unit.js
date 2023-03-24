import { scene } from '@/lib/scene'
import { sprites } from '@/lib/sprites'
import { pathMovementSpeed } from '@/lib/constants'
import { loadMapAtLocation } from '@/lib/map'
import { entity, pathfinding } from '.'

class unit extends entity {
  constructor() {
    super({
      sprite: sprites.playerTokens.angel,
      haloColor: 'lime'
    })
    this.path = []

    const movementStep = () => {
      scene.redrawEffects = true
    }

    const pathFinder = pathfinding(this, pathMovementSpeed, movementStep)

    this.update = (delta) => {
      // Check for travel point
      const { tileMap } = scene
      const { x, y } = this.tileIndex
      const currentTile = tileMap.tiles[x][y]
      const { travelPoint } = currentTile

      if (travelPoint) {
        loadMapAtLocation(travelPoint.mapName, travelPoint.destinationIndex)
      }

      pathFinder.move(delta)
      this.redraw()
    }

    this.requestMove = pathFinder.requestMove
    this.unsetPath = pathFinder.unsetPath

    this.deleteEntity = () => {
      // Returns false because the player can not be deleted
      return false
    }
  }
}

export { unit }
