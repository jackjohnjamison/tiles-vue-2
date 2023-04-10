import { scene } from '@/lib/scene'
import { randomVariation } from '@/lib/utils'

const deg360Radians = 2 * Math.PI
const lifeTime = 10

const defaultOrigin = { x: 0, y: 0 }

const particleDensity = 20

const createBang = ({ x, y }, ctx, radiusGain) => {
  return {
    radius: 1,
    alpha: 1,
    color: '255, 255, 255',
    lifeTime,
    update: function () {
      this.lifeTime--
      this.radius += radiusGain
      this.alpha = this.lifeTime / lifeTime / 3
      ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`

      ctx.beginPath()
      ctx.arc(x, y, this.radius, 0, deg360Radians)
      ctx.fill()
    }
  }
}

const createParticle = ({ x, y }, ctx) => {
  const angle = Math.random() * Math.PI * 2
  const speed = 10

  return {
    x,
    y,
    angle: Math.random() * Math.PI * 2,
    radius: randomVariation(4, 6),
    xVelocity: speed * Math.cos(angle),
    yVelocity: speed * Math.sin(angle),
    lifeTime,
    update: function () {
      this.lifeTime--
      this.radius = Math.max(this.radius - 1, 0)
      this.x += this.xVelocity
      this.y += this.yVelocity
      ctx.fillStyle = `rgba(${255 * (this.lifeTime / lifeTime)}, 0, 0, ${this.lifeTime / lifeTime})`

      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, deg360Radians)
      ctx.fill()
    }
  }
}

export const createSparkEffect = ({ origin = defaultOrigin }, callback) => {
  const { ctxTop } = scene

  const particles = []
  const pool = []

  for (let i = 0; i < particleDensity; i++) {
    particles.push(createParticle(origin, ctxTop))
  }

  particles.push(createBang(origin, ctxTop, 5))
  particles.push(createBang(origin, ctxTop, 10))

  const update = () => {
    particles.forEach((particle, i) => {
      if (particle.lifeTime <= 0) {
        pool.push(particles.splice(i, 1)[0])
      } else {
        particle.update()
      }
    })

    if (particles.length === 0) {
      callback()
    }
  }

  return update
}
