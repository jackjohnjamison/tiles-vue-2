import { renderEntities } from '@/lib/entities'
import { renderTile } from '@/lib/map'
import { scene } from '.'

const firstRender = () => {
  const { view, canvasFloor, canvasEntity } = scene
  const { xTiles, yTiles } = view

  for (let x = xTiles - 1; x > -1; x--) {
    for (let y = 0; y < yTiles; y++) {
      renderTile(x, y)
      renderEntities(x, y)
    }
  }

  canvasFloor.addEventListener('contextrestored', () => {
    for (let x = xTiles - 1; x > -1; x--) {
      for (let y = 0; y < yTiles; y++) {
        renderTile(x, y)
      }
    }
  })

  canvasEntity.addEventListener('contextrestored', () => {
    for (let x = xTiles - 1; x > -1; x--) {
      for (let y = 0; y < yTiles; y++) {
        renderEntities(x, y)
      }
    }
  })
}

export { firstRender }
