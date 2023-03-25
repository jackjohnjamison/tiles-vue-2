import { scene } from '@/lib/scene'
import { panCameraKeys } from '@/lib/scene'
import { movementMarkers } from '@/lib/controls'
import { tileIndexToPosition } from '@/lib/map'
import { drawEllipse } from '@/lib/effects'
import { hoveredTileStore } from '@/stores/hovered-tile'
import { entityActionStore } from '@/stores/entity-actions'

let mousePrevious = { x: null, y: null }

const commonOnFrameControls = (delta) => {
  const { mouse, canvasTop } = scene
  const hoveredTile = hoveredTileStore()
  const entityAction = entityActionStore()
  const mouseMoved = mouse.x !== mousePrevious.x || mouse.y !== mousePrevious.y

  panCameraKeys(delta)

  if (mouseMoved || scene.isRedrawEffectsRequested()) {
    hoveredTile.updateHoveredTile({ x: mouse.x, y: mouse.y })
  }

  if (scene.isRedrawEffectsRequested()) {
    const {
      canvasTop,
      ctxMid,
      ctxTop,
      view: { translate }
    } = scene

    const { width, height } = canvasTop
    ctxMid.clearRect(-translate.x, -translate.y, width, height)
    ctxTop.clearRect(-translate.x, -translate.y, width, height)

    movementMarkers()

    // Decide how to refactor this out as it is edit mode only and not a common function
    // Also it runs on play mode if you leave entry points on in edit mode
    if (entityAction.action === 'entryPoint' || entityAction.action === 'travelPoint') {
      const { entryPoints } = scene.tileMap
      Object.keys(entryPoints).forEach((entryPointKey) => {
        const entryPoint = entryPoints[entryPointKey]
        const position = tileIndexToPosition({ x: entryPoint.x, y: entryPoint.y })
        drawEllipse(position, 'aqua', 20, ctxMid)
      })
    }

    scene.RedrawEffectsDone()
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
