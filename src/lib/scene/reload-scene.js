import { resetMousePosition } from '@/lib/controls'
import { pauseStore } from '@/stores/pause'
import { scene, renderLoop } from '.'

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
  resetMousePosition()
}

export { reloadScene }
