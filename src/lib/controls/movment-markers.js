import { scene } from '@/lib/scene'
import { tileIndexToPosition, isWalkable, highlightTile } from '@/lib/map'
import { breadcrumbTrail, drawEllipse } from '@/lib/effects'
import { baseMarkerSize, hoveredTileOutlineColor } from '@/lib/constants'
import { hoveredTileStore } from '@/stores/hovered-tile'

const movementMarkers = () => {
  const {
    player,
    ctxMid,
    ctxTop,
    canvasTop,
    view: { translate }
  } = scene

  const { tileIndex, pathToTile } = hoveredTileStore()

  // Breadcrumb state
  const { width, height } = canvasTop
  ctxMid.clearRect(-translate.x, -translate.y, width, height)
  ctxTop.clearRect(-translate.x, -translate.y, width, height)

  if (player.isMoving) {
    breadcrumbTrail(player.path, 'lime', false, ctxMid)
    breadcrumbTrail(player.path, 'rgba(200, 200, 200, 0.8)', true, ctxTop)
  }

  if (tileIndex) {
    if (player.isMoving) {
      if (isWalkable(tileIndex)) {
        const position = tileIndexToPosition(tileIndex)
        drawEllipse(position, hoveredTileOutlineColor, baseMarkerSize, ctxTop)
      } else {
        highlightTile(tileIndex, hoveredTileOutlineColor)
      }
    } else {
      breadcrumbTrail(pathToTile, 'lime', false, ctxMid)
      breadcrumbTrail(pathToTile, 'rgba(200, 200, 200, 0.8)', false, ctxTop)
      if (isWalkable(tileIndex)) {
        const position = tileIndexToPosition(tileIndex)
        drawEllipse(position, 'lime', baseMarkerSize, ctxTop)
      } else {
        highlightTile(tileIndex, hoveredTileOutlineColor)
      }
    }
  }
}

export { movementMarkers }
