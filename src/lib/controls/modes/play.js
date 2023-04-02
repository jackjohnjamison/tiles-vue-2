import { scene } from '@/lib/scene'
import { movementMarkers } from '@/lib/controls'
import {
  commonOnFrameControls,
  commonUnset,
  requestMove,
  commonOnMouseMove
} from './common-functions'
import { hoveredTileStore } from '@/stores/hovered-tile'
import { modeStore } from '@/stores/mode'

const setPlayMode = () => {
  const { mouse } = scene
  const mode = modeStore()
  const hoveredTile = hoveredTileStore()

  mode.set({
    modeName: 'playMode',

    onFrameControls: commonOnFrameControls,
    effectsFunctions: movementMarkers,

    onMouseMove: commonOnMouseMove,

    onMouseUp: () => {
      if (mouse.buttonCode === 1 && hoveredTile.tileIndex && !mouse.isDragged) {
        mode.mouseActionOne()
      }
    },

    mouseActionOne: requestMove,
    onUnset: commonUnset
  })
}

export { setPlayMode }
