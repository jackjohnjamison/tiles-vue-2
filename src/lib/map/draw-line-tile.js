import { scene } from '@/lib/scene'
import { tileWidth, tileHeight } from '@/lib/constants'
import { tileIndexToPosition } from '.'

const drawLineTile = ({ x, y, strokeColor, fillColor, ctx }) => {
  const position = tileIndexToPosition({ x, y })

  ctx.strokeStyle = strokeColor
  ctx.fillStyle = fillColor

  // Draw tile outline
  ctx.beginPath()
  ctx.moveTo(position.x, position.y + tileHeight / 2)
  ctx.lineTo(position.x + tileWidth / 2, position.y)
  ctx.lineTo(position.x + tileWidth, position.y + tileHeight / 2)
  ctx.lineTo(position.x + tileWidth / 2, position.y + tileHeight)
  ctx.closePath()

  ctx.fill()
  ctx.stroke()
}

// These functions can probably have less duplication when I have the time
const drawLineTileMarker = ({ x, y, strokeColor, fillColor }) => {
  const { ctxEntity } = scene

  const markerOffset = -3

  const position = tileIndexToPosition({ x, y })
  ctxEntity.strokeStyle = strokeColor
  ctxEntity.fillStyle = fillColor
  ctxEntity.setLineDash([0, 2, 2])

  ctxEntity.beginPath()
  ctxEntity.moveTo(position.x, position.y + tileHeight / 2)
  ctxEntity.lineTo(position.x + tileWidth / 2, position.y)
  ctxEntity.lineTo(position.x + tileWidth, position.y + tileHeight / 2)
  ctxEntity.lineTo(position.x + tileWidth / 2, position.y + tileHeight)
  ctxEntity.closePath()

  ctxEntity.fill()
  ctxEntity.stroke()

  ctxEntity.beginPath()
  ctxEntity.moveTo(position.x, position.y + tileHeight / 2 + markerOffset)
  ctxEntity.lineTo(position.x + tileWidth / 2, position.y + markerOffset)
  ctxEntity.lineTo(position.x + tileWidth, position.y + tileHeight / 2 + markerOffset)
  ctxEntity.lineTo(position.x + tileWidth / 2, position.y + tileHeight + markerOffset)
  ctxEntity.closePath()

  ctxEntity.fill()
  ctxEntity.stroke()

  ctxEntity.setLineDash([])
}

export { drawLineTile, drawLineTileMarker }
