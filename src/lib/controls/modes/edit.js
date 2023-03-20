import { scene, panCameraKeys, panCameraTo } from '../../scene'
import { movementMarkers } from '../movment-markers'
import { findHoveredTile, paintTile, unsetTileLock } from '../../map'
import { noop } from '../../constants'
import { sprites } from '@/lib/sprites'

// Tempory inports until this can be moved somewhere more sensible
import { panelStore } from '@/stores/editor-panel'
import { npc } from '@/lib/entities'

const editMode = {}

editMode.set = () => {
  const { hoveredTile, mouse, player, canvasTop } = scene
  const panel = panelStore()

  mouse.onMouseMove = () => {
    if (mouse.buttonCode === 1) {
      panCameraTo(-mouse.drag.x, -mouse.drag.y)
    }
  }

  mouse.onMouseUp = () => {
    const validClick = hoveredTile.tileIndex && !mouse.isDragged

    if (mouse.buttonCode === 1 && validClick) {
      player.requestMove(hoveredTile.tileIndex)
    } else if (mouse.buttonCode === 3 && validClick && panel.activePanel === 'entities') {
      // Add NPC function. To be moved out as the entity dialog develops, possibly into its own mode entirely
      const _npc = new npc({
        sprite: sprites.playerTokens.despoiler,
        haloColor: 'red'
      })
      _npc.addToScene(hoveredTile.tileIndex)
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
