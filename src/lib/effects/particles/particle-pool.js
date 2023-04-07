export const createParticlePool = (count) => {
  const pool = new Array(count)
  const particles = new Array(count)

  return { pool, particles }
}
