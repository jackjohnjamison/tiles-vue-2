import { scene, panCameraTo } from '@/lib/scene'
import { panCameraKeys } from '@/lib/scene'
import { hoveredTileStore } from '@/stores/hovered-tile'

const commonOnFrameControls = (delta, mouseMoved) => {
  const { mouse } = scene
  const hoveredTile = hoveredTileStore()

  panCameraKeys(delta)

  if (mouseMoved || scene.isRedrawEffectsRequested()) {
    hoveredTile.updateHoveredTile({ x: mouse.x, y: mouse.y })
  }
}

const commonOnMouseMove = () => {
  const hoveredTile = hoveredTileStore()
  const { mouse, canvasTop } = scene

  if (mouse.buttonCode === 1) {
    panCameraTo(-mouse.drag.x, -mouse.drag.y)
  }

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
}

const requestMove = () => {
  const hoveredTile = hoveredTileStore()
  const { mouse, player } = scene

  if (hoveredTile.tileIndex && !mouse.isDragged) {
    player.requestMove(hoveredTile.tileIndex)
    scene.requestRedrawEffects()
  }
}

const commonUnset = () => {
  const { player } = scene
  player.unsetPath()
  scene.requestRedrawEffects()
}

export { commonOnFrameControls, commonOnMouseMove, requestMove, commonUnset }
