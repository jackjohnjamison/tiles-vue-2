import { scene } from '@/lib/scene'
import { panCameraKeys } from '@/lib/scene'
import { hoveredTileStore } from '@/stores/hovered-tile'
import { noop } from '@/lib/constants'
import { mouseActionStore } from '@/stores/mouse-action'

let mousePrevious = { x: null, y: null }

const commonOnFrameControls = (delta) => {
  const mouseAction = mouseActionStore()
  const { mouse } = scene
  const hoveredTile = hoveredTileStore()
  const mouseMoved = mouse.x !== mousePrevious.x || mouse.y !== mousePrevious.y

  panCameraKeys(delta)

  if (mouseMoved || scene.isRedrawEffectsRequested()) {
    hoveredTile.updateHoveredTile({ x: mouse.x, y: mouse.y })
  }

  if (mouseMoved) {
    mouseAction.hoverState()

    mousePrevious.x = mouse.x
    mousePrevious.y = mouse.y
  }
}

const hoverStateDefault = () => {
  const hoveredTile = hoveredTileStore()
  const { mouse, canvasTop } = scene

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
  const { player } = scene
  const hoveredTile = hoveredTileStore()

  player.requestMove(hoveredTile.tileIndex)
  scene.requestRedrawEffects()
}

const commonUnset = () => {
  const { mouse, player } = scene
  const mouseAction = mouseActionStore()
  player.unsetPath()
  scene.onFrameControls = noop
  scene.effectsFunctions = noop
  mouse.onMouseMove = noop
  mouse.onMouseUp = noop
  scene.requestRedrawEffects()
  mouseAction.unsetMouseAction()
}

export { commonOnFrameControls, hoverStateDefault, requestMove, commonUnset }
