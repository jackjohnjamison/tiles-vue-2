import { tileIndexToPosition, renderTile } from '@/lib/map'
import { renderEntities } from '@/lib/entities'
import { tileWidth, tileHeight } from '@/lib/constants'
import { scene } from '.'

const redrawWidth = tileWidth
const redrawHeight = tileHeight * 3
const redrawWindowYoffset = tileHeight * 1.5

const createRedrawWindow = (ctx, redrawWindowOrigin) => {
  const { x, y } = redrawWindowOrigin
  ctx.beginPath()
  ctx.rect(x, y, redrawWidth, redrawHeight)
  ctx.clip()
  ctx.clearRect(x, y, redrawWidth, redrawHeight)
}

const redrawTile = (tileIndex) => {
  const { ctxFloor, ctxEntity, tileMap } = scene
  const redrawWindowOrigin = tileIndexToPosition({
    x: tileIndex.x,
    y: tileIndex.y
  })

  redrawWindowOrigin.y -= redrawWindowYoffset

  ctxEntity.save()
  ctxFloor.save()

  createRedrawWindow(ctxFloor, redrawWindowOrigin)
  createRedrawWindow(ctxEntity, redrawWindowOrigin)

  redrawTileIndicesFloor.forEach((index) => {
    const x = index.x + tileIndex.x
    const y = index.y + tileIndex.y

    if (tileMap.tiles[x]?.[y]) {
      renderTile(x, y)
      renderEntities(x, y)
    }
  })

  ctxEntity.restore()
  ctxFloor.restore()
}

const redrawEntities = (tileIndex, position, positionPrevious) => {
  const { ctxEntity, tileMap } = scene

  const redrawWindowOrigin = {
    x: Math.floor(Math.min(position.x, positionPrevious.x)),
    y: Math.floor(Math.min(position.y, positionPrevious.y) - tileHeight * 2)
  }

  const width = Math.ceil(Math.abs(position.x - positionPrevious.x) + redrawWidth)
  const height = Math.ceil(Math.abs(position.y - positionPrevious.y) + redrawHeight)

  redrawWindowOrigin.y

  const { x, y } = redrawWindowOrigin
  ctxEntity.save()
  ctxEntity.beginPath()
  ctxEntity.rect(x, y, width, height)
  ctxEntity.clip()
  ctxEntity.clearRect(x, y, width, height)

  redrawTileIndicesEntity.forEach((index) => {
    const x = index.x + tileIndex.x
    const y = index.y + tileIndex.y

    if (tileMap.tiles[x]?.[y]) {
      renderEntities(x, y)
    }
  })

  ctxEntity.restore()
}

export { redrawTile, redrawEntities }

const redrawTileIndicesEntity = [
  {
    x: 3,
    y: -3
  },
  {
    x: 3,
    y: -2
  },
  {
    x: 3,
    y: -1
  },
  {
    x: 2,
    y: -3
  },
  {
    x: 2,
    y: -2
  },
  {
    x: 2,
    y: -1
  },
  {
    x: 2,
    y: 0
  },
  {
    x: 1,
    y: -3
  },
  {
    x: 1,
    y: -2
  },
  {
    x: 1,
    y: -1
  },
  {
    x: 1,
    y: 0
  },
  {
    x: 1,
    y: 1
  },
  {
    x: 0,
    y: -2
  },
  {
    x: 0,
    y: -1
  },
  {
    x: 0,
    y: 0
  },
  {
    x: 0,
    y: 1
  },
  {
    x: 0,
    y: 2
  },
  {
    x: -1,
    y: -1
  },
  {
    x: -1,
    y: 0
  },
  {
    x: -1,
    y: 1
  },
  {
    x: -1,
    y: 2
  },
  {
    x: -2,
    y: 0
  },
  {
    x: -2,
    y: 1
  },
  {
    x: -3,
    y: 1
  },
  {
    x: -2,
    y: 2
  },
  {
    x: -1,
    y: 3
  },
  {
    x: -3,
    y: 2
  },
  {
    x: -2,
    y: 3
  },
  {
    x: -3,
    y: 3
  }
]

const redrawTileIndicesFloor = [
  {
    x: 3,
    y: -3
  },
  {
    x: 3,
    y: -2
  },
  {
    x: 2,
    y: -3
  },
  {
    x: 2,
    y: -2
  },
  {
    x: 2,
    y: -1
  },
  {
    x: 1,
    y: -2
  },
  {
    x: 1,
    y: -1
  },
  {
    x: 1,
    y: 0
  },
  {
    x: 0,
    y: -1
  },
  {
    x: 0,
    y: 0
  },
  {
    x: 0,
    y: 1
  },
  {
    x: -1,
    y: 0
  },
  {
    x: -1,
    y: 1
  },
  {
    x: -1,
    y: 2
  },
  {
    x: -2,
    y: 1
  },
  {
    x: -2,
    y: 2
  },
  {
    x: -3,
    y: 2
  },
  {
    x: -2,
    y: 3
  },
  {
    x: -3,
    y: 3
  }
]
