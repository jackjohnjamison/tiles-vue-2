import { scene, redrawTile } from '@/lib/scene'

const deleteEntity = ({ x, y }) => {
  const { tileMap, entityMap, entities } = scene

  if (entityMap.entities[x][y]) {
    const entityId = entityMap.entities[x][y].entity.id
    const entityIndex = entities.findIndex((ent) => {
      return ent.id === entityId
    })

    // Passes the entity its own entity index so it can go delete itself
    if (entityIndex && entityIndex !== -1) {
      entities[entityIndex].deleteEntity(entityIndex)
    }
  } else if (tileMap.tiles[x][y].travelPoint) {
    delete tileMap.tiles[x][y].travelPoint
    delete tileMap.tiles[x][y].marker
    redrawTile({ x, y })
  }
}

export { deleteEntity }
