import { scene, panCameraKeys } from '@/lib/scene'
import { blankControler } from './base-controlers'

// Setting animation
export class baseAnimation extends blankControler {
  constructor({ animation, animationProps, callback = scene.resumeTurnState }) {
    const { canvasTop } = scene
    super()

    this.set = () => {
      canvasTop.style.cursor = 'none'
    }

    this.effectsFunctions = animation(animationProps, callback)

    this.onFrameControls = (delta) => {
      panCameraKeys(delta)
      scene.requestRedrawEffects()
    }

    if (animationProps.entity) {
      this.updateEntities = animationProps.entity.update
    }
  }
}
