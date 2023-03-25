import { resetMousePosition } from '@/lib/controls'
import { pauseStore } from '@/stores/pause'
import { scene, renderLoop } from '.'

const reloadScene = (tileMap, entryPointName = null) => {
  renderLoop.stop()

  delete scene.entites
  delete scene.tileMap
  delete scene.entityMap
  delete scene.player

  const { xTiles, yTiles } = tileMap

  scene.view = scene.setView({
    xTiles,
    yTiles
  })

  scene.loadMap(tileMap, entryPointName)
  pauseStore().unpause()
  resetMousePosition()
}

export { reloadScene }
