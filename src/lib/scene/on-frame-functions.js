import { scene, renderFrame } from '.'
import { modeStore } from '@/stores/mode'

// For additional functions like the frame rate monitor
const additionalFunctions = []
let mousePrevious = { x: null, y: null }

// Functions fed into the render loop
const onFrameFunctions = (delta) => {
  const { mouse } = scene
  const mouseMoved = mouse.x !== mousePrevious.x || mouse.y !== mousePrevious.y
  const mode = modeStore()

  mode.onFrameControls(delta, mouseMoved)

  if (mouseMoved) {
    mode.onMouseMove()

    mousePrevious.x = mouse.x
    mousePrevious.y = mouse.y
  }

  if (scene.isRedrawEffectsRequested()) {
    const {
      ctxMid,
      ctxTop,
      view: { translate },
      canvasTop: { width, height }
    } = scene

    ctxMid.clearRect(-translate.x, -translate.y, width, height)
    ctxTop.clearRect(-translate.x, -translate.y, width, height)

    mode.effectsFunctions(delta)

    scene.RedrawEffectsDone()
  }

  additionalFunctions.forEach((func) => {
    func(delta)
  })

  renderFrame(delta)
}

export { onFrameFunctions, additionalFunctions }
