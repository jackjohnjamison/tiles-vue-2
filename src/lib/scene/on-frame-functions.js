import { scene, renderFrame } from '.'

// For additional functions like the frame rate monitor
const additionalFunctions = []

// Functions fed into the render loop
const onFrameFunctions = (delta) => {
  const { onFrameControls } = scene

  if (onFrameControls) {
    onFrameControls(delta)
  }

  if (scene.isRedrawEffectsRequested()) {
    const {
      ctxMid,
      ctxTop,
      view: { translate },
      canvasTop: { width, height },
      effectsFunctions
    } = scene

    ctxMid.clearRect(-translate.x, -translate.y, width, height)
    ctxTop.clearRect(-translate.x, -translate.y, width, height)

    effectsFunctions()

    scene.RedrawEffectsDone()
  }

  additionalFunctions.forEach((func) => {
    func(delta)
  })

  renderFrame(delta)
}

export { onFrameFunctions, additionalFunctions }
