import { scene } from '@/lib/scene'
import { randomVariation } from '@/lib/utils'

const deg360Radians = 2 * Math.PI

const particles = []
const gravity = 0.0095

const xVelocityBase = 0
const xVelocityVariation = 0.14

const yVelocityBase = -0.42
const yVelocityVariation = 0.1

const radiusBase = 2.5
const radiusVariation = 5

const lifeTimeBase = 100
const lifeTimeVariation = 20

const colorOffsetBase = 0
const colorOffsetVariation = 40

const particleDensity = 3

const createParticle = (x, y) => {
  const yVariation = randomVariation(1, 6)
  const particle = {
    x,
    y,
    maxY: y + yVariation,
    bounce: yVariation > 0,
    xVelocity: randomVariation(xVelocityBase, xVelocityVariation),
    yVelocity: randomVariation(yVelocityBase, yVelocityVariation),
    radius: randomVariation(radiusBase, radiusVariation),
    lifeTime: 100,
    colorOffset: randomVariation(colorOffsetBase, colorOffsetVariation)
  }

  particles.unshift(particle)
}

export const createFountainEffect = () => {
  const { mouse, ctxTop } = scene

  const update = (delta) => {
    for (let i = 0; i < particleDensity; i++) {
      createParticle(mouse.x, mouse.y)
    }

    console.log(particles.length)

    particles.forEach((particle, i) => {
      particle.lifeTime--

      const { lifeTime, colorOffset, radius, maxY, bounce } = particle

      if (particle.lifeTime < 0) {
        particles.splice(i, 1)
      } else {
        ctxTop.fillStyle = `rgba(${lifeTime * 2 + colorOffset + 20}, 0, 0, ${
          particle.lifeTime / lifeTimeBase
        })`

        ctxTop.strokeStyle = `rgba(${lifeTime * 2 + colorOffset - 20}, 0, 0, ${
          particle.lifeTime / lifeTimeBase
        })`

        if (particle.y > maxY) {
          if (bounce) {
            particle.yVelocity = -particle.yVelocity * 0.4
          } else {
            particle.yVelocity *= 0.8
          }
        }

        particle.x += particle.xVelocity * delta
        particle.y += particle.yVelocity * delta

        particle.yVelocity += gravity

        ctxTop.beginPath()
        ctxTop.arc(
          particle.x,
          particle.y,
          radius + (110 - particle.lifeTime) / 100,
          0,
          deg360Radians
        )
        ctxTop.fill()
        ctxTop.stroke()
      }
    })
  }

  return update
}
