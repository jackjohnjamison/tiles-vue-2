import { scene } from '@/lib/scene'
import { sprites } from '@/lib/sprites'
import { query } from '@/lib/utilities'

// Move this to a config
const defaultMap = 'hub'

const start = async (canvases) => {
  await sprites.load()
  scene.start(canvases, query.map || defaultMap)
  window.dump = () => {
    console.log(scene)
  }
}

export { start }
