import { scene } from '@/lib/scene'
import { panCameraKeys } from '@/lib/scene'
import { movementMarkers } from '../movment-markers'
import { hoveredTileStore } from '@/stores/hovered-tile'

const commonOnFrameControls = (delta) => {
  const { mouse, canvasTop } = scene
  const hoveredTile = hoveredTileStore()

  panCameraKeys(delta)
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
}

export { commonOnFrameControls }
