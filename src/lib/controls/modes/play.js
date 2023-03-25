import { scene, panCameraTo } from '@/lib/scene'
import { commonOnFrameControls } from './common-functions'
import { noop } from '@/lib/constants'
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

  scene.onFrameControls = (delta) => {
    commonOnFrameControls(delta)
  }
}

playMode.unset = () => {
  const { mouse, player } = scene
  player.unsetPath()
  mouse.onMouseMove = noop
  mouse.onMouseUp = noop
}

export { playMode }
