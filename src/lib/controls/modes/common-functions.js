import { scene } from '@/lib/scene'
import { panCameraKeys } from '@/lib/scene'
import { movementMarkers } from '../movment-markers'
import { hoveredTileStore } from '@/stores/hovered-tile'

let mousePrevious = { x: null, y: null }

const commonOnFrameControls = (delta) => {
  const { mouse, canvasTop, player } = scene
  const hoveredTile = hoveredTileStore()

  panCameraKeys(delta)

  // You can probably refactor player.isMoving out of here as it is being used by the movement
  // markers to find a new path when the player moves. This should be seperate.
  if (mouse.x !== mousePrevious.x || mouse.y !== mousePrevious.y || player.isMoving) {
    hoveredTile.updateHoveredTile({ x: mouse.x, y: mouse.y })

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

    movementMarkers()

    mousePrevious.x = mouse.x
    mousePrevious.y = mouse.y
  }
}

export { commonOnFrameControls }
