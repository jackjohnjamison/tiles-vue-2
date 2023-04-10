import { createTileMapFromParams, loadMapFromFetch } from '@/lib/map'
import { createEntityMap, entity, unit, npc } from '@/lib/entities'
import { mouseTracker } from '@/lib/controls'
import { defaultMapSize, defaultMapTitle, color } from '@/lib/constants'
import { sprites } from '@/lib/sprites'
import { initControls, modes, editMode } from '@/lib/controls'
import { mapTitleStore } from '@/stores/map-title'
import { setView } from './set-view'
import { firstRender, onFrameFunctions, panCameraTo, renderLoop } from '.'
import { modeStore } from '@/stores/mode'

const scene = {}
let redrawEffects = false

// Sets parts of the scene that don't change between map loads
scene.start = async (canvases, map) => {
  Object.assign(scene, canvases)
  scene.ctxFloor = scene.canvasFloor.getContext('2d', { alpha: false })
  scene.ctxMid = scene.canvasMid.getContext('2d')
  scene.ctxEntity = scene.canvasEntity.getContext('2d')
  scene.ctxTop = scene.canvasTop.getContext('2d')
  scene.mapConfig = await import('../../config/map-config.json')
  scene.mouse = mouseTracker(scene.canvasTop)
  scene.setView = setView

  scene.requestRedrawEffects = () => {
    redrawEffects = true
  }

  scene.isRedrawEffectsRequested = () => {
    return redrawEffects
  }

  scene.RedrawEffectsDone = () => {
    redrawEffects = false
  }

  // Edit mode needs to be instantiated after the scene has been created
  // modes.editMode = new editMode() // Still doesn't work

  try {
    const mapData = await loadMapFromFetch(map)

    scene.loadMap(mapData)
  } catch (error) {
    console.log(error)
    const startingMap = createTileMapFromParams(
      { xTiles: defaultMapSize, yTiles: defaultMapSize },
      defaultMapTitle
    )

    scene.loadMap(startingMap)
  }

  initControls()
  renderLoop.start(onFrameFunctions)
}

scene.loadMap = (tileMap, entryPointName = null) => {
  const { entityList, xTiles, yTiles, entryPoints, mapTitle } = tileMap

  scene.view = setView({
    xTiles,
    yTiles
  })

  scene.tileMap = tileMap
  mapTitleStore().updateMapTitle(mapTitle)
  scene.entityMap = createEntityMap(tileMap)
  scene.entities = []
  scene.player = new unit()

  let startLocation = { x: 0, y: 0 }

  if (entryPointName && entryPoints?.[entryPointName]) {
    startLocation = entryPoints[entryPointName]
  } else if (Object.values(entryPoints).length) {
    startLocation = Object.values(entryPoints)[0]
  }

  scene.player.addToScene(startLocation)

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
            haloColor: color.alert
          })

          _npc.addToScene(tileIndex)
          break

        default:
      }
    })
  }

  modeStore().set(modes.playMode)
  scene.view.setApertureSize()
  firstRender()

  // Centre camera on player
  const camerCentreX = scene.canvasTop.width / 2 - scene.player.position.x
  const camerCentreY = scene.canvasTop.height / 2 - scene.player.position.y
  panCameraTo(camerCentreX, camerCentreY)
}

export { scene }
