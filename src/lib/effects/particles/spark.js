import { scene } from '@/lib/scene'
import { randomVariation } from '@/lib/utils'

const deg360Radians = 2 * Math.PI

const defaultOrigin = { x: 0, y: 0 }
const defaultRuntime = 300

const gravity = 0.15

const xVelocityBase = 0
const xVelocityVariation = 2.4

const bounceAbsorption = 0.4
const friction = 0.8

const yVelocityBase = -7
const yVelocityVariation = 2

const radiusBase = 2.5
const radiusVariation = 5

const lifeTime = 100
const particleDensity = 3

const colorOffsetBase = 0
const colorOffsetVariation = 40

const newParticle = (x, y) => {
  const yVariation = randomVariation(1, 6)

  return {
    x,
    y,
    maxY: y + yVariation,
    bounce: yVariation > 0,
    xVelocity: randomVariation(xVelocityBase, xVelocityVariation),
    yVelocity: randomVariation(yVelocityBase, yVelocityVariation),
    radius: randomVariation(radiusBase, radiusVariation),
    lifeTime: lifeTime,
    colorOffset: randomVariation(colorOffsetBase, colorOffsetVariation),
    reset: function (x, y) {
      const yVariation = randomVariation(1, 6)

      this.lifeTime = lifeTime
      this.x = x
      this.y = y
      this.maxY = y + yVariation
      this.bounce = yVariation > 0
      this.yVelocity = randomVariation(yVelocityBase, yVelocityVariation)
    }
  }
}

export const createSparkEffect = (
  { runtime = defaultRuntime, origin = defaultOrigin },
  callback
) => {
  const { ctxTop } = scene

  const particles = []
  const pool = []

  let remainingTime = runtime

  const update = () => {
    if (remainingTime > 0) {
      for (let i = 0; i < particleDensity; i++) {
        let particle = pool.pop()

        if (particle) {
          particle.reset(origin.x, origin.y)
          particles.unshift(particle)
        } else {
          particles.unshift(newParticle(origin.x, origin.y))
        }

        remainingTime--
      }
    } else if (particles.length === 0) {
      callback()
    }

    particles.forEach((particle, i) => {
      particle.lifeTime--

      if (particle.lifeTime <= 0) {
        pool.push(particles.splice(i, 1)[0])
      } else {
        const { colorOffset, radius, maxY, bounce } = particle

        ctxTop.fillStyle = `rgba(${particle.lifeTime * 2 + colorOffset + 20}, 0, 0, ${
          particle.lifeTime / lifeTime
        })`

        ctxTop.strokeStyle = `rgba(${particle.lifeTime * 2 + colorOffset - 20}, 0, 0, ${
          particle.lifeTime / lifeTime
        })`

        if (particle.y > maxY) {
          if (bounce) {
            particle.yVelocity = -particle.yVelocity * bounceAbsorption
          } else {
            particle.yVelocity *= friction
          }
        }

        particle.x += particle.xVelocity
        particle.y += particle.yVelocity
        particle.yVelocity += gravity

        ctxTop.beginPath()
        ctxTop.arc(
          particle.x,
          particle.y,
          radius + (lifeTime - particle.lifeTime) / lifeTime,
          0,
          deg360Radians
        )
        ctxTop.fill()
        ctxTop.stroke()

        if (particle.lifeTime <= 0) {
          pool.push(particles.splice(i, 1)[0])
        }
      }
    })
  }

  return update
}
