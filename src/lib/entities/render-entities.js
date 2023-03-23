import { scene } from '../scene'
import { getSpriteImage } from '../sprites'
import { drawLineTileMarker } from '../map'

const renderEntities = (x, y) => {
  const { tileMap, entityMap } = scene
  const tile = tileMap.tiles[x][y]
  const { feature, position } = tile
  const entityMapLocation = entityMap.entities[x][y]

  if (tile.marker) {
    const { strokeColor, fillColor } = tile.marker

    drawLineTileMarker({ x, y, strokeColor, fillColor })
  }

  if (entityMapLocation) {
    entityMapLocation.render()
  }

  if (feature) {
    const { set, color, variant } = feature
    const image = getSpriteImage(set, color, variant)
    scene.entityCtx.drawImage(image.data, position.x, position.y - image.yOffset)

    if (entityMapLocation) {
      scene.entityCtx.globalAlpha = 0.5
      entityMapLocation.render()
      scene.entityCtx.globalAlpha = 1
    }
  }
}

export { renderEntities }
