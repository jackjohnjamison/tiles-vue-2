import { scene, panCameraTo, panCameraKeys } from '@/lib/scene'
import { hoveredTileStore } from '@/stores/hovered-tile'
import { tileWidth, tileHeight, color } from '@/lib/constants'
import { highlightTile } from '@/lib/map'
import { modeStore } from '@/stores/mode'
import { blankControler } from './base-controlers'
import { baseAnimation } from './base-animation'

const handleAttack = (targetEntity, attack) => {
  const { resumeTurnState } = scene

  const response = targetEntity.receiveAttack(attack)

  if (response) {
    if (response.deathAnimation) {
      const { animation, props } = response.deathAnimation

      modeStore().set(new baseAnimation(animation, props))
    }
  } else {
    resumeTurnState()
  }
}

export class baseAttack extends blankControler {
  constructor(attack) {
    const { resumeTurnState, mouse, ctxTop, ctxMid, canvasTop } = scene
    const hoveredTile = hoveredTileStore()

    super()

    this.onFrameControls = (delta, mouseMoved) => {
      panCameraKeys(delta)

      if (mouseMoved || scene.isRedrawEffectsRequested()) {
        hoveredTile.updateHoveredTile({ x: mouse.x, y: mouse.y })
      }
    }

    this.effectsFunctions = () => {
      // Highlight target function
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
    }

    this.onMouseMove = () => {
      if (mouse.buttonCode === 1) {
        panCameraTo(-mouse.drag.x, -mouse.drag.y)
      }

      // Cursor state
      if (mouse.isDragged) {
        canvasTop.style.cursor = 'grabbing'
      } else {
        canvasTop.style.cursor = 'crosshair'
      }
    }

    this.leftClickAction = () => {
      const targetEntity = hoveredTile.hoveredEntity

      if (targetEntity) {
        modeStore().set(
          new baseAnimation(
            attack.animation,
            {
              origin: targetEntity.getCenter()
            },
            () => {
              handleAttack(targetEntity, attack)
            }
          )
        )
      } else {
        resumeTurnState()
      }
    }

    this.rightClickAction = () => {
      console.log('Cancel')
      resumeTurnState()
    }
  }
}
