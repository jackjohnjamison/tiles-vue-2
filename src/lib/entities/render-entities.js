import { scene } from '@/lib/scene'
import { getSpriteImage } from '@/lib/sprites'
import { drawLineTileMarker, tileIndexToPosition } from '@/lib/map'

const renderEntities = (x, y) => {
  const { tileMap, entityMap } = scene
  const tile = tileMap.tiles[x][y]
  const { feature } = tile
  const entityMapLocation = entityMap.entities[x][y]

  // This can be improved but first I need to know what tile markers I will need
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
    const position = tileIndexToPosition({ x, y })
    scene.ctxEntity.drawImage(image.data, position.x, position.y - image.yOffset)

    if (entityMapLocation) {
      scene.ctxEntity.globalAlpha = 0.5
      entityMapLocation.render()
      scene.ctxEntity.globalAlpha = 1
    }
  }
}

export { renderEntities }
