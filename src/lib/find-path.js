import pathfinding from 'pathfinding'
import { scene } from '@/lib/scene'

const finder = new pathfinding.AStarFinder({
  allowDiagonal: true,
  dontCrossCorners: true
})

const findPath = (start, end) => {
  const { pathGrid } = scene.tileMap
  const tempPathGrid = pathGrid.clone()

  return finder.findPath(start.x, start.y, end.x, end.y, tempPathGrid)
}

export { findPath }
