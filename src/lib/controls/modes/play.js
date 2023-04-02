import { movementMarkers } from '@/lib/controls'
import {
  commonOnFrameControls,
  commonUnset,
  requestMove,
  commonOnMouseMove
} from './common-functions'
import { modeStore } from '@/stores/mode'

////////////// For attack
import { scene, panCameraTo, panCameraKeys } from '@/lib/scene'
import { hoveredTileStore } from '@/stores/hovered-tile'
import { noop } from '@/lib/constants'

const setPlayMode = () => {
  const mode = modeStore()

  mode.set({
    modeName: 'playMode',
    onFrameControls: commonOnFrameControls,
    effectsFunctions: movementMarkers,
    onMouseMove: commonOnMouseMove,
    leftClickAction: requestMove,
    onUnset: commonUnset
  })
}

const setPlayModeAttack = () => {
  const mode = modeStore()

  mode.set({
    modeName: 'playMode',

    onFrameControls: (delta, mouseMoved) => {
      const { mouse } = scene
      const hoveredTile = hoveredTileStore()

      panCameraKeys(delta)

      if (mouseMoved || scene.isRedrawEffectsRequested()) {
        hoveredTile.updateHoveredTile({ x: mouse.x, y: mouse.y })
      }
    },

    effectsFunctions: noop, // Replace later

    onMouseMove: () => {
      const { mouse, canvasTop } = scene

      if (mouse.buttonCode === 1) {
        panCameraTo(-mouse.drag.x, -mouse.drag.y)
      }

      // Cursor state
      if (mouse.isDragged) {
        canvasTop.style.cursor = 'grabbing'
      } else {
        canvasTop.style.cursor = 'crosshair'
      }
    },

    leftClickAction: () => {
      const { canvasTop } = scene
      console.log('Attack')
      canvasTop.style.cursor = 'pointer'
      setPlayMode()
    },

    rightClickAction: () => {
      const { canvasTop } = scene
      console.log('Cancel')
      canvasTop.style.cursor = 'pointer'
      setPlayMode()
    },

    onUnset: commonUnset
  })
}

export { setPlayMode, setPlayModeAttack }
