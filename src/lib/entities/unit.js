import { scene, reloadScene } from '../scene'
import { entity } from './entity'
import { sprites } from '../sprites'
import { pathfinding } from './movement/pathfinding'
import { pathMovementSpeed } from '../constants'
import { loadMapFromImport } from '../map'

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
        this.loadMap(travelPoint.mapName)
      }

      pathFinder.move(delta)
      this.redraw()
    }

    this.requestMove = pathFinder.requestMove
    this.unsetPath = pathFinder.unsetPath

    // This should be moved
    this.loadMap = async (mapName) => {
      const mapData = await loadMapFromImport(mapName)

      reloadScene(mapData)
    }
  }
}

export { unit }
