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
  const { entityCtx } = scene

  const position = tileIndexToPosition({ x, y })
  entityCtx.strokeStyle = strokeColor
  entityCtx.fillStyle = fillColor

  // Draw tile outline
  entityCtx.beginPath()
  entityCtx.moveTo(position.x, position.y + tileHeight / 2)
  entityCtx.lineTo(position.x + tileWidth / 2, position.y)
  entityCtx.lineTo(position.x + tileWidth, position.y + tileHeight / 2)
  entityCtx.lineTo(position.x + tileWidth / 2, position.y + tileHeight)
  entityCtx.closePath()

  entityCtx.fill()
  entityCtx.stroke()
}

export { drawLineTile, drawLineTileMarker }
