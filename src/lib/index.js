import { scene } from '@/lib/scene'
import { sprites } from '@/lib/sprites'

const start = async (canvases) => {
  await sprites.load()
  scene.start(canvases, 'hub')
  window.dump = () => {
    console.log(scene)
  }
}

export { start }
