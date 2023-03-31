import { scene } from '@/lib/scene'
import { tileIndexToPosition, isWalkable, highlightTile } from '@/lib/map'
import { breadcrumbTrail, drawEllipse } from '@/lib/effects'
import { baseMarkerSize } from '@/lib/constants'
import { hoveredTileStore } from '@/stores/hovered-tile'
import { color } from '@/config/colors'

const movementMarkers = () => {
  const { player, ctxMid, ctxTop } = scene

  const { tileIndex, pathToTile } = hoveredTileStore()

  // Breadcrumb state
  if (player.isMoving) {
    breadcrumbTrail(player.path, color.success, color.warnTrans, false, ctxMid)
    breadcrumbTrail(player.path, color.success, color.warnTrans, true, ctxTop)
  }

  if (tileIndex) {
    if (player.isMoving) {
      if (isWalkable(tileIndex)) {
        const position = tileIndexToPosition(tileIndex)
        drawEllipse(position, color.warn, baseMarkerSize, ctxTop)
      } else {
        highlightTile(tileIndex, color.warn, color.warnTrans)
      }
    } else {
      breadcrumbTrail(pathToTile, color.success, color.warnTrans, false, ctxMid)
      breadcrumbTrail(pathToTile, color.success, color.warnTrans, false, ctxTop)
      if (isWalkable(tileIndex)) {
        const position = tileIndexToPosition(tileIndex)
        drawEllipse(position, color.success, baseMarkerSize, ctxTop)
      } else {
        highlightTile(tileIndex, color.warn)
      }
    }
  }
}

export { movementMarkers }
