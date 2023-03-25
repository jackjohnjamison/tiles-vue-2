import { createTileMapFromParams, loadMapFromImport } from '@/lib/map'
import { createEntityMap, entity, unit, npc } from '@/lib/entities'
import { mouseTracker } from '@/lib/controls'
import { defaultMapSize } from '@/lib/constants'
import { sprites } from '@/lib/sprites'
import { initControls } from '@/lib/controls'
import { modeStore } from '@/stores/mode'
import { setView } from './set-view'
import { firstRender, onFrameFunctions, panCameraTo, renderLoop } from '.'

const scene = {}

// Sets parts of the scene that don't change between map loads
scene.start = async (canvases, map) => {
  Object.assign(scene, canvases)
  scene.ctxFloor = scene.canvasFloor.getContext('2d', { alpha: false })
  scene.ctxMid = scene.canvasMid.getContext('2d')
  scene.ctxEntity = scene.canvasEntity.getContext('2d')
  scene.ctxTop = scene.canvasTop.getContext('2d')
  scene.redrawEffects = false
  scene.mapConfig = await import('../../configs/map-config.json')
  scene.mouse = mouseTracker(scene.canvasTop)

  try {
    const mapData = await loadMapFromImport(map)

    scene.loadMap(mapData)
  } catch {
    const startingMap = createTileMapFromParams({
      xTiles: defaultMapSize,
      yTiles: defaultMapSize
    })

    scene.loadMap(startingMap)
  }

  initControls()
  renderLoop.start(onFrameFunctions)
}

scene.loadMap = (tileMap) => {
  const { entityList, xTiles, yTiles, unitStart = { x: 1, y: 1 } } = tileMap

  scene.view = setView({
    xTiles,
    yTiles
  })

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
