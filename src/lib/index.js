import { scene } from '@/lib/scene'
import { sprites } from '@/lib/sprites'

const start = async (canvases) => {
  await sprites.load()
  scene.start(canvases, 'windows')
  window.dump = () => console.log(scene)
}

export { start }
