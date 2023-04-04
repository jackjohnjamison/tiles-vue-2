import { movementMarkers } from '@/lib/controls'
import {
  commonOnFrameControls,
  commonUnset,
  requestMove,
  commonOnMouseMove
} from './common-functions'
import { modeStore } from '@/stores/mode'

////////////// For attack
import { scene, panCameraTo, panCameraKeys } from '@/lib/scene'
import { hoveredTileStore } from '@/stores/hovered-tile'
import { noop } from '@/lib/constants'

const setPlayMode = () => {
  const mode = modeStore()

  mode.set({
    modeName: 'playMode',
    onFrameControls: commonOnFrameControls,
    effectsFunctions: movementMarkers,
    onMouseMove: commonOnMouseMove,
    leftClickAction: requestMove,
    onUnset: commonUnset
  })
}

/////////////////////////////////////////////////////////////////

const setPlayModeAttack = () => {
  const mode = modeStore()

  /////////////////////////////////
  const particles = []
  const gravity = 0.15
  const xVariation = 2.4

  const createParticle = (x, y) => {
    const particle = {
      x,
      y,
      xVelocity: Math.random() * xVariation - xVariation / 2,
      yVelocity: -6.5 + Math.random(),
      radius: Math.random() * 6 + 1,
      lifeTime: 100 + (Math.random() * 40 - 40),
      colorOffset: Math.random() * 40 - 20
    }

    particles.unshift(particle)
  }
  /////////////////////////////////

  mode.set({
    effectsFunctions: () => {
      const { mouse, ctxTop } = scene

      createParticle(mouse.x, mouse.y)
      createParticle(mouse.x, mouse.y)
      createParticle(mouse.x, mouse.y)

      particles.forEach((particle, i) => {
        particle.lifeTime--

        if (particle.lifeTime < 0) {
          particles.splice(i, 1)
        } else {
          ctxTop.fillStyle = `rgba(${particle.lifeTime * 2 + particle.colorOffset + 20}, 0, 0, ${
            particle.lifeTime / 100
          })`

          ctxTop.strokeStyle = `rgba(${particle.lifeTime * 2 + particle.colorOffset - 20}, 0, 0, ${
            particle.lifeTime / 100
          })`

          particle.yVelocity += gravity

          particle.x += particle.xVelocity
          particle.y += particle.yVelocity

          ctxTop.beginPath()
          ctxTop.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI)
          ctxTop.fill()
          ctxTop.stroke()
        }
      })
    },

    modeName: 'playMode',

    onFrameControls: (delta) => {
      const { mouse } = scene
      const hoveredTile = hoveredTileStore()

      panCameraKeys(delta)
      scene.requestRedrawEffects()
      hoveredTile.updateHoveredTile({ x: mouse.x, y: mouse.y })
    },

    onMouseMove: () => {},

    leftClickAction: () => {
      const { canvasTop } = scene
      console.log('Attack')
      canvasTop.style.cursor = 'pointer'
      setPlayMode()
    },

    rightClickAction: () => {
      const { canvasTop } = scene
      console.log('Cancel')
      canvasTop.style.cursor = 'pointer'
      setPlayMode()
    },

    onUnset: commonUnset
  })
}

////////////////////////////////////////////////////////////
// Changed the name temporarily to use this for animations
const setPlayModeAttack_Real = () => {
  const mode = modeStore()

  mode.set({
    modeName: 'playMode',

    onFrameControls: (delta, mouseMoved) => {
      const { mouse } = scene
      const hoveredTile = hoveredTileStore()

      panCameraKeys(delta)

      if (mouseMoved || scene.isRedrawEffectsRequested()) {
        hoveredTile.updateHoveredTile({ x: mouse.x, y: mouse.y })
      }
    },

    effectsFunctions: noop, // Replace later

    onMouseMove: () => {
      const { mouse, canvasTop } = scene

      if (mouse.buttonCode === 1) {
        panCameraTo(-mouse.drag.x, -mouse.drag.y)
      }

      // Cursor state
      if (mouse.isDragged) {
        canvasTop.style.cursor = 'grabbing'
      } else {
        canvasTop.style.cursor = 'crosshair'
      }
    },

    leftClickAction: () => {
      const { canvasTop } = scene
      console.log('Attack')
      canvasTop.style.cursor = 'pointer'
      setPlayMode()
    },

    rightClickAction: () => {
      const { canvasTop } = scene
      console.log('Cancel')
      canvasTop.style.cursor = 'pointer'
      setPlayMode()
    },

    onUnset: commonUnset
  })
}

export { setPlayMode, setPlayModeAttack }
