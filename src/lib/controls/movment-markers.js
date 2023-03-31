import { scene } from '@/lib/scene'
import { tileIndexToPosition, isWalkable, highlightTile } from '@/lib/map'
import { breadcrumbTrail, drawEllipse } from '@/lib/effects'
import { baseMarkerSize, hoveredTileOutlineColor } from '@/lib/constants'
import { hoveredTileStore } from '@/stores/hovered-tile'
import { success } from '@/config/colors'

const movementMarkers = () => {
  const { player, ctxMid, ctxTop } = scene

  const { tileIndex, pathToTile } = hoveredTileStore()

  // Breadcrumb state
  if (player.isMoving) {
    breadcrumbTrail(player.path, success, false, ctxMid)
    breadcrumbTrail(player.path, success, true, ctxTop)
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
      breadcrumbTrail(pathToTile, success, false, ctxMid)
      breadcrumbTrail(pathToTile, success, false, ctxTop)
      if (isWalkable(tileIndex)) {
        const position = tileIndexToPosition(tileIndex)
        drawEllipse(position, success, baseMarkerSize, ctxTop)
      } else {
        highlightTile(tileIndex, hoveredTileOutlineColor)
      }
    }
  }
}

export { movementMarkers }
