import { scene } from '.'
import { renderFrame } from './render-frame'

// For additional functions like the frame rate monitor
const additionalFunctions = []

// Functions fed into the render loop
const onFrameFunctions = (delta) => {
  const { onFrameControls } = scene

  if (onFrameControls) {
    onFrameControls(delta)
  }

  additionalFunctions.forEach((func) => {
    func(delta)
  })

  renderFrame(delta)
}

export { onFrameFunctions, additionalFunctions }
