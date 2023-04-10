import { scene, panCameraTo, panCameraKeys } from '@/lib/scene'
import { movementMarkers } from '@/lib/controls'
import { hoveredTileStore } from '@/stores/hovered-tile'
import { noop } from '@/lib/constants'

class blankControler {
  modeName = 'blank'
  onFrameControls = noop
  effectsFunctions = noop
  onMouseMove = noop
  leftClickAction = noop
  rightClickAction = noop
  onUnset = noop
  updateEntities = noop
}

class commonControler extends blankControler {
  onFrameControls = (delta, mouseMoved) => {
    const { mouse } = scene
    const hoveredTile = hoveredTileStore()

    panCameraKeys(delta)

    if (mouseMoved || scene.isRedrawEffectsRequested()) {
      hoveredTile.updateHoveredTile({ x: mouse.x, y: mouse.y })
    }
  }

  onMouseMove = () => {
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

  leftClickAction = () => {
    // Request move function
    const hoveredTile = hoveredTileStore()
    const { mouse, player } = scene

    if (hoveredTile.tileIndex && !mouse.isDragged) {
      player.requestMove(hoveredTile.tileIndex)
      scene.requestRedrawEffects()
    }
  }

  onUnset = () => {
    const { player } = scene
    player.unsetPath()
    scene.requestRedrawEffects()
  }
}

class playMode extends commonControler {
  modeName = 'playMode'
  effectsFunctions = movementMarkers
}

export { blankControler, commonControler, playMode }
