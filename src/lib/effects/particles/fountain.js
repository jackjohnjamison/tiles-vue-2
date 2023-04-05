import { scene } from '@/lib/scene'

const deg360Radians = 2 * Math.PI

const particles = []
const gravity = 0.009
const xVariation = 2.4
const particleDensity = 3

const createParticle = (x, y) => {
  const yVariation = Math.random() * 10 - 5
  const particle = {
    x,
    y,
    maxY: y + yVariation,
    bounce: yVariation > 0,
    xVelocity: (Math.random() * xVariation - xVariation / 2) / 17,
    yVelocity: (-7 + Math.random()) / 17,
    radius: Math.random() * 6 + 1,
    lifeTime: 100 + (Math.random() * 20 - 10),
    colorOffset: Math.random() * 40 - 20
  }

  particles.unshift(particle)
}

export const createFountainEffect = () => {
  const { mouse, ctxTop } = scene

  const update = (delta) => {
    for (let i = 0; i < particleDensity; i++) {
      createParticle(mouse.x, mouse.y)
    }

    particles.forEach((particle, i) => {
      particle.lifeTime--

      const { lifeTime, colorOffset, radius, maxY, bounce } = particle

      if (particle.lifeTime < 0) {
        particles.splice(i, 1)
      } else {
        ctxTop.fillStyle = `rgba(${lifeTime * 2 + colorOffset + 20}, 0, 0, ${
          particle.lifeTime / 100
        })`

        ctxTop.strokeStyle = `rgba(${lifeTime * 2 + colorOffset - 20}, 0, 0, ${
          particle.lifeTime / 100
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
        ctxTop.arc(particle.x, particle.y, radius, 0, deg360Radians)
        ctxTop.fill()
        ctxTop.stroke()
      }
    })
  }

  return update
}
