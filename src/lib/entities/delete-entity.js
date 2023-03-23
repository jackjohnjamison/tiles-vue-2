import { scene, redrawTile } from '@/lib/scene'

// I should probably top you being able to delete the player
const deleteEntity = ({ x, y }) => {
  const { tileMap, entityMap, entities } = scene

  if (entityMap.entities[x][y]) {
    const entityId = entityMap.entities[x][y].id
    const entityIndex = entities.findIndex((ent) => {
      return ent.id === entityId
    })

    if (entities[entityIndex].deleteEntity()) {
      entities.splice(entityIndex, 1)
    }
  } else if (tileMap.tiles[x][y].travelPoint) {
    delete tileMap.tiles[x][y].travelPoint
    delete tileMap.tiles[x][y].marker
    redrawTile({ x, y })
  }
}

export { deleteEntity }
