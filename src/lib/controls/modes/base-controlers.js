import { scene, panCameraTo, panCameraKeys } from '@/lib/scene'
import { movementMarkers } from '@/lib/controls'
import { hoveredTileStore } from '@/stores/hovered-tile'
import { noop } from '@/lib/constants'

class blankControler {
  static modeName = 'blank'
  static onFrameControls = noop
  static effectsFunctions = noop
  static onMouseMove = noop
  static leftClickAction = noop
  static rightClickAction = noop
  static onUnset = noop
  static updateEntities = noop
  static set = noop
}

class playMode extends blankControler {
  static modeName = 'playMode'

  static onFrameControls = (delta, mouseMoved) => {
    const { mouse } = scene
    const hoveredTile = hoveredTileStore()

    panCameraKeys(delta)

    if (mouseMoved || scene.isRedrawEffectsRequested()) {
      hoveredTile.updateHoveredTile({ x: mouse.x, y: mouse.y })
    }
  }

  static effectsFunctions = movementMarkers

  static onMouseMove = () => {
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

  static leftClickAction = () => {
    // Request move function
    const hoveredTile = hoveredTileStore()
    const { mouse, player } = scene

    if (hoveredTile.tileIndex && !mouse.isDragged) {
      player.requestMove(hoveredTile.tileIndex)
      scene.requestRedrawEffects()
    }
  }

  static onUnset = () => {
    const { player } = scene
    player.unsetPath()
    scene.requestRedrawEffects()
  }
}

export { blankControler, playMode }
