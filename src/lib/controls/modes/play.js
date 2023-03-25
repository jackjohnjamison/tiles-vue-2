import { scene, panCameraTo } from '@/lib/scene'
import { movementMarkers } from '@/lib/controls'
import { commonOnFrameControls, commonUnset } from './common-functions'
import { hoveredTileStore } from '@/stores/hovered-tile'

const playMode = {}

playMode.set = () => {
  const { mouse, player } = scene
  const hoveredTile = hoveredTileStore()

  mouse.onMouseMove = () => {
    if (mouse.buttonCode === 1) {
      panCameraTo(-mouse.drag.x, -mouse.drag.y)
    }
  }

  mouse.onMouseUp = () => {
    if (mouse.buttonCode === 1 && hoveredTile.tileIndex && !mouse.isDragged) {
      player.requestMove(hoveredTile.tileIndex)
      scene.requestRedrawEffects()
    }
  }

  scene.effectsFunctions = () => {
    movementMarkers()
  }

  scene.onFrameControls = (delta) => {
    commonOnFrameControls(delta)
  }
}

playMode.unset = () => {
  commonUnset()
}

export { playMode }
