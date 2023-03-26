import { scene } from '@/lib/scene'
import { pauseStore } from '@/stores/pause'
import { keyCheck, resetKeys, keyEventFunctions } from '.'

const initControls = () => {
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      scene.canvasRoot.requestFullscreen()
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }

  keyEventFunctions.keyDown = (keyCode) => {
    const pause = pauseStore()

    switch (keyCode) {
      case 'Pause':
        pause.toggle()
        break

      case 'Enter':
        if (keyCheck('ControlLeft')) {
          toggleFullScreen()
        }
        break

      default:
        return
    }
  }

  document.addEventListener('visibilitychange', () => {
    const { pause } = pauseStore()

    if (document.visibilityState === 'hidden') {
      pause()
    } else if (document.visibilityState === 'visible') {
      // Prevents bug where keys are stuck down after tabbing away.
      resetKeys()
    }
  })
}

export { initControls }
