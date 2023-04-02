import { sprites } from '@/lib/sprites'

const spriteCache = {}

const colorize = (sprite, color) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const {
    data,
    data: { width, height },
    yOffset
  } = sprite

  canvas.width = width
  canvas.height = height

  const image = data
  ctx.filter = `hue-rotate(${color}deg)`
  ctx.drawImage(image, 0, 0)

  return {
    data: canvas,
    yOffset
  }
}

const getSpriteImage = (spriteName, color, variant) => {
  const cacheId = `${spriteName}.${color}.${variant}`

  if (spriteCache[cacheId]) {
    return spriteCache[cacheId]
  }

  const sprite = sprites[spriteName][variant]
  const spriteImage = colorize(sprite, color)

  return (spriteCache[cacheId] = spriteImage)
}

const clearSpriteCache = () => {
  Object.keys(spriteCache).forEach((key) => delete spriteCache[key])
}

export { getSpriteImage, clearSpriteCache }
