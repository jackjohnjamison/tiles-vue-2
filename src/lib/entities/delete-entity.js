import { scene, redrawTile } from '@/lib/scene'

const deleteEntity = ({ x, y }) => {
  const { tileMap, entityMap, entities } = scene

  if (entityMap.entities[x][y]) {
    const entityId = entityMap.entities[x][y].entity.id
    const entityIndex = entities.findIndex((ent) => {
      return ent.id === entityId
    })

    // Checks if the entity could be deleted before removing it from the entites array
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
