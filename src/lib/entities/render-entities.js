import { scene } from '@/lib/scene'
import { getSpriteImage } from '@/lib/sprites'
import { drawLineTileMarker, tileIndexToPosition } from '@/lib/map'

const renderEntities = (x, y) => {
  const { tileMap, entityMap } = scene
  const tile = tileMap.tiles[x][y]
  const { feature } = tile
  const entity = entityMap.entities[x][y]?.entity

  // This can be improved but first I need to know what tile markers I will need
  if (tile.marker) {
    const { strokeColor, fillColor } = tile.marker

    drawLineTileMarker({ x, y, strokeColor, fillColor })
  }

  if (entity) {
    entity.render()
  }

  if (feature) {
    const { set, color, variant } = feature
    const image = getSpriteImage(set, color, variant)
    const position = tileIndexToPosition({ x, y })
    scene.ctxEntity.drawImage(image.data, position.x, position.y - image.yOffset)

    if (entity) {
      scene.ctxEntity.globalAlpha = 0.5
      entity.render()
      scene.ctxEntity.globalAlpha = 1
    }
  }
}

export { renderEntities }
