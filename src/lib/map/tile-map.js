import pathfinding from 'pathfinding'
import { scene, reloadScene } from '@/lib/scene'
import { sprites } from '@/lib/sprites'
import { tileTypes } from './tile-types'

const getVariant = (set) => {
  return Math.floor(Math.random() * sprites[set].length)
}

const defaultTile = {
  selectedTileSet: tileTypes.grass,
  floorHueValue: 0,
  featureHueValue: 0,
  variant: null
}

const createTileMapFromParams = ({ xTiles, yTiles }) => {
  const tileMap = {
    tiles: [],
    pathGrid: new pathfinding.Grid(xTiles, yTiles),
    xTiles,
    yTiles
  }

  tileMap.entryPoints = {}

  // Initializes every tile as an empty object
  for (let x = 0; x < xTiles; x++) {
    tileMap.tiles[x] = []

    for (let y = 0; y < yTiles; y++) {
      tileMap.tiles[x][y] = {}
    }
  }

  for (let x = 0; x < xTiles; x++) {
    for (let y = 0; y < yTiles; y++) {
      setTile({ x, y }, tileMap, defaultTile)
    }
  }

  return tileMap
}

const setTile = (tileIndex, tileMap, brush) => {
  const { selectedTileSet, floorHueValue, featureHueValue, variant } = brush
  const { floor, feature, walkable, type } = selectedTileSet
  const { x, y } = tileIndex

  const tile = tileMap.tiles[x][y]

  switch (type) {
    case 'void':
      tile.floor = null
      tile.feature = null
      break

    case 'obstacle':
    case 'floor':
      tile.floor = {
        set: floor,
        variant: variant ?? getVariant(floor),
        color: floorHueValue
      }
      tile.feature = null
      break

    case 'linked':
      // eslint-disable-next-line no-case-declarations
      const linkedVariant = variant ?? getVariant(floor)
      tile.floor = {
        set: floor,
        variant: linkedVariant,
        color: floorHueValue
      }
      tile.feature = {
        set: feature,
        variant: linkedVariant,
        color: featureHueValue
      }
      break

    case 'feature':
      tile.feature = {
        set: feature,
        variant: variant ?? getVariant(feature),
        color: featureHueValue
      }
      if (tile.type === 'void' || tile.type === 'linked' || tile.type === 'obstacle') {
        tile.floor = {
          set: floor,
          variant: getVariant(floor),
          color: featureHueValue
        }
      }
      break

    default:
    // Do nothing
  }

  tile.type = type

  // pathGrid holds the current walkable state of a wile. tile.walkable holds the default walkable state.
  tileMap.pathGrid.setWalkableAt(x, y, walkable)
  tile.walkable = walkable
}

const JSONReplacer = (key, value) => {
  if (key === 'pathGrid') {
    return
  }

  return value
}

const saveTileMaptoJSON = () => {
  const { tileMap, entities } = scene

  tileMap.entityList = []
  entities.forEach((entity) => {
    const {
      constructor: { name },
      tileIndex
    } = entity

    if (name === 'unit') {
      tileMap.unitStart = tileIndex
    } else {
      tileMap.entityList.push({
        name,
        tileIndex
      })
    }
  })

  return 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(tileMap, JSONReplacer))
}

const loadMapFromImport = async (map) => {
  // Converting the import to JSON and back again create an object which isn't immutable
  const mapJSON = JSON.stringify(await import(`../../maps/${map}.json`))
  return loadTileMapFromJSON(mapJSON)
}

const loadMapAtLocation = async (mapName, destinationIndex) => {
  const mapData = await loadMapFromImport(mapName)

  mapData.unitStart = destinationIndex
  reloadScene(mapData)
}

const loadTileMapFromJSON = (json) => {
  const mapObject = JSON.parse(json)
  mapObject.pathGrid = new pathfinding.Grid(mapObject.xTiles, mapObject.yTiles)

  for (let x = 0; x < mapObject.xTiles; x++) {
    for (let y = 0; y < mapObject.yTiles; y++) {
      const walkable = mapObject.tiles[x][y].walkable
      mapObject.pathGrid.setWalkableAt(x, y, walkable)
    }
  }

  return mapObject
}

export {
  createTileMapFromParams,
  loadMapFromImport,
  loadTileMapFromJSON,
  saveTileMaptoJSON,
  loadMapAtLocation,
  setTile
}
