import { scene, panCameraTo } from '@/lib/scene'
import { paintTile, unsetTileLock, addTileMarker, tileIndexToPosition } from '@/lib/map'
import { drawEllipse, drawPin } from '@/lib/effects'
import { movementMarkers } from '@/lib/controls'
import { sprites } from '@/lib/sprites'
import { npc, deleteEntity } from '@/lib/entities'
import { panelStore } from '@/stores/editor-panel'
import {
  commonOnFrameControls,
  requestMove,
  hoverStateDefault,
  commonUnset
} from './common-functions'
import { entityActionStore } from '@/stores/entity-actions'
import { hoveredTileStore } from '@/stores/hovered-tile'
import { mouseActionStore } from '@/stores/mouse-action'
import { color } from '@/lib/constants'

const addNpc = (tileIndex) => {
  const _npc = new npc({
    sprite: sprites.playerTokens.despoiler,
    haloColor: color.alert
  })
  _npc.addToScene(tileIndex)
}

// This should probably be moved
const addTravelPoint = (tileIndex) => {
  const { x, y } = tileIndex
  const { mapName, travelPoint } = entityActionStore()

  scene.tileMap.tiles[x][y].travelPoint = {
    mapName,
    entryPointName: travelPoint
  }

  // Change to use config colors
  addTileMarker(x, y, color.warn, color.warnTrans)
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
  scene.requestRedrawEffects()
}

const rightClickAction = (tileIndex, action) => {
  switch (action) {
    case 'addNpc':
      addNpc(tileIndex)
      break

    case 'travelPoint':
      addTravelPoint(tileIndex)
      break

    case 'entryPoint':
      addEntryPoint(tileIndex)
      break

    case 'delete':
      deleteEntity(tileIndex)
      break

    default:
    // Do nothing
  }
}

const editMode = {}

editMode.set = () => {
  const { mouse, ctxMid, ctxTop } = scene
  const panel = panelStore()
  const hoveredTile = hoveredTileStore()
  const entityAction = entityActionStore()
  const mouseAction = mouseActionStore()

  mouseAction.setMouseAction({
    actionOne: requestMove,
    actionTwo: rightClickAction,
    hoverState: hoverStateDefault
  })

  entityAction.updateEntryPoints()

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
        mouseAction.actionOne()
      } else if (mouse.buttonCode === 3 && isEditingEntities) {
        mouseAction.actionTwo(hoveredTile.tileIndex, entityAction.action)
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

  scene.effectsFunctions = () => {
    movementMarkers()

    // Adds Entry point markers but only if on a relivent entity selection
    if (panel.activePanel === 'entities') {
      if (entityAction.action === 'entryPoint' || entityAction.action === 'travelPoint') {
        const { entryPoints } = scene.tileMap
        Object.keys(entryPoints).forEach((entryPointKey) => {
          const entryPoint = entryPoints[entryPointKey]
          const position = tileIndexToPosition({ x: entryPoint.x, y: entryPoint.y })
          drawEllipse(position, color.info, 20, ctxMid)
          drawPin(color.info, color.info, ctxTop, position)
        })
      }
    }
  }
}

editMode.unset = () => {
  commonUnset()
}

export { editMode }
