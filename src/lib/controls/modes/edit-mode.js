import { scene } from '@/lib/scene'
import { paintTile, unsetTileLock, addTileMarker, tileIndexToPosition } from '@/lib/map'
import { drawEllipse, drawPin } from '@/lib/effects'
import { sprites } from '@/lib/sprites'
import { npc, deleteEntity } from '@/lib/entities'
import { panelStore } from '@/stores/editor-panel'
import { entityActionStore } from '@/stores/entity-actions'
import { hoveredTileStore } from '@/stores/hovered-tile'
import { color } from '@/lib/constants'

import { playMode } from './base-controlers'

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

const entityClickAction = (tileIndex, action) => {
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

export class editMode extends playMode {
  static modeName = 'editMode'

  static onFrameControls = (delta, mouseMoved) => {
    const { mouse } = scene
    const panel = panelStore()
    const hoveredTile = hoveredTileStore()

    playMode.onFrameControls(delta, mouseMoved)

    if (hoveredTile.tileIndex && panel.activePanel === 'tiles') {
      if (mouse.buttonCode === 3) paintTile(hoveredTile.tileIndex)
    }
  }

  static effectsFunctions = () => {
    const { ctxMid, ctxTop } = scene
    const entityAction = entityActionStore()
    const panel = panelStore()

    playMode.effectsFunctions()

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

  static rightClickAction = () => {
    const { mouse } = scene
    const hoveredTile = hoveredTileStore()
    const entityAction = entityActionStore()
    const panel = panelStore()

    const validClick = hoveredTile.tileIndex && !mouse.isDragged
    const isEditingEntities = panel.activePanel === 'entities'

    if (validClick && isEditingEntities) {
      entityClickAction(hoveredTile.tileIndex, entityAction.action)
    }

    unsetTileLock()
  }

  static set = () => {
    const entityAction = entityActionStore()
    entityAction.updateEntryPoints()
  }
}
