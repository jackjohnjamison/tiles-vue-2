import { tileWidth, tileHeight, paddingBottom, paddingTop } from '@/lib/constants'
import { scene } from '.'

const setView = ({ xTiles, yTiles }) => {
  const {
    canvasRoot,
    ctxFloor,
    ctxMid,
    ctxEntity,
    ctxTop,
    canvasFloor,
    canvasMid,
    canvasEntity,
    canvasTop
  } = scene

  const baseHeight = ((xTiles + yTiles) / 2) * tileHeight

  // Canvas dimensions once padding is included
  const width = ((xTiles + yTiles) / 2) * tileWidth
  const height = baseHeight + paddingBottom + paddingTop

  // Sets floor and entity canvas size
  canvasFloor.width = canvasEntity.width = width
  canvasFloor.height = canvasEntity.height = height

  // The exactly fits the grid in the center on the Y axis
  const baseOriginY =
    baseHeight / 2 - (tileHeight / 4) * (yTiles - xTiles) - tileHeight / 2 + paddingTop

  // Used to caculate the position of the grid relative to the canvas
  const origin = {
    x: 0,
    y: baseOriginY
  }

  const translate = {
    x: 0,
    y: 0
  }

  const setApertureSize = () => {
    canvasMid.width = canvasTop.width = canvasRoot.clientWidth
    canvasMid.height = canvasTop.height = canvasRoot.clientHeight

    ctxMid.setTransform(1, 0, 0, 1, translate.x, translate.y)
    ctxMid.imageSmoothingEnabled = false
    ctxTop.setTransform(1, 0, 0, 1, translate.x, translate.y)
    ctxTop.imageSmoothingEnabled = false

    ctxFloor.imageSmoothingEnabled = false
    ctxEntity.imageSmoothingEnabled = false
    scene.redrawEffects = true
  }

  onresize = () => {
    setApertureSize()
  }

  return {
    origin,
    xTiles,
    yTiles,
    translate,
    setApertureSize
  }
}

export { setView }
