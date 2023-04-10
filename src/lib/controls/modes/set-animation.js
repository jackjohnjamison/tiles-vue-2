import { scene, panCameraKeys } from '@/lib/scene'
import { setMode } from '@/lib/controls'
import { modeStore } from '@/stores/mode'
// import { hoveredTileStore } from '@/stores/hovered-tile'
import { commonUnset } from './common-functions'

/// Setting animation
export const setAnimation = (animation, animationProperties, callback) => {
  const modes = modeStore()

  mode.set({
    effectsFunctions: animation(animationProperties, callback),

    modeName: 'playMode',

    onFrameControls: (delta) => {
      // const { mouse } = scene
      // const hoveredTile = hoveredTileStore()

      panCameraKeys(delta)
      scene.requestRedrawEffects()
      // hoveredTile.updateHoveredTile({ x: mouse.x, y: mouse.y })
    },

    onMouseMove: () => {},

    leftClickAction: () => {
      const { canvasTop } = scene
      console.log('Attack')
      canvasTop.style.cursor = 'pointer'
      setMode.playMode()
    },

    rightClickAction: () => {
      const { canvasTop } = scene
      console.log('Cancel')
      canvasTop.style.cursor = 'pointer'
      setMode.playMode()
    },

    onUnset: commonUnset
  })
}
