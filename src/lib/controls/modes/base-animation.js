import { scene, panCameraKeys } from '@/lib/scene'
import { blankControler } from './base-controlers'

// Setting animation
export class baseAnimation extends blankControler {
  constructor(animation, animationProperties, callback = scene.resumeTurnState) {
    const { canvasTop } = scene
    super()

    this.set = () => {
      canvasTop.style.cursor = 'none'
    }

    this.effectsFunctions = animation(animationProperties, callback)

    this.onFrameControls = (delta) => {
      panCameraKeys(delta)
      scene.requestRedrawEffects()
    }

    if (animationProperties.entity) {
      this.updateEntities = animationProperties.entity.update
    }
  }
}
