import { createTileMapFromParams, loadMapFromImport } from '../map'
import { setView } from './set-view'
import { createEntityMap, entity, unit, npc } from '../entities'
import { onFrameFunctions } from './on-frame-functions'
import { panCameraTo } from './camera'
import { renderLoop } from './render-loop'
import { mouseTracker } from '../controls'
import { mapSize } from '../constants'
import { sprites } from '../sprites'
import { firstRender } from './first-render'
import { initControls } from '../controls'
import { modeStore } from '@/stores/mode'

const scene = {}

// Sets parts of the scene that don't change between map loads
scene.start = async (canvases, map) => {
  Object.assign(scene, canvases)

  scene.floorCtx = scene.floorCanvas.getContext('2d', { alpha: false })
  scene.ctxMid = scene.canvasMid.getContext('2d')
  scene.entityCtx = scene.entityCanvas.getContext('2d')
  scene.ctxTop = scene.canvasTop.getContext('2d')
  scene.mouse = mouseTracker(scene.canvasTop)
  scene.redrawEffects = false
  scene.view = setView({
    xTiles: mapSize,
    yTiles: mapSize
  })
  scene.hoveredTile = {
    path: null,
    tileIndex: null
  }

  initControls()

  try {
    const mapData = await loadMapFromImport(map)

    scene.loadMap(mapData)
  } catch {
    const startingMap = createTileMapFromParams({
      xTiles: mapSize,
      yTiles: mapSize
    })

    scene.loadMap(startingMap)
  }

  renderLoop.start(onFrameFunctions)
}

scene.loadMap = (tileMap) => {
  const { entityList, unitStart = { x: 1, y: 1 } } = tileMap

  scene.tileMap = tileMap
  scene.entityMap = createEntityMap(tileMap)

  scene.entities = []
  scene.player = new unit()

  scene.player.addToScene(unitStart)

  if (entityList) {
    entityList.forEach((item) => {
      const { name, tileIndex } = item

      switch (name) {
        case 'entity':
          // eslint-disable-next-line no-case-declarations
          const _entity = new entity({})
          _entity.addToScene(tileIndex)
          break

        case 'npc':
          // eslint-disable-next-line no-case-declarations
          const _npc = new npc({
            sprite: sprites.playerTokens.despoiler,
            haloColor: 'red'
          })

          _npc.addToScene(tileIndex)
          break

        default:
      }
    })
  }

  const mode = modeStore()
  mode.set('playMode')

  scene.view.setApertureSize()
  firstRender()

  // Centre camera on player
  const camerCentreX = Math.round(scene.canvasTop.width / 2 - scene.player.position.x)
  const camerCentreY = Math.round(scene.canvasTop.height / 2 - scene.player.position.y)
  panCameraTo(camerCentreX, camerCentreY)
}

scene.setView = setView

export { scene }
