import {
  tileHeight,
  centerOffsetX,
  centerOffsetY,
  pinProportion,
  crumbWidth
} from '@/lib/constants'

const drawPin = (color, fill, ctx, position) => {
  const centerX = position.x + centerOffsetX
  const centerY = position.y + centerOffsetY

  ctx.beginPath()
  ctx.moveTo(centerX, centerY)
  ctx.lineTo(centerX - crumbWidth / 3, centerY - tileHeight * pinProportion * 1.5)
  ctx.lineTo(centerX, centerY - tileHeight * 1.5)
  ctx.lineTo(centerX + crumbWidth / 3, centerY - tileHeight * pinProportion * 1.5)
  ctx.closePath()

  ctx.fillStyle = fill
  ctx.strokeStyle = color

  ctx.fill()
  ctx.stroke()
}

export { drawPin }
