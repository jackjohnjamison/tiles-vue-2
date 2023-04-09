import { scene, panCameraTo, panCameraKeys } from '@/lib/scene'
import { hoveredTileStore } from '@/stores/hovered-tile'
import { setMode } from '@/lib/controls'
import { tileWidth, tileHeight, color } from '@/lib/constants'
import { highlightTile } from '@/lib/map'
import { modeStore } from '@/stores/mode'
import { commonUnset } from './common-functions'

const unsetAttackMode = () => {
  const { canvasTop } = scene

  canvasTop.style.cursor = 'pointer'
  setMode.playMode()
}

export const setPlayModeAttack = (attack) => {
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
      const { ctxTop, ctxMid } = scene
      const hoveredTile = hoveredTileStore()

      if (hoveredTile.hoveredEntity) {
        const { hoveredEntity } = hoveredTile

        const { x, y } = hoveredEntity.position

        const redrawWidth = tileWidth
        const redrawHeight = tileHeight * 3

        ctxTop.beginPath()
        ctxTop.rect(x, y - tileHeight * 2, redrawWidth, redrawHeight)
        ctxTop.strokeStyle = hoveredEntity.haloColor
        ctxTop.stroke()

        ctxMid.beginPath()
        ctxMid.rect(x, y - tileHeight * 2, redrawWidth, redrawHeight)
        ctxMid.fillStyle = color.infoTrans
        ctxMid.fill()

        highlightTile(hoveredTile.tileIndex, hoveredEntity.haloColor, color.warnTrans, ctxMid)
      } else if (hoveredTile.tileIndex) {
        highlightTile(hoveredTile.tileIndex, color.warn, color.warnTrans, ctxTop)
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
      const hoveredTile = hoveredTileStore()

      if (hoveredTile.hoveredEntity) {
        const response = hoveredTile.hoveredEntity.receiveAttack(attack)
        if (response) {
          response()
        } else {
          unsetAttackMode()
        }
      } else {
        unsetAttackMode()
      }
    },

    rightClickAction: () => {
      console.log('Cancel')
      unsetAttackMode()
    },

    onUnset: commonUnset
  })
}
