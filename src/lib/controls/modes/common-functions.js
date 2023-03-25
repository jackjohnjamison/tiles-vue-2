import { scene } from '@/lib/scene'
import { panCameraKeys } from '@/lib/scene'
import { hoveredTileStore } from '@/stores/hovered-tile'
import { noop } from '@/lib/constants'

let mousePrevious = { x: null, y: null }

const commonOnFrameControls = (delta) => {
  const { mouse, canvasTop } = scene
  const hoveredTile = hoveredTileStore()
  const mouseMoved = mouse.x !== mousePrevious.x || mouse.y !== mousePrevious.y

  panCameraKeys(delta)

  if (mouseMoved || scene.isRedrawEffectsRequested()) {
    hoveredTile.updateHoveredTile({ x: mouse.x, y: mouse.y })
  }

  if (mouseMoved) {
    if (hoveredTile.tileIndex) {
      // Cursor state
      if (mouse.isDragged) {
        canvasTop.style.cursor = 'grabbing'
      } else {
        canvasTop.style.cursor = 'pointer'
      }
    } else {
      canvasTop.style.cursor = 'default'
    }

    mousePrevious.x = mouse.x
    mousePrevious.y = mouse.y
  }
}

const commonUnset = () => {
  const { mouse, player } = scene
  player.unsetPath()
  scene.onFrameControls = noop
  scene.effectsFunctions = noop
  mouse.onMouseMove = noop
  mouse.onMouseUp = noop
  scene.requestRedrawEffects()
}

export { commonOnFrameControls, commonUnset }
