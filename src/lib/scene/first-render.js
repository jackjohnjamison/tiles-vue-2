import { scene } from '.'
import { renderEntities } from '../entities'
import { renderTile } from '../map'

const firstRender = () => {
  const { view, floorCanvas, entityCanvas } = scene
  const { xTiles, yTiles } = view

  for (let x = xTiles - 1; x > -1; x--) {
    for (let y = 0; y < yTiles; y++) {
      renderTile(x, y)
      renderEntities(x, y)
    }
  }

  floorCanvas.addEventListener('contextrestored', () => {
    for (let x = xTiles - 1; x > -1; x--) {
      for (let y = 0; y < yTiles; y++) {
        renderTile(x, y)
      }
    }
  })

  entityCanvas.addEventListener('contextrestored', () => {
    for (let x = xTiles - 1; x > -1; x--) {
      for (let y = 0; y < yTiles; y++) {
        renderEntities(x, y)
      }
    }
  })
}

export { firstRender }
