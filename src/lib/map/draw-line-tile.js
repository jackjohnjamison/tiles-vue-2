import { scene } from '../scene'
import { tileIndexToPosition } from '.'
import { tileWidth, tileHeight } from '../constants'

const drawLineTile = ({ x, y, strokeColor, fillColor }) => {
  const { ctxTop } = scene

  const position = tileIndexToPosition({ x, y })
  ctxTop.strokeStyle = strokeColor
  ctxTop.fillStyle = fillColor

  // Draw tile outline
  ctxTop.beginPath()
  ctxTop.moveTo(position.x, position.y + tileHeight / 2)
  ctxTop.lineTo(position.x + tileWidth / 2, position.y)
  ctxTop.lineTo(position.x + tileWidth, position.y + tileHeight / 2)
  ctxTop.lineTo(position.x + tileWidth / 2, position.y + tileHeight)
  ctxTop.closePath()

  ctxTop.fill()
  ctxTop.stroke()
}

// These functions can probably have less duplication when I have the time
const drawLineTileMarker = ({ x, y, strokeColor, fillColor }) => {
  const { floorCtx } = scene

  const position = tileIndexToPosition({ x, y })
  floorCtx.strokeStyle = strokeColor
  floorCtx.fillStyle = fillColor

  // Draw tile outline
  floorCtx.beginPath()
  floorCtx.moveTo(position.x, position.y + tileHeight / 2)
  floorCtx.lineTo(position.x + tileWidth / 2, position.y)
  floorCtx.lineTo(position.x + tileWidth, position.y + tileHeight / 2)
  floorCtx.lineTo(position.x + tileWidth / 2, position.y + tileHeight)
  floorCtx.closePath()

  floorCtx.fill()
  floorCtx.stroke()
}

export { drawLineTile, drawLineTileMarker }
