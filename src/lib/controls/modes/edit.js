import { scene, panCameraKeys, panCameraTo } from '../../scene'
import { movementMarkers } from '../movment-markers'
import { findHoveredTile, paintTile, unsetTileLock, addTileMarker } from '../../map'
import { noop } from '../../constants'
import { sprites } from '@/lib/sprites'
import { panelStore } from '@/stores/editor-panel'
import { entityActionStore } from '@/stores/entity-actions'
import { npc } from '@/lib/entities'

const addNpc = (tileIndex) => {
  const _npc = new npc({
    sprite: sprites.playerTokens.despoiler,
    haloColor: 'red'
  })
  _npc.addToScene(tileIndex)
}

const addTravelPoint = (tileIndex) => {
  const { x, y } = tileIndex

  addTileMarker(x, y, 'rgba(250, 227, 17, .8)', 'rgba(255, 248, 184, .3)')
}

const rightClickAction = (tileIndex, action) => {
  switch (action) {
    case 'addNpc':
      addNpc(tileIndex)
      break

    case 'travelPoint':
      addTravelPoint(tileIndex)
      break

    default:
    // Do nothing
  }
}

const editMode = {}

editMode.set = () => {
  const { hoveredTile, mouse, player, canvasTop } = scene
  const panel = panelStore()
  const entityAction = entityActionStore()

  mouse.onMouseMove = () => {
    if (mouse.buttonCode === 1) {
      panCameraTo(-mouse.drag.x, -mouse.drag.y)
    }
  }

  mouse.onMouseUp = () => {
    const validClick = hoveredTile.tileIndex && !mouse.isDragged

    if (validClick) {
      const isEditingEntities = panel.activePanel === 'entities'

      if (mouse.buttonCode === 1) {
        player.requestMove(hoveredTile.tileIndex)
      } else if (mouse.buttonCode === 3 && isEditingEntities) {
        rightClickAction(hoveredTile.tileIndex, entityAction.action)
      }
    }

    unsetTileLock()
  }

  scene.onFrameControls = (delta) => {
    panCameraKeys(delta)

    hoveredTile.tileIndex = findHoveredTile({ x: mouse.x, y: mouse.y })

    if (hoveredTile.tileIndex) {
      // Cursor state
      if (mouse.isDragged) {
        canvasTop.style.cursor = 'grabbing'
      } else {
        canvasTop.style.cursor = 'pointer'
      }
    } else {
      canvasTop.style.cursor = 'default'
    }

    movementMarkers(hoveredTile.tileIndex)

    if (hoveredTile.tileIndex && panel.activePanel === 'tiles') {
      if (mouse.buttonCode === 3) paintTile(hoveredTile.tileIndex)
    }
  }
}

editMode.unset = () => {
  const { mouse, player } = scene
  player.unsetPath()
  mouse.onMouseMove = noop
  mouse.onMouseUp = noop
}

export { editMode }
