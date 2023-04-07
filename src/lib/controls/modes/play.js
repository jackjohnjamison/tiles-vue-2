import { movementMarkers } from '@/lib/controls'
import {
  commonOnFrameControls,
  commonUnset,
  requestMove,
  commonOnMouseMove
} from './common-functions'
import { createFountainEffect } from '@/lib/effects'
import { modeStore } from '@/stores/mode'

////////////// For attack
import { scene, panCameraTo, panCameraKeys } from '@/lib/scene'
import { hoveredTileStore } from '@/stores/hovered-tile'
import { noop, tileWidth, tileHeight, color } from '@/lib/constants'
import { highlightTile } from '@/lib/map'
//////////////////////////

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

    effectsFunctions: () => {
      const { entityMap, ctxTop } = scene
      const hoveredTile = hoveredTileStore()

      if (hoveredTile.tileIndex) {
        const { x, y } = hoveredTile.tileIndex

        const entityLocation = entityMap.entities[x][y]

        if (entityLocation) {
          const entity = entityLocation.entity

          const { x, y } = entity.position

          const redrawWidth = tileWidth
          const redrawHeight = tileHeight * 3

          ctxTop.beginPath()
          ctxTop.rect(x, y - tileHeight * 2, redrawWidth, redrawHeight)
          ctxTop.strokeStyle = entity.haloColor
          ctxTop.stroke()
        } else {
          highlightTile(hoveredTile.tileIndex, color.warn, color.warnTrans)
        }
      }
    },

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

/// Setting animation
const setPlayModeAttack_animation = () => {
  const mode = modeStore()

  mode.set({
    effectsFunctions: createFountainEffect(),

    modeName: 'playMode',

    onFrameControls: (delta) => {
      const { mouse } = scene
      const hoveredTile = hoveredTileStore()

      panCameraKeys(delta)
      scene.requestRedrawEffects()
      hoveredTile.updateHoveredTile({ x: mouse.x, y: mouse.y })
    },

    onMouseMove: () => {},

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
