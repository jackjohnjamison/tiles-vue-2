import { keyCheck } from '@/lib/controls'
import { friction, cameraAcceleration } from '@/lib/constants'
import { scene } from '.'

let velocityX = 0
let velocityY = 0

const translatePrevious = { x: 0, y: 0 }

const panCameraKeys = (delta) => {
  const {
    ctxMid,
    ctxTop,
    canvasFloor,
    canvasEntity,
    view: { translate }
  } = scene

  if (document.activeElement.type !== 'text') {
    const arrowUp = keyCheck('KeyW')
    const arrowDown = keyCheck('KeyS')
    const arrowRight = keyCheck('KeyD')
    const arrowLeft = keyCheck('KeyA')

    velocityX += cameraAcceleration * delta * (arrowRight - arrowLeft)
    velocityY += cameraAcceleration * delta * (arrowDown - arrowUp)

    translate.x = Math.round(translate.x - velocityX)
    translate.y = Math.round(translate.y - velocityY)
  }

  if (translate.x !== translatePrevious.x || translate.y !== translatePrevious.y) {
    canvasFloor.style.left = canvasEntity.style.left = `${translate.x}px`
    canvasFloor.style.top = canvasEntity.style.top = `${translate.y}px`

    ctxMid.setTransform(1, 0, 0, 1, translate.x, translate.y)
    ctxTop.setTransform(1, 0, 0, 1, translate.x, translate.y)

    translatePrevious.x = translate.x
    translatePrevious.y = translate.y

    scene.redrawEffects = true

    velocityX *= friction
    velocityY *= friction
  }
}

// THIS FUNCTION WORKS BECAUSE THE FUNCTION ABOVE IS RUN ON EVERY FRAME
// (Which is fine)
const panCameraTo = (x, y) => {
  const {
    view: { translate }
  } = scene

  translate.x = x
  translate.y = y
}

export { panCameraKeys, panCameraTo }
