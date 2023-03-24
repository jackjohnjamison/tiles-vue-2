import { scene } from '@/lib/scene'
import { panCameraKeys } from '@/lib/scene'
import { movementMarkers } from '@/lib/controls'
import { hoveredTileStore } from '@/stores/hovered-tile'

let mousePrevious = { x: null, y: null }

const commonOnFrameControls = (delta) => {
  const { mouse, canvasTop } = scene
  const hoveredTile = hoveredTileStore()
  const mouseMoved = mouse.x !== mousePrevious.x || mouse.y !== mousePrevious.y

  panCameraKeys(delta)

  if (mouseMoved || scene.redrawEffects) {
    hoveredTile.updateHoveredTile({ x: mouse.x, y: mouse.y })
    movementMarkers()
    scene.redrawEffects = false
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

export { commonOnFrameControls }
