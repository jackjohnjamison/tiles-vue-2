import { scene, panCameraTo } from '@/lib/scene'
import { movementMarkers } from '@/lib/controls'
import {
  commonOnFrameControls,
  commonUnset,
  hoverStateDefault,
  requestMove
} from './common-functions'
import { hoveredTileStore } from '@/stores/hovered-tile'
import { mouseActionStore } from '@/stores/mouse-action'

const playMode = {}

playMode.set = () => {
  const { mouse } = scene
  const hoveredTile = hoveredTileStore()
  const mouseAction = mouseActionStore()

  const defaultmouseAction = {
    actionOne: requestMove,
    hoverState: hoverStateDefault
  }

  mouseAction.setMouseAction(defaultmouseAction)

  mouse.onMouseMove = () => {
    if (mouse.buttonCode === 1) {
      panCameraTo(-mouse.drag.x, -mouse.drag.y)
    }
  }

  mouse.onMouseUp = () => {
    if (mouse.buttonCode === 1 && hoveredTile.tileIndex && !mouse.isDragged) {
      mouseAction.actionOne()
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
