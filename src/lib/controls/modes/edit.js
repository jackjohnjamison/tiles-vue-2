import { scene, panCameraTo } from '@/lib/scene'
import { paintTile, unsetTileLock, addTileMarker } from '@/lib/map'
import { noop } from '@/lib/constants'
import { sprites } from '@/lib/sprites'
import { npc, deleteEntity } from '@/lib/entities'
import { panelStore } from '@/stores/editor-panel'
import { commonOnFrameControls } from './common-functions'
import { entityActionStore } from '@/stores/entity-actions'
import { hoveredTileStore } from '@/stores/hovered-tile'

const addNpc = (tileIndex) => {
  const _npc = new npc({
    sprite: sprites.playerTokens.despoiler,
    haloColor: 'red'
  })
  _npc.addToScene(tileIndex)
}

// This should probably be moved
const addTravelPoint = (tileIndex) => {
  const { x, y } = tileIndex
  const { mapName, destinationX, destinationY } = entityActionStore()

  scene.tileMap.tiles[x][y].travelPoint = {
    mapName,
    destinationIndex: { x: destinationX, y: destinationY }
  }

  addTileMarker(x, y, 'rgba(250, 227, 17, .8)', 'rgba(255, 248, 184, .3)')
}

// This also should probably be moved
const addEntryPoint = (tileIndex) => {
  const { x, y } = tileIndex
  const { entryPointName, updateEntryPoints } = entityActionStore()

  scene.tileMap.entryPoints[entryPointName] = {
    x,
    y
  }

  updateEntryPoints()
}

const rightClickAction = (tileIndex, action) => {
  switch (action) {
    case 'addNpc':
      addNpc(tileIndex)
      break

    case 'travelPoint':
      addTravelPoint(tileIndex)
      break

    case 'delete':
      deleteEntity(tileIndex)
      break

    case 'entryPoint':
      addEntryPoint(tileIndex)
      break

    default:
    // Do nothing
  }
}

const editMode = {}

editMode.set = () => {
  const { mouse, player } = scene
  const panel = panelStore()
  const hoveredTile = hoveredTileStore()
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
    commonOnFrameControls(delta)

    if (hoveredTile.tileIsHovered && panel.activePanel === 'tiles') {
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
