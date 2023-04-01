import { scene, redrawTile } from '@/lib/scene'
import { getSpriteImage } from '@/lib/sprites'
import { tileWidth, tileHeight } from '@/lib/constants'
import { drawLineTile } from '.'

const drawImageTile = ({ x, y, image }) => {
  const { ctxFloor } = scene
  const position = tileIndexToPosition({ x, y })

  ctxFloor.drawImage(image.data, position.x, position.y - image.yOffset)
}

const renderTile = (x, y) => {
  const { tileMap } = scene
  const tile = tileMap.tiles[x][y]

  if (tile.floor) {
    const { set, color, variant } = tile.floor

    drawImageTile({
      x,
      y,
      image: getSpriteImage(set, color, variant)
    })
  }
}

const positionToTileIndex = ({ x, y }) => {
  const { origin } = scene.view

  return {
    x: Math.floor((x - origin.x) / tileWidth - (y - origin.y - tileHeight / 2) / tileHeight),
    y: Math.floor((y - origin.y - tileHeight / 2) / tileHeight + (x - origin.x) / tileWidth)
  }
}

const tileIndexToPosition = ({ x, y }) => {
  const { origin } = scene.view

  return {
    x: (x * tileWidth) / 2 + (y * tileWidth) / 2 + origin.x,
    y: (y * tileHeight) / 2 - (x * tileHeight) / 2 + origin.y
  }
}

const findHoveredTile = (position) => {
  const { tileMap } = scene
  const { x, y } = positionToTileIndex(position)

  if (tileMap.tiles[x]?.[y]) {
    return { x, y }
  } else {
    return null
  }
}

const highlightTile = (tileIndex, strokeColor, fillColor) => {
  const { x, y } = tileIndex

  drawLineTile({
    x,
    y,
    strokeColor: strokeColor,
    fillColor: fillColor
  })
}

// Move to entity Maybe?
const addTileMarker = (x, y, strokeColor, fillColor) => {
  const { tileMap } = scene
  tileMap.tiles[x][y].marker = { strokeColor, fillColor }
  redrawTile({ x, y })
}

export {
  drawImageTile,
  renderTile,
  findHoveredTile,
  highlightTile,
  positionToTileIndex,
  tileIndexToPosition,
  addTileMarker
}
