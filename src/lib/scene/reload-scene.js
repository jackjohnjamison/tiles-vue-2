import { scene, renderLoop } from '.'
import { pauseStore } from '@/stores/pause'
// import { hoveredTileStore } from '@/stores/hovered-tile'

const reloadScene = (tileMap) => {
  renderLoop.stop()

  delete scene.entites
  delete scene.tileMap
  delete scene.entityMap

  const { xTiles, yTiles } = tileMap

  scene.view = scene.setView({
    xTiles,
    yTiles
  })

  scene.loadMap(tileMap)
  pauseStore().unpause()
  // hoveredTileStore().updateHoveredTile(tileMap.unitStart)
}

export { reloadScene }
