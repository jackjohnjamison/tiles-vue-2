import { scene } from '@/lib/scene'
import { sprites } from '@/lib/sprites'
import { pathMovementSpeed } from '@/lib/constants'
import { loadMapAtLocation } from '@/lib/map'
import { entity, pathfinding } from '.'
import { color } from '@/lib/constants'

import { knight } from './unit-types/knight'

class unit extends entity {
  constructor(unitBaseClass = knight, name = 'Knight') {
    super({
      sprite: sprites.playerTokens.angel,
      haloColor: color.success
    })

    this.name = name
    this.properties = { ...unitBaseClass }
    this.health = this.properties.maxHealth

    this.path = []
    this.travelTriggered = false

    const movementStep = () => {
      scene.requestRedrawEffects()
    }

    const pathFinder = pathfinding(this, pathMovementSpeed, movementStep)

    this.update = (delta) => {
      // Check for travel point
      const { tileMap } = scene
      const { x, y } = this.tileIndex
      const currentTile = tileMap.tiles[x][y]
      const { travelPoint } = currentTile

      if (travelPoint && !this.travelTriggered) {
        this.travelTriggered = true
        loadMapAtLocation(travelPoint.mapName, travelPoint.entryPointName)
      }

      if (this.isMoving) {
        pathFinder.move(delta)
        this.redraw()
      }
    }

    this.resetTravel = () => {
      setTimeout(() => (this.travelTriggered = false), 5000)
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
